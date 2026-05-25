import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Componentes
import Login from './components/login';

// Admin
import Dashboard from './components/admin/dash';
import MenuManagement from './components/admin/MenuManagement';

// Cliente
import ClienteMenu from './components/cliente/ClienteMenu_ReactRouter';
import ClienteCarrito from './components/cliente/ClienteCarrito_ReactRouter';
import ClientePerfil from './components/cliente/ClientePerfil_ReactRouter';

export default function App() {
  const [carrito, setCarrito] = useState([]);

  return (
    <Router>
      <Routes>
        {/* Ruta por defecto */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* LOGIN - Unificado para ADMIN y CLIENTE */}
        <Route path="/login" element={<Login />} />

        {/* Rutas ADMIN */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/menu" element={<MenuManagement />} />

        {/* Rutas CLIENTE */}
        <Route path="/cliente" element={<ClienteMenu carrito={carrito} setCarrito={setCarrito} />} />
        <Route path="/cliente-carrito" element={<ClienteCarrito carrito={carrito} setCarrito={setCarrito} />} />
        <Route path="/cliente-perfil" element={<ClientePerfil />} />

        {/* Ruta comodín - Si no existe, redirige a login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}