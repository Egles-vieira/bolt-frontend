// src/hooks/useTransportadoraCodigo.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transportadoraCodigoService } from '@/services/api/transportadora-codigo-ocorrencia.service';
import { toast } from 'sonner';

// Hook para listar vínculos
export const useTransportadoraCodigos = (params = {}) => {
  return useQuery({
    queryKey: ['transportadora-codigos', params],
    queryFn: () => transportadoraCodigoService.list(params),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true
  });
};

// Hook para buscar vínculo por ID
export const useTransportadoraCodigo = (id) => {
  return useQuery({
    queryKey: ['transportadora-codigo', id],
    queryFn: () => transportadoraCodigoService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000
  });
};

// Hook para buscar vínculos por transportadora
export const useCodigosByTransportadora = (transportadoraId, params = {}) => {
  return useQuery({
    queryKey: ['codigos-transportadora', transportadoraId, params],
    queryFn: () => transportadoraCodigoService.getByTransportadora(transportadoraId, params),
    enabled: !!transportadoraId,
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true
  });
};

// Hook para buscar vínculos por código de ocorrência
export const useTransportadorasByCodigo = (codigoOcorrencia, params = {}) => {
  return useQuery({
    queryKey: ['transportadoras-codigo', codigoOcorrencia, params],
    queryFn: () => transportadoraCodigoService.getByCodigoOcorrencia(codigoOcorrencia, params),
    enabled: !!codigoOcorrencia,
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true
  });
};

// Hook para buscar vínculo específico
export const useVinculoEspecifico = (transportadoraId, codigoOcorrencia) => {
  return useQuery({
    queryKey: ['vinculo-especifico', transportadoraId, codigoOcorrencia],
    queryFn: () => transportadoraCodigoService.getVinculo(transportadoraId, codigoOcorrencia),
    enabled: !!transportadoraId && !!codigoOcorrencia,
    staleTime: 5 * 60 * 1000
  });
};

// Hook para estatísticas
export const useTransportadoraCodigoStats = () => {
  return useQuery({
    queryKey: ['transportadora-codigo-stats'],
    queryFn: () => transportadoraCodigoService.getStats(),
    staleTime: 5 * 60 * 1000
  });
};

// Hook para criar vínculo
export const useCreateTransportadoraCodigo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => transportadoraCodigoService.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries(['transportadora-codigos']);
      queryClient.invalidateQueries(['codigos-transportadora']);
      queryClient.invalidateQueries(['transportadoras-codigo']);
      queryClient.invalidateQueries(['transportadora-codigo-stats']);
      toast.success(response.message || 'Vínculo criado com sucesso!');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Erro ao criar vínculo';
      toast.error(message);
    }
  });
};

// Hook para criar múltiplos vínculos
export const useCreateMultipleVinculos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vinculos) => transportadoraCodigoService.createMultiple(vinculos),
    onSuccess: (response) => {
      queryClient.invalidateQueries(['transportadora-codigos']);
      queryClient.invalidateQueries(['codigos-transportadora']);
      queryClient.invalidateQueries(['transportadoras-codigo']);
      queryClient.invalidateQueries(['transportadora-codigo-stats']);
      toast.success(response.message || 'Vínculos criados com sucesso!');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Erro ao criar vínculos';
      toast.error(message);
    }
  });
};

// Hook para atualizar vínculo
export const useUpdateTransportadoraCodigo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => transportadoraCodigoService.update(id, data),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries(['transportadora-codigos']);
      queryClient.invalidateQueries(['transportadora-codigo', variables.id]);
      queryClient.invalidateQueries(['codigos-transportadora']);
      queryClient.invalidateQueries(['transportadoras-codigo']);
      toast.success(response.message || 'Vínculo atualizado com sucesso!');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Erro ao atualizar vínculo';
      toast.error(message);
    }
  });
};

// Hook para deletar vínculo
export const useDeleteTransportadoraCodigo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => transportadoraCodigoService.delete(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries(['transportadora-codigos']);
      queryClient.invalidateQueries(['codigos-transportadora']);
      queryClient.invalidateQueries(['transportadoras-codigo']);
      queryClient.invalidateQueries(['transportadora-codigo-stats']);
      toast.success(response.message || 'Vínculo deletado com sucesso!');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Erro ao deletar vínculo';
      toast.error(message);
    }
  });
};

// Hook para deletar por transportadora
export const useDeleteByTransportadora = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transportadoraId) => 
      transportadoraCodigoService.deleteByTransportadora(transportadoraId),
    onSuccess: (response) => {
      queryClient.invalidateQueries(['transportadora-codigos']);
      queryClient.invalidateQueries(['codigos-transportadora']);
      queryClient.invalidateQueries(['transportadora-codigo-stats']);
      toast.success(response.message || 'Vínculos deletados com sucesso!');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Erro ao deletar vínculos';
      toast.error(message);
    }
  });
};

// Hook para deletar por código de ocorrência
export const useDeleteByCodigoOcorrencia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (codigoOcorrencia) => 
      transportadoraCodigoService.deleteByCodigoOcorrencia(codigoOcorrencia),
    onSuccess: (response) => {
      queryClient.invalidateQueries(['transportadora-codigos']);
      queryClient.invalidateQueries(['transportadoras-codigo']);
      queryClient.invalidateQueries(['transportadora-codigo-stats']);
      toast.success(response.message || 'Vínculos deletados com sucesso!');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Erro ao deletar vínculos';
      toast.error(message);
    }
  });
};

// Hook para importar CSV
export const useImportVinculosCSV = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, transportadoraId }) => 
      transportadoraCodigoService.importCSV(file, transportadoraId),
    onSuccess: (response) => {
      queryClient.invalidateQueries(['transportadora-codigos']);
      queryClient.invalidateQueries(['codigos-transportadora']);
      queryClient.invalidateQueries(['transportadora-codigo-stats']);
      toast.success(response.message || 'Vínculos importados com sucesso!');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Erro ao importar vínculos';
      toast.error(message);
    }
  });
};

// Hook para exportar vínculos
export const useExportVinculos = () => {
  return useMutation({
    mutationFn: (params) => transportadoraCodigoService.export(params),
    onSuccess: (blob, variables) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vinculos_${Date.now()}.${variables.format || 'csv'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Exportação concluída!');
    },
    onError: (error) => {
      toast.error('Erro ao exportar vínculos');
    }
  });
};