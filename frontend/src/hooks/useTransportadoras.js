// src/hooks/useTransportadoras.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transportadorasService } from '@/services/api/transportadoras.service';
import { useToast } from '@/components/ui/use-toast';

// Hook para listar transportadoras
export const useTransportadoras = (params = {}) => {
  return useQuery({
    queryKey: ['transportadoras', params],
    queryFn: () => transportadorasService.list(params),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true
  });
};

// Hook para buscar transportadora por ID
export const useTransportadora = (id) => {
  return useQuery({
    queryKey: ['transportadora', id],
    queryFn: () => transportadorasService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000
  });
};

// Hook para buscar por CNPJ
export const useTransportadoraByCnpj = (cnpj) => {
  return useQuery({
    queryKey: ['transportadora-cnpj', cnpj],
    queryFn: () => transportadorasService.getByCnpj(cnpj),
    enabled: !!cnpj && cnpj.replace(/\D/g, '').length === 14,
    staleTime: 5 * 60 * 1000
  });
};

// Hook para buscar por UF
export const useTransportadorasByUf = (uf) => {
  return useQuery({
    queryKey: ['transportadoras-uf', uf],
    queryFn: () => transportadorasService.getByUf(uf),
    enabled: !!uf && uf.length === 2,
    staleTime: 5 * 60 * 1000
  });
};

// Hook para search
export const useSearchTransportadoras = (query, limit = 10) => {
  return useQuery({
    queryKey: ['transportadoras-search', query, limit],
    queryFn: () => transportadorasService.search(query, limit),
    enabled: !!query && query.length >= 2,
    staleTime: 1 * 60 * 1000
  });
};

// Hook para estatísticas
export const useTransportadorasStats = () => {
  return useQuery({
    queryKey: ['transportadoras-stats'],
    queryFn: () => transportadorasService.getStats(),
    staleTime: 5 * 60 * 1000
  });
};

// Hook para criar transportadora
export const useCreateTransportadora = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data) => transportadorasService.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries(['transportadoras']);
      queryClient.invalidateQueries(['transportadoras-stats']);
      toast({
        title: "Sucesso",
        description: response.message || 'Transportadora criada com sucesso!',
      });
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Erro ao criar transportadora';
      toast({
        title: "Erro",
        description: message,
        variant: "destructive"
      });
    }
  });
};

// Hook para atualizar transportadora
export const useUpdateTransportadora = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }) => transportadorasService.update(id, data),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries(['transportadoras']);
      queryClient.invalidateQueries(['transportadora', variables.id]);
      queryClient.invalidateQueries(['transportadoras-stats']);
      toast({
        title: "Sucesso",
        description: response.message || 'Transportadora atualizada com sucesso!',
      });
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Erro ao atualizar transportadora';
      toast({
        title: "Erro",
        description: message,
        variant: "destructive"
      });
    }
  });
};

// Hook para deletar transportadora
export const useDeleteTransportadora = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id) => transportadorasService.delete(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries(['transportadoras']);
      queryClient.invalidateQueries(['transportadoras-stats']);
      toast({
        title: "Sucesso",
        description: response.message || 'Transportadora deletada com sucesso!',
      });
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Erro ao deletar transportadora';
      toast({
        title: "Erro",
        description: message,
        variant: "destructive"
      });
    }
  });
};

// Hook para restaurar transportadora
export const useRestoreTransportadora = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id) => transportadorasService.restore(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries(['transportadoras']);
      queryClient.invalidateQueries(['transportadoras-stats']);
      toast({
        title: "Sucesso",
        description: response.message || 'Transportadora restaurada com sucesso!',
      });
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Erro ao restaurar transportadora';
      toast({
        title: "Erro",
        description: message,
        variant: "destructive"
      });
    }
  });
};

// Hook para validar CNPJ
export const useValidateCnpj = (cnpj) => {
  return useQuery({
    queryKey: ['validate-cnpj', cnpj],
    queryFn: () => transportadorasService.validateCnpj(cnpj),
    enabled: !!cnpj && cnpj.replace(/\D/g, '').length === 14,
    retry: false
  });
};