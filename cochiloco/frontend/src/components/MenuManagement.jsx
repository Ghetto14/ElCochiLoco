import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, Menu, Check } from 'lucide-react';
import AddProductModal from './AddProductModal';

export default function MenuManagement() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Hamburguesa Clásica',
      description: 'Jugosa hamburguesa de carne de res con lechuga, tomate, cebolla y queso',
      category: 'Hamburguesas',
      price: '$8.99',
      image: '🍔',
      es_frio: false
    },
    {
      id: 2,
      name: 'Frappe de Chocolate',
      description: 'Delicioso frappe de chocolate con crema batida y jarabe',
      category: 'Frappes',
      price: '$5.99',
      image: '🥤',
      es_frio: true
    },
    {
      id: 3,
      name: 'Pizza Pepperoni',
      description: 'Pizza familiar con abundante pepperoni y queso mozzarella',
      category: 'Pizzas',
      price: '$12.99',
      image: '🍕',
      es_frio: false
    },
    {
      id: 4,
      name: 'Frappe de Vainilla',
      description: 'Frappe cremoso de vainilla francesa con crema batida',
      category: 'Frappes',
      price: '$5.49',
      image: '🥤',
      es_frio: true
    },
    {
      id: 5,
      name: 'Hot Dog Especial',
      description: 'Hot dog con salchicha premium, queso, tocino y salsas especiales',
      category: 'Hot Dogs',
      price: '$6.99',
      image: '🌭',
      es_frio: false
    },
    {
      id: 6,
      name: 'Limonada Frozen',
      description: 'Refrescante limonada frozen con hielo y menta',
      category: 'Bebidas Frías',
      price: '$4.99',
      image: '🥤',
      es_frio: true
    },
    {
      id: 7,
      name: 'Alitas BBQ',
      description: 'Orden de 10 alitas bañadas en salsa BBQ con aderezo ranch',
      category: 'Alitas',
      price: '$10.99',
      image: '🍗',
      es_frio: false
    }
  ]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-lg">
              🐷
            </div>
            {sidebarOpen && (
              <div>
                <div className="font-bold text-white">Cochiloco</div>
                <div className="text-xs text-gray-400">Panel de Administración</div>
              </div>
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="px-6 py-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-lg">
              👤
            </div>
            {sidebarOpen && (
              <div>
                <div className="font-semibold text-white">Admin User</div>
                <div className="text-xs text-gray-400">Administrador</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          <div 
            onClick={() => navigate('/dashboard')}
            className="px-3 py-3 text-gray-300 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition"
          >
            <span className="text-xl">📊</span>
            {sidebarOpen && <span>Dashboard</span>}
          </div>
          
          <div 
            onClick={() => navigate('/menu')}
            className="px-3 py-3 bg-orange-500 rounded-lg text-white flex items-center gap-3 cursor-pointer hover:bg-orange-600 transition"
          >
            <span className="text-xl">≡</span>
            {sidebarOpen && <span>Menú</span>}
          </div>
          
          <div className="px-3 py-3 text-gray-300 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition">
            <span className="text-xl">✓</span>
            {sidebarOpen && <span>Pedidos</span>}
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
            onClick={toggleSidebar}
            className="w-full p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Menú</h1>
            <p className="text-gray-600 mt-2">Administra el catálogo de comida y bebidas</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition shadow-md"
          >
            <Plus size={18} />
            Nuevo Producto
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 p-6 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 text-sm">
              <div>Imagen</div>
              <div>Nombre</div>
              <div>Categoría</div>
              <div>Precio</div>
              <div>Hielo</div>
              <div>Acciones</div>
            </div>

            {/* Table Rows */}
            {products.length > 0 ? (
              products.map((product, index) => (
                <div
                  key={product.id}
                  className={`grid grid-cols-6 gap-4 p-6 items-center hover:bg-gray-50 transition ${
                    index !== products.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">
                    {product.image}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                  </div>

                  <div className="text-gray-700">{product.category}</div>
                  <div className="font-semibold text-gray-900">{product.price}</div>

                  <div className="text-center">
                    {product.es_frio ? (
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                        ❄️ Frío
                      </span>
                    ) : (
                      <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                        🔥 Caliente
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button
                      className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition"
                      title="Editar"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No hay productos en el menú
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal para agregar productos */}
      <AddProductModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}