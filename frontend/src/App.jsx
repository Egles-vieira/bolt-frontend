// src/App.jsx - VERSÃO FINAL CORRIGIDA

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/contexts/AuthContext';
import { EmailProvider } from '@/contexts/EmailContext';
import PrivateRoute from '@/components/shared/PrivateRoute';
import MainLayout from '@/components/layout/MainLayout';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { Loader2 } from 'lucide-react';
import { AdminSettings } from '@/components/layout/AdminSettings';
import { EnvironmentProvider } from '@/contexts/EnvironmentContext';

// Importações diretas
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import Dashboard from '@/pages/dashboard/Dashboard';

// ✅ Importações de Transportadoras - DESCOMENTADAS
import TransportadorasList from '@/pages/transportadoras/TransportadorasList';
import TransportadoraCreate from '@/pages/transportadoras/TransportadoraForm';
import TransportadoraEdit from '@/pages/transportadoras/TransportadoraDetails';

// Outras importações
import ClientesList from '@/pages/clientes/ClientesList';
import ClienteCreate from '@/pages/clientes/ClienteCreate';
import ClienteEdit from '@/pages/clientes/ClienteEdit';
import NotasFiscaisList from '@/pages/notas-fiscais/NotasFiscaisList';
import NotasFiscaisDetail from '@/pages/notas-fiscais/NotasFiscaisDetail';
import MonitoringDashboard from '@/pages/monitoring/MonitoringDashboard';
import TermsAndPrivacy from '@/pages/legal/TermsAndPrivacy';
import MessagingConfig from '@/components/messaging/MessagingConfig';

// Configuração do React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Componente de Loading
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
      <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <EnvironmentProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <AuthProvider>
              <EmailProvider>
                <Routes>
                  {/* Rotas Públicas */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/terms" element={<TermsAndPrivacy />} />
                  
                  {/* Rotas Privadas */}
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <MainLayout />
                      </PrivateRoute>
                    }
                  >
                    {/* Redirecionar raiz para dashboard */}
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    
                    {/* Dashboard */}
                    <Route 
                      path="dashboard" 
                      element={
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>
                      } 
                    />
                    
                // src/App.jsx - CORREÇÃO DAS ROTAS DE TRANSPORTADORAS

<Route path="transportadoras">
  <Route 
    index 
    element={
      <PrivateRoute roles={['admin', 'gestor']}>
        <TransportadorasList />
      </PrivateRoute>
    } 
  />
  <Route 
    path="criar" 
    element={
      <PrivateRoute roles={['admin', 'gestor']}>
        <TransportadoraCreate />
      </PrivateRoute>
    } 
  />
  {/* ✅ NOVA ROTA PARA VISUALIZAR (sem editar) */}
  <Route 
    path=":id" 
    element={
      <PrivateRoute roles={['admin', 'gestor']}>
        <TransportadoraEdit />
      </PrivateRoute>
    } 
  />
  <Route 
    path=":id/editar" 
    element={
      <PrivateRoute roles={['admin', 'gestor']}>
        <TransportadoraEdit />
      </PrivateRoute>
    } 
  />
</Route>
                    
                    {/* ========== CLIENTES ========== */}
                    <Route path="clientes">
                      <Route 
                        index 
                        element={
                          <PrivateRoute roles={['admin', 'gestor', 'operador']}>
                            <ClientesList />
                          </PrivateRoute>
                        } 
                      />
                      <Route 
                        path="criar" 
                        element={
                          <PrivateRoute roles={['admin', 'gestor', 'operador']}>
                            <ClienteCreate />
                          </PrivateRoute>
                        } 
                      />
                      <Route 
                        path=":id/editar" 
                        element={
                          <PrivateRoute roles={['admin', 'gestor']}>
                            <ClienteEdit />
                          </PrivateRoute>
                        } 
                      />
                    </Route>
                    
                    {/* ========== NOTAS FISCAIS ========== */}
                    <Route path="notas-fiscais">
                      <Route 
                        index 
                        element={
                          <PrivateRoute>
                            <NotasFiscaisList />
                          </PrivateRoute>
                        } 
                      />
                      <Route 
                        path=":id" 
                        element={
                          <PrivateRoute>
                            <NotasFiscaisDetail />
                          </PrivateRoute>
                        } 
                      />
                    </Route>
                    
                    {/* ========== MONITORAMENTO ========== */}
                    <Route 
                      path="monitoring" 
                      element={
                        <PrivateRoute roles={['admin', 'gestor']}>
                          <MonitoringDashboard />
                        </PrivateRoute>
                      } 
                    />
                    
                    {/* ========== ADMIN ========== */}
                    <Route 
                      path="admin/messaging" 
                      element={
                        <PrivateRoute roles={['admin']}>
                          <MessagingConfig />
                        </PrivateRoute>
                      } 
                    />
                    
                    <Route 
                      path="admin/*" 
                      element={
                        <PrivateRoute roles={['admin']}>
                          <Routes>
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="settings" element={<AdminSettings />} />
                          </Routes>
                        </PrivateRoute>
                      } 
                    />
                  </Route>
                  
                  {/* 404 - Not Found */}
                  <Route 
                    path="*" 
                    element={
                      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                        <div className="text-center">
                          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Página não encontrada</p>
                          <a 
                            href="/dashboard" 
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                          >
                            Voltar ao Dashboard
                          </a>
                        </div>
                      </div>
                    } 
                  />
                </Routes>
                
                {/* Toast Global */}
                <Toaster />
                
                {/* React Query Devtools */}
                {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
              </EmailProvider>
            </AuthProvider>
          </Router>
        </QueryClientProvider>
      </EnvironmentProvider>
    </ErrorBoundary>
  );
}

export default App;