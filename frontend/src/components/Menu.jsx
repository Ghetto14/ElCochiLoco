"use client";

import { useState } from "react";

export default function Menu({
  carrito,
  setCarrito,
  irCarrito,
  irPerfil,
  cerrarSesion
}) {

  const [mensaje, setMensaje] = useState("");

  const productos = [
    {
      id: 1,
      nombre: "Hamburguesa clásica",
      categoria: "Hamburguesas",
      precio: 80,
      imagen: "https://images.unsplash.com/photo-1550547660-d9450f859349"
    },
    {
      id: 2,
      nombre: "Frappe de chocolate",
      categoria: "Bebidas",
      precio: 65,
      imagen: "https://images.unsplash.com/photo-1572490122747-3968b75cc699"
    },
    {
      id: 3,
      nombre: "Pizza pepperoni",
      categoria: "Pizzas",
      precio: 120,
      imagen: "https://cdn.unotv.com/images/2024/09/pizza-pepperoni-no-existe-italia-152140.jpeg"
    },
    {
      id: 4,
      nombre: "Hot Dog",
      categoria: "Snacks",
      precio: 50,
      imagen: "https://s.yimg.com/os/es/animal_gourmet_468/36887795923aa9ae5d32149ca68a979b"
    },
  ];

  /* AGREGAR AL CARRITO */
  const agregarAlCarrito = (producto) => {

    const existe = carrito.find(
      item => item.id === producto.id
    );

    if (existe) {

      const nuevoCarrito = carrito.map(item =>

        item.id === producto.id
          ? {
              ...item,
              cantidad: item.cantidad + 1
            }
          : item
      );

      setCarrito(nuevoCarrito);

    } else {

      setCarrito([
        ...carrito,
        {
          ...producto,
          cantidad: 1
        }
      ]);
    }

    /* MENSAJE */
    setMensaje(`${producto.nombre} añadido con éxito`);

    setTimeout(() => {
      setMensaje("");
    }, 2000);
  };

  return (
    <div className="p-4 space-y-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow">

        <h1 className="text-3xl font-bold text-orange-500">
          QuickBite
        </h1>

        <div className="flex items-center gap-3">

          <span className="text-gray-800 font-medium">
            Hola, Cliente
          </span>

          <button
            onClick={irCarrito}
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
            onClick={irPerfil}
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
            onClick={cerrarSesion}
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
          onClick={irCarrito}
          className="
            text-gray-800
            hover:text-orange-500
            hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]
            transition-all
            duration-300
          "
        >
          🛒 Carrito
        </button>

        <button
          onClick={irPerfil}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {productos.map((prod) => (

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
            <div className="overflow-hidden">

              <img
                src={prod.imagen}
                className="
                  w-full
                  h-56
                  object-cover
                  transition-transform
                  duration-500
                  hover:scale-105
                "
              />

            </div>

            {/* CONTENIDO */}
            <div className="p-4">

              <p className="text-sm text-gray-600">
                {prod.categoria}
              </p>

              <h3 className="font-bold text-2xl text-black mt-1">
                {prod.nombre}
              </h3>

              <p className="text-orange-500 font-bold text-2xl mt-2">
                ${prod.precio}
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
        ))}
      </div>
    </div>
  );
}


