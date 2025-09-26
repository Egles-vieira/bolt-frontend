// src/routes/transportadoras.routes.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Componentes de Transportadoras
import TransportadorasList from '@/pages/transportadoras/TransportadorasList';
import TransportadoraForm from '@/pages/transportadoras/TransportadoraForm';
import TransportadoraDetails from '@/pages/transportadoras/TransportadoraDetails';

// Componentes de Vínculos
import VinculosList from '@/pages/transportadoras/vinculos/VinculosList';
import VinculoForm from '@/pages/transportadoras/vinculos/VinculoForm';

export default function TransportadorasRoutes() {
  return (
    <Routes>
      {/* Rotas de Transportadoras */}
      <Route path="/" element={<TransportadorasList />} />
      <Route path="/novo" element={<TransportadoraForm />} />
      <Route path="/:id" element={<TransportadoraDetails />} />
      <Route path="/:id/editar" element={<TransportadoraForm />} />
      
      {/* Rotas de Vínculos (Códigos de Ocorrência) */}
      <Route path="/:transportadoraId/vinculos" element={<VinculosList />} />
      <Route path="/:transportadoraId/vinculos/novo" element={<VinculoForm />} />
      <Route path="/:transportadoraId/vinculos/:vinculoId/editar" element={<VinculoForm />} />
    </Routes>
  );
}