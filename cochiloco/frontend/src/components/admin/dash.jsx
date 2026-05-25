import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Check } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api';

export default function CochiLocoDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProductos: 0,
    totalPedidos: 0,
    pedidosPendientes: 0,
    ingresosTotales: 0
  });

  // CARGAR DATOS
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);

        // Cargar productos
        const prodResponse = await fetch(`${API_BASE_URL}/productos`);
        if (!prodResponse.ok) throw new Error('Error cargando productos');
        const prodData = await prodResponse.json();
        setProducts(prodData);

        // Cargar pedidos pendientes
        const pedResponse = await fetch(`${API_BASE_URL}/pedidos/pendientes`);
        if (!pedResponse.ok) throw new Error('Error cargando pedidos');
        const pedData = await pedResponse.json();
        setOrders(pedData);

        // Calcular stats
        const totalPedidos = pedData.length;
        const pendientes = pedData.filter(p => p.estado === 'Pendiente' || p.estado === 'Preparando').length;
        const ingresos = pedData.reduce((sum, p) => sum + parseFloat(p.total), 0);

        setStats({
          totalProductos: prodData.length,
          totalPedidos: totalPedidos,
          pedidosPendientes: pendientes,
          ingresosTotales: ingresos
        });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
    // Recargar cada 5 segundos
    const interval = setInterval(cargarDatos, 5000);
    return () => clearInterval(interval);
  }, []);

  const statsList = [
    {
      label: 'Total Productos',
      value: stats.totalProductos.toString(),
      icon: '📦',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      label: 'Total Pedidos',
      value: stats.totalPedidos.toString(),
      icon: '✓',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      label: 'Pedidos Pendientes',
      value: stats.pedidosPendientes.toString(),
      icon: '👤',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      label: 'Ingresos Totales',
      value: `$${stats.ingresosTotales.toFixed(2)}`,
      icon: '📈',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const handleMarkComplete = async (id) => {
    if (window.confirm('¿Marcar este pedido como completado?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/pedidos/${id}/completar`, {
          method: 'PUT'
        });

        if (!response.ok) throw new Error('Error marcando como completado');
        
        // Actualizar lista local
        setOrders(orders.filter(o => o.id !== id));
        
        // Actualizar stats
        setStats(prev => ({
          ...prev,
          pedidosPendientes: Math.max(0, prev.pedidosPendientes - 1)
        }));
      } catch (error) {
        console.error('Error:', error);
        alert('Error al completar el pedido');
      }
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Cargando dashboard...</p>
      </div>
    );
  }

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
          <div 
            onClick={() => navigate('/dashboard')}
            className="px-3 py-3 bg-orange-500 rounded-lg text-white flex items-center gap-3 cursor-pointer hover:bg-orange-600 transition"
          >
            <span className="text-xl">📊</span>
            {sidebarOpen && <span>Dashboard</span>}
          </div>
          
          <div 
            onClick={() => navigate('/menu')}
            className="px-3 py-3 text-gray-300 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition"
          >
            <span className="text-xl">🍔</span>
            {sidebarOpen && <span>Menú</span>}
          </div>
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
            {statsList.map((stat, index) => (
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
              <h2 className="text-xl font-bold text-gray-900">Órdenes Pendientes de Preparación</h2>
            </div>

            <div className="divide-y divide-gray-200">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="px-6 py-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-gray-900">Pedido #{order.id}</p>
                        <p className="text-sm text-gray-500">{order.cliente?.nombre || 'Cliente'}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${order.total}</p>
                        <p className="text-sm text-gray-500">{new Date(order.fecha).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Estado */}
                    <div className="mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        order.estado === 'Pendiente' ? 'bg-red-100 text-red-800' :
                        order.estado === 'Preparando' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {order.estado}
                      </span>
                    </div>

                    {/* Items con indicador de hielo */}
                    {order.detalles && order.detalles.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <p className="text-xs font-semibold text-gray-600 mb-2">PRODUCTOS:</p>
                        {order.detalles.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-700">{item.producto?.nombre} x{item.cantidad}</span>
                            {item.producto?.esFrio && (
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                                ❄️ Con Hielo
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Botón de Completado */}
                    <button
                      onClick={() => handleMarkComplete(order.id)}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                    >
                      <Check size={20} />
                      Marcar como Completado ✓
                    </button>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center text-gray-500">
                  No hay órdenes pendientes 🎉
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}