import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, Menu, Check } from 'lucide-react';
import AddProductModal from './AddProductModal';

const API_BASE_URL = 'http://localhost:8080/api';

export default function MenuManagement() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // CARGAR PRODUCTOS Y CATEGORÍAS
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        
        // Cargar categorías
        const catResponse = await fetch(`${API_BASE_URL}/categorias`);
        if (!catResponse.ok) throw new Error('Error cargando categorías');
        const catData = await catResponse.json();
        setCategorias(catData);

        // Cargar productos
        const prodResponse = await fetch(`${API_BASE_URL}/productos`);
        if (!prodResponse.ok) throw new Error('Error cargando productos');
        const prodData = await prodResponse.json();
        setProducts(prodData);
        setError('');
      } catch (error) {
        console.error('Error:', error);
        setError('Error cargando datos de la base de datos');
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  // AGREGAR PRODUCTO
  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  // ELIMINAR PRODUCTO
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) throw new Error('Error al eliminar');
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el producto');
      }
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-gray-600">Cargando productos...</p>
        </div>
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
            <p className="text-gray-600 mt-2">Total de productos: {products.length}</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition shadow-md"
          >
            <Plus size={18} />
            Nuevo Producto
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 m-8 rounded-lg">
            {error}
          </div>
        )}

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
                    {product.imagen}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">{product.nombre}</p>
                    <p className="text-sm text-gray-500 mt-1">{product.descripcion}</p>
                  </div>

                  <div className="text-gray-700">{product.categoria?.nombre || 'Sin categoría'}</div>
                  <div className="font-semibold text-gray-900">${product.precio.toFixed(2)}</div>

                  <div className="text-center">
                    {product.esFrio ? (
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
                      title="Editar (próximamente)"
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
        categorias={categorias}
      />
    </div>
  );
}