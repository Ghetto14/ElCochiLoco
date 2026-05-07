import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CochiLocoLogin from './components/login';
import CochiLocoDashboard from './components/dash';
import MenuManagement from './components/MenuManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CochiLocoLogin />} />
        <Route path="/login" element={<CochiLocoLogin />} />
        <Route path="/dashboard" element={<CochiLocoDashboard />} />
        <Route path="/menu" element={<MenuManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
