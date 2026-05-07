cat > src/components/dash.jsx << 'EOF'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut, Package, ShoppingCart, User, TrendingUp } from 'lucide-react';

export default function CochiLocoDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    {
      label: 'Total Productos',
      value: '12',
      icon: '📦',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      label: 'Total Pedidos',
      value: '1',
      icon: '✓',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      label: 'Pedidos Pendientes',
      value: '1',
      icon: '👤',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      label: 'Ingresos Totales',
      value: '$23.97',
      icon: '📈',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const orders = [
    {
      id: 1,
      customer: 'Cliente Demo',
      amount: '$23.97',
      date: '2026-04-15'
    }
  ];

  const handleLogout = () => {
    // Aquí puedes agregar lógica de cierre de sesión
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-lg">
              🍔
            </div>
            {sidebarOpen && <div>
              <div className="font-bold text-white">CochiLoco</div>
              <div className="text-xs text-gray-400">Panel de Administración</div>
            </div>}
          </div>
        </div>

        {/* User Profile */}
        <div className="px-6 py-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              👤
            </div>
            {sidebarOpen && <div className="flex-1 min-w-0">
              <div className="font-semibold text-white truncate">Admin User</div>
              <div className="text-xs text-gray-400">Administrador</div>
            </div>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          <div className="px-3 py-3 bg-orange-500 rounded-lg text-white flex items-center gap-3 cursor-pointer hover:bg-orange-600 transition">
            <span className="text-xl">📊</span>
            {sidebarOpen && <span>Dashboard</span>}
          </div>
          
          <div className="px-3 py-3 text-gray-300 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition">
            <span className="text-xl">🍔</span>
            {sidebarOpen && <span>Menú</span>}
          </div>
          
          <div className="px-3 py-3 text-gray-300 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition">
            <span className="text-xl">📦</span>
            {sidebarOpen && <span>Pedidos</span>
          }</div>
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-slate-700">
          <div 
            onClick={handleLogout}
            className="px-3 py-3 text-gray-300 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition"
          >
            <span className="text-xl">🚪</span>
            {sidebarOpen && <span>Cerrar Sesión</span>}
          </div>
        </div>

        {/* Toggle Button */}
        <div className="px-3 py-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Resumen general de tu tienda</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} ${stat.borderColor} border-2 rounded-xl p-6 transition hover:shadow-md`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="text-3xl opacity-50">{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Órdenes Recientes</h2>
            </div>

            <div className="divide-y divide-gray-200">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer"
                >
                  <div>
                    <p className="font-semibold text-gray-900">Pedido #{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{order.amount}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {orders.length === 0 && (
              <div className="px-6 py-8 text-center text-gray-500">
                No hay órdenes recientes
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}