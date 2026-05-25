import React, { useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function CochilcoMenuManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Hamburguesa Clásica',
      description: 'Jugosa hamburguesa de carne de res con lechuga, tomate, cebolla y queso',
      category: 'Hamburguesas',
      price: '$8.99',
      image: '🍔'
    },
    {
      id: 2,
      name: 'Frappe de Chocolate',
      description: 'Delicioso frappe de chocolate con crema batida y jarabe',
      category: 'Frappes',
      price: '$5.99',
      image: '🥤'
    },
    {
      id: 3,
      name: 'Pizza Pepperoni',
      description: 'Pizza familiar con abundante pepperoni y queso mozzarella',
      category: 'Pizzas',
      price: '$12.99',
      image: '🍕'
    },
    {
      id: 4,
      name: 'Frappe de Vainilla',
      description: 'Frappe cremoso de vainilla francesa con crema batida',
      category: 'Frappes',
      price: '$5.49',
      image: '🥤'
    },
    {
      id: 5,
      name: 'Hot Dog Especial',
      description: 'Hot dog con salchicha premium, queso, tocino y salsas especiales',
      category: 'Hot Dogs',
      price: '$6.99',
      image: '🌭'
    },
    {
      id: 6,
      name: 'Limonada Frozen',
      description: 'Refrescante limonada frozen con hielo y menta',
      category: 'Bebidas Frías',
      price: '$4.99',
      image: '🥤'
    },
    {
      id: 7,
      name: 'Alitas BBQ',
      description: 'Orden de 10 alitas bañadas en salsa BBQ con aderezo ranch',
      category: 'Alitas',
      price: '$10.99',
      image: '🍗'
    }
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F3F4F6', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '227px' : '80px',
        backgroundColor: '#0F172A',
        color: 'white',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #1E293B'
      }}>
        {/* Logo */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#FF6B35',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              🐷
            </div>
            {sidebarOpen && (
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>Cochiloco</div>
                <div style={{ fontSize: '11px', color: '#9CA3AF' }}>Panel de Administración</div>
              </div>
            )}
          </div>
        </div>

        {/* User Profile */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#FF6B35',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              👤
            </div>
            {sidebarOpen && (
              <div>
                <div style={{ fontWeight: '600', fontSize: '14px', color: 'white' }}>Admin User</div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>Administrador</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav style={{
          flex: 1,
          padding: '24px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{
            padding: '12px',
            color: '#D1D5DB',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            <span style={{ fontSize: '18px' }}>📊</span>
            {sidebarOpen && <span>Dashboard</span>}
          </div>
          
          <div style={{
            padding: '12px',
            backgroundColor: '#FF6B35',
            borderRadius: '8px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            <span style={{ fontSize: '18px' }}>≡</span>
            {sidebarOpen && <span>Menú</span>}
          </div>
          
          <div style={{
            padding: '12px',
            color: '#D1D5DB',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            <span style={{ fontSize: '18px' }}>✓</span>
            {sidebarOpen && <span>Pedidos</span>}
          </div>
        </nav>

        {/* Logout */}
        <div style={{
          padding: '12px',
          borderTop: '1px solid #334155'
        }}>
          <div style={{
            padding: '12px',
            color: '#D1D5DB',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            <span style={{ fontSize: '18px' }}>→</span>
            {sidebarOpen && <span>Cerrar Sesión</span>}
          </div>
        </div>

        {/* Toggle Button */}
        <div style={{ padding: '16px 12px' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              width: '100%',
              padding: '8px',
              color: '#9CA3AF',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '18px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1E293B';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#9CA3AF';
            }}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #E5E7EB',
          padding: '32px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>Gestión de Menú</h1>
            <p style={{ color: '#6B7280', marginTop: '8px', margin: 0 }}>Administra el catálogo de comida y bebidas</p>
          </div>
          <button style={{
            backgroundColor: '#FF6B35',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '18px' }}>+</span>
            Nuevo Producto
          </button>
        </div>

        {/* Table */}
        <div style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            overflow: 'hidden'
          }}>
            {/* Table Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr 150px 100px 120px',
              padding: '16px 24px',
              backgroundColor: '#F9FAFB',
              borderBottom: '1px solid #E5E7EB',
              fontWeight: '600',
              fontSize: '14px',
              color: '#374151',
              gap: '16px'
            }}>
              <div>Imagen</div>
              <div>Nombre</div>
              <div>Categoría</div>
              <div>Precio</div>
              <div>Acciones</div>
            </div>

            {/* Table Rows */}
            {products.map((product, index) => (
              <div
                key={product.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 150px 100px 120px',
                  padding: '16px 24px',
                  borderBottom: index !== products.length - 1 ? '1px solid #E5E7EB' : 'none',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9FAFB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                {/* Image */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#E5E7EB',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px'
                }}>
                  {product.image}
                </div>

                {/* Name & Description */}
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{product.name}</p>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0 0' }}>{product.description}</p>
                </div>

                {/* Category */}
                <div style={{ fontSize: '14px', color: '#374151' }}>
                  {product.category}
                </div>

                {/* Price */}
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                  {product.price}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                      padding: '4px',
                      color: '#6B7280'
                    }}
                    onMouseEnter={(e) => { e.target.style.color = '#FF6B35'; }}
                    onMouseLeave={(e) => { e.target.style.color = '#6B7280'; }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                      padding: '4px',
                      color: '#EF4444'
                    }}
                    onMouseEnter={(e) => { e.target.style.opacity = '0.8'; }}
                    onMouseLeave={(e) => { e.target.style.opacity = '1'; }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}