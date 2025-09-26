// src/pages/transportadoras/TransportadoraDetails.jsx

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Edit, Trash2, Building, MapPin, 
  CheckCircle, XCircle, Calendar, Truck, Package 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from "@/components/ui/separator";
import { 
  useTransportadora, 
  useDeleteTransportadora 
} from '@/hooks/useTransportadoras';
import { formatCNPJ, formatDate } from '@/utils/formatters';

export default function TransportadoraDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { data, isLoading, error } = useTransportadora(id);
  const deleteTransportadora = useDeleteTransportadora();

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja deletar esta transportadora?')) {
      await deleteTransportadora.mutateAsync(id);
      navigate('/transportadoras');
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">
              Erro ao carregar transportadora: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const transportadora = data?.data;

  if (!transportadora) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Transportadora não encontrada
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/transportadoras')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{transportadora.nome}</h1>
            <p className="text-muted-foreground">
              {formatCNPJ(transportadora.cnpj)}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/transportadoras/${id}/editar`)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Deletar
          </Button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Truck className="w-4 h-4 mr-2 text-blue-500" />
              Total de Romaneios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {transportadora.total_romaneios || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Package className="w-4 h-4 mr-2 text-green-500" />
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={transportadora.deleted_at ? "destructive" : "success"}>
              {transportadora.deleted_at ? "Inativa" : "Ativa"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-purple-500" />
              Cadastrado em
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {formatDate(transportadora.created_at)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Informações Gerais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="w-5 h-5 mr-2" />
            Informações Gerais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">CNPJ</p>
              <p className="font-medium">{formatCNPJ(transportadora.cnpj)}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Nome</p>
              <p className="font-medium">{transportadora.nome}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Endereço</p>
              <p className="font-medium">{transportadora.endereco}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Localização</p>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <p className="font-medium">
                  {transportadora.municipio}/{transportadora.uf}
                </p>
              </div>
            </div>

            {transportadora.integracao_ocorrencia && (
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground mb-1">
                  Integração de Ocorrência
                </p>
                <p className="font-medium">{transportadora.integracao_ocorrencia}</p>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-3">
            <p className="text-sm font-medium">Configurações</p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2">
                {transportadora.romaneio_auto ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-400" />
                )}
                <span className={transportadora.romaneio_auto ? "text-green-700" : "text-muted-foreground"}>
                  Romaneio Automático
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {transportadora.roterizacao_automatica ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-400" />
                )}
                <span className={transportadora.roterizacao_automatica ? "text-green-700" : "text-muted-foreground"}>
                  Roterização Automática
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auditoria */}
      <Card>
        <CardHeader>
          <CardTitle>Auditoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Criado em</p>
              <p className="font-medium">{formatDate(transportadora.created_at)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Atualizado em</p>
              <p className="font-medium">{formatDate(transportadora.updated_at)}</p>
            </div>
            {transportadora.deleted_at && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Deletado em</p>
                <p className="font-medium text-red-600">
                  {formatDate(transportadora.deleted_at)}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}