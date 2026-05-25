import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8080/api';

export default function ClienteMenu({ carrito, setCarrito }) {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const userName = localStorage.getItem('userName') || 'Cliente';

  // CARGAR PRODUCTOS DE LA BD
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/productos`);
        if (!response.ok) throw new Error('Error cargando productos');
        const data = await response.json();
        console.log('✅ Productos cargados:', data);
        setProductos(data);
      } catch (error) {
        console.error('❌ Error cargando productos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  // AGREGAR AL CARRITO
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);

    if (existe) {
      const nuevoCarrito = carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCarrito(nuevoCarrito);
    } else {
      setCarrito([
        ...carrito,
        { ...producto, cantidad: 1 }
      ]);
    }

    // MENSAJE
    setMensaje(`${producto.nombre} añadido con éxito`);
    setTimeout(() => {
      setMensaje('');
    }, 2000);
  };

  // FILTRAR PRODUCTOS
  const productosFiltrados = productos.filter(prod =>
    prod.nombre.toLowerCase().includes(search.toLowerCase()) ||
    prod.descripcion.toLowerCase().includes(search.toLowerCase())
  );

  // LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="p-4 space-y-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow">

        <h1 className="text-3xl font-bold text-orange-500">
          CochiLoco
        </h1>

        <div className="flex items-center gap-3">

          <span className="text-gray-800 font-medium">
            Hola, {userName}
          </span>

          <button
            onClick={() => navigate('/cliente-carrito')}
            className="
              bg-blue-500
              hover:bg-blue-600
              hover:shadow-[0_0_15px_rgba(59,130,246,0.7)]
              transition-all
              duration-300
              text-white
              px-4
              py-2
              rounded-xl
              font-semibold
            "
          >
            🛒 {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
          </button>

          <button
            onClick={() => navigate('/cliente-perfil')}
            className="
              bg-green-500
              hover:bg-green-600
              hover:shadow-[0_0_15px_rgba(34,197,94,0.7)]
              transition-all
              duration-300
              text-white
              px-4
              py-2
              rounded-xl
              font-semibold
            "
          >
            Perfil
          </button>

          <button
            onClick={handleLogout}
            className="
              bg-red-500
              hover:bg-red-600
              hover:shadow-[0_0_15px_rgba(239,68,68,0.7)]
              transition-all
              duration-300
              text-white
              px-4
              py-2
              rounded-xl
              font-semibold
            "
          >
            Salir
          </button>

        </div>
      </div>

      {/* NAVBAR */}
      <div className="flex justify-around bg-white p-4 rounded-2xl shadow">

        <button className="font-bold text-orange-500">
          🏠 Inicio
        </button>

        <button
          onClick={() => navigate('/cliente-carrito')}
          className="
            text-gray-800
            hover:text-orange-500
            hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]
            transition-all
            duration-300
          "
        >
          🛒 Carrito ({carrito.length})
        </button>

        <button
          onClick={() => navigate('/cliente-perfil')}
          className="
            text-gray-800
            hover:text-orange-500
            hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]
            transition-all
            duration-300
          "
        >
          👤 Perfil
        </button>
      </div>

      {/* MENSAJE */}
      {mensaje && (
        <div
          className="
            fixed
            bottom-6
            right-6
            bg-green-500
            text-white
            px-6
            py-4
            rounded-2xl
            shadow-[0_0_25px_rgba(34,197,94,0.6)]
            z-50
            animate-pulse
            font-semibold
          "
        >
          ✅ {mensaje}
        </div>
      )}

      {/* BANNER */}
      <div>
        <h2 className="font-bold text-3xl text-black">
          Bienvenido a "El Cochiloco"
        </h2>

        <p className="text-gray-700 text-lg mt-2">
          Ordena la mejor comida rápida y bebidas frías a domicilio
        </p>
      </div>

      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="🔍 Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          p-4
          rounded-2xl
          border
          bg-white
          shadow-sm
          text-black
        "
      />

      {/* PRODUCTOS */}
      {loading ? (
        <div className="text-center text-gray-600 py-8">
          ⏳ Cargando productos...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((prod) => (

              <div
                key={prod.id}
                className="
                  bg-white
                  rounded-2xl
                  shadow
                  overflow-hidden
                  transform
                  hover:-translate-y-2
                  hover:scale-[1.02]
                  hover:shadow-[0_0_30px_rgba(0,0,0,0.18)]
                  transition-all
                  duration-300
                "
              >

                {/* IMAGEN */}
                <div className="overflow-hidden bg-gray-200 h-56 flex items-center justify-center">
                  <div className="text-6xl">{prod.imagen}</div>
                </div>

                {/* CONTENIDO */}
                <div className="p-4">

                  <p className="text-sm text-gray-600">
                    {prod.categoria?.nombre || 'Sin categoría'}
                  </p>

                  <h3 className="font-bold text-2xl text-black mt-1">
                    {prod.nombre}
                  </h3>

                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {prod.descripcion}
                  </p>

                  {/* BADGE FRÍO */}
                  {prod.esFrio && (
                    <div className="mt-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                        ❄️ Bebida Fría
                      </span>
                    </div>
                  )}

                  <p className="text-orange-500 font-bold text-2xl mt-2">
                    ${prod.precio.toFixed(2)}
                  </p>

                  <button
                    onClick={() => agregarAlCarrito(prod)}
                    className="
                      w-full
                      bg-orange-500
                      hover:bg-orange-600
                      hover:shadow-[0_0_20px_rgba(249,115,22,0.8)]
                      hover:scale-[1.02]
                      transition-all
                      duration-300
                      text-white
                      py-3
                      mt-4
                      rounded-xl
                      font-bold
                    "
                  >
                    Añadir al carrito
                  </button>

                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 py-8">
              No hay productos que coincidan con tu búsqueda
            </div>
          )}
        </div>
      )}
    </div>
  );
}