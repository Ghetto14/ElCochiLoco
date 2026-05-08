import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CochiLocoLogin from './components/login';
import CochiLocoDashboard from './components/dash';
import MenuManagement from './components/MenuManagement';
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de Login - Es la página inicial */}
        <Route path="/login" element={<CochiLocoLogin />} />
        
        {/* Ruta del Dashboard */}
        <Route path="/dashboard" element={<CochiLocoDashboard />} />
        
        {/* Ruta del Menú */}
        <Route path="/menu" element={<MenuManagement />} />
        
        {/* Si accedes a "/" te redirige al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}