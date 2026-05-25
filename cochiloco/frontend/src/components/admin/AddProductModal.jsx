import React, { useState } from 'react';
import { X } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api';

export default function AddProductModal({ isOpen, onClose, onAddProduct, categorias = [] }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    idCategoria: categorias.length > 0 ? categorias[0].id : '',
    precio: '',
    imagen: '🍔',
    esFrio: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const emojis = ['🍔', '🍕', '🌭', '🍗', '🥤', '🍟', '🌮', '🥪'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.precio) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          categoria: { id: parseInt(formData.idCategoria) },
          precio: parseFloat(formData.precio),
          imagen: formData.imagen,
          esFrio: formData.esFrio,
          activo: true
        })
      });

      if (!response.ok) throw new Error('Error al crear el producto');

      const nuevoProducto = await response.json();
      onAddProduct(nuevoProducto);
      
      setFormData({
        nombre: '',
        descripcion: '',
        idCategoria: categorias.length > 0 ? categorias[0].id : '',
        precio: '',
        imagen: '🍔',
        esFrio: false
      });

      onClose();
    } catch (error) {
      console.error('Error:', error);
      setError('Error al crear el producto. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Nuevo Producto</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del Producto *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Hamburguesa Premium"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción del producto..."
              rows="3"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
              disabled={loading}
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Categoría *
            </label>
            <select
              name="idCategoria"
              value={formData.idCategoria}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
              disabled={loading}
            >
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Precio *
            </label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          {/* Emoji/Imagen */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ícono del Producto
            </label>
            <div className="grid grid-cols-4 gap-2">
              {emojis.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, imagen: emoji }))}
                  disabled={loading}
                  className={`p-3 text-2xl rounded-lg border-2 transition ${
                    formData.imagen === emoji
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  } disabled:opacity-50`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Es Frío */}
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <input
              type="checkbox"
              name="esFrio"
              id="esFrio"
              checked={formData.esFrio}
              onChange={handleChange}
              className="w-5 h-5 cursor-pointer"
              disabled={loading}
            />
            <label htmlFor="esFrio" className="flex-1 cursor-pointer">
              <span className="font-semibold text-gray-700">¿Lleva hielo?</span>
              <p className="text-xs text-gray-600">Marcar si es una bebida o postre frío</p>
            </label>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Agregar Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}