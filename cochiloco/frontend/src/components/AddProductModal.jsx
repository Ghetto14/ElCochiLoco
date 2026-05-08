import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddProductModal({ isOpen, onClose, onAddProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Hamburguesas',
    price: '',
    image: '🍔',
    es_frio: false
  });

  const categories = ['Hamburguesas', 'Pizzas', 'Hot Dogs', 'Alitas', 'Frappes', 'Bebidas Frías'];
  const emojis = ['🍔', '🍕', '🌭', '🍗', '🥤', '🍟', '🌮', '🥪'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      price: `$${parseFloat(formData.price).toFixed(2)}`,
      image: formData.image,
      es_frio: formData.es_frio
    };

    onAddProduct(newProduct);
    
    setFormData({
      name: '',
      description: '',
      category: 'Hamburguesas',
      price: '',
      image: '🍔',
      es_frio: false
    });
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
            className="text-white hover:bg-white/20 p-2 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del Producto *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Hamburguesa Premium"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción del producto..."
              rows="3"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Categoría *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
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
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
              required
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
                  onClick={() => setFormData(prev => ({ ...prev, image: emoji }))}
                  className={`p-3 text-2xl rounded-lg border-2 transition ${
                    formData.image === emoji
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
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
              name="es_frio"
              id="es_frio"
              checked={formData.es_frio}
              onChange={handleChange}
              className="w-5 h-5 cursor-pointer"
            />
            <label htmlFor="es_frio" className="flex-1 cursor-pointer">
              <span className="font-semibold text-gray-700">¿Lleva hielo?</span>
              <p className="text-xs text-gray-600">Marcar si es una bebida o postre frío</p>
            </label>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Agregar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}