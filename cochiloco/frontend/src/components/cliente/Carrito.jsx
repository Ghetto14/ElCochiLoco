"use client";

import { useState } from "react";

const API_BASE_URL = "http://localhost:8080/api";

export default function Carrito({
  carrito,
  setCarrito,
  volver,
  irMenu,
  irPerfil,
  irCarrito
}) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const total = carrito.reduce(
    (acc, item) => acc + (item.precio * item.cantidad),
    0
  );

  // AUMENTAR
  const aumentarCantidad = (id) => {
    const nuevoCarrito = carrito.map(item =>
      item.id === id
        ? {
            ...item,
            cantidad: item.cantidad + 1
          }
        : item
    );
    setCarrito(nuevoCarrito);
  };

  // DISMINUIR
  const disminuirCantidad = (id) => {
    const nuevoCarrito = carrito
      .map(item =>
        item.id === id
          ? {
              ...item,
              cantidad: item.cantidad - 1
            }
          : item
      )
      .filter(item => item.cantidad > 0);

    setCarrito(nuevoCarrito);
  };

  // PROCEDER AL PAGO (CREAR PEDIDO)
  const procederAlPago = async () => {
    if (carrito.length === 0) {
      setError("El carrito está vacío");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const clienteEmail = localStorage.getItem("userEmail");
      const clienteId = localStorage.getItem("userId");

      // Obtener cliente por email si no tiene ID
      let idCliente = clienteId;

      if (!idCliente) {
        const clienteResponse = await fetch(
          `${API_BASE_URL}/clientes/email/${clienteEmail}`
        );
        if (!clienteResponse.ok) throw new Error("Cliente no encontrado");
        const cliente = await clienteResponse.json();
        idCliente = cliente.id;
        localStorage.setItem("userId", cliente.id);
      }

      // CREAR PEDIDO
      const pedidoData = {
        cliente: { id: parseInt(idCliente) },
        total: total,
        estado: "Pendiente",
        notas: ""
      };

      const pedidoResponse = await fetch(`${API_BASE_URL}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedidoData)
      });

      if (!pedidoResponse.ok) throw new Error("Error creando pedido");
      const pedido = await pedidoResponse.json();

      // CREAR DETALLES DEL PEDIDO
      for (const item of carrito) {
        const detalleData = {
          pedido: { id: pedido.id },
          producto: { id: item.id },
          cantidad: item.cantidad,
          precioUnitario: item.precio
        };

        const detalleResponse = await fetch(
          `${API_BASE_URL}/pedidos/${pedido.id}/detalles`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(detalleData)
          }
        );

        if (!detalleResponse.ok) throw new Error("Error creando detalle");
      }

      // ÉXITO
      setSuccess(true);
      setCarrito([]);

      // Mostrar mensaje y volver al menú después de 3 segundos
      setTimeout(() => {
        setSuccess(false);
        irMenu();
      }, 3000);

    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Error al procesar el pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">

        <h1 className="text-3xl font-bold text-orange-500">
          QuickBite
        </h1>

        <div className="flex gap-8 text-lg font-medium">

          <button
            onClick={volver}
            className="
              text-gray-800
              hover:text-orange-500
              hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]
              transition-all
              duration-300
            "
          >
            Inicio
          </button>

          <button
            onClick={irMenu}
            className="
              text-gray-800
              hover:text-orange-500
              hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]
              transition-all
              duration-300
            "
          >
            Menú
          </button>

          <button
            onClick={irCarrito}
            className="
              text-orange-500
              font-bold
            "
          >
            Carrito
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
            Perfil
          </button>

        </div>
      </nav>

      {/* CONTENIDO */}
      <div className="p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-5xl font-bold text-black">
              Carrito de Compras
            </h1>

            <p className="text-gray-700 mt-2 text-lg">
              {carrito.length} productos en tu carrito
            </p>

          </div>

          <button
            onClick={volver}
            className="
              border
              bg-white
              px-6
              py-3
              rounded-xl
              text-gray-800
              font-semibold
              hover:bg-orange-500
              hover:text-white
              hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]
              transition-all
              duration-300
            "
          >
            ← Seguir Comprando
          </button>
        </div>

        {/* MENSAJE DE ÉXITO */}
        {success && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 font-semibold">
            ✅ ¡Pedido creado exitosamente! Redirigiendo...
          </div>
        )}

        {/* MENSAJE DE ERROR */}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6 font-semibold">
            ❌ {error}
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* PRODUCTOS */}
          <div className="lg:col-span-2 space-y-6">

            {carrito.length === 0 ? (

              <div className="bg-white rounded-2xl p-10 shadow-sm">

                <p className="text-gray-800 text-xl">
                  Tu carrito está vacío
                </p>

              </div>

            ) : (

              carrito.map((item) => (

                <div
                  key={`${item.id}-${item.nombre}`}
                  className="
                    bg-white
                    rounded-2xl
                    p-5
                    shadow-sm
                    flex
                    items-center
                    gap-5
                  "
                >

                  {/* IMAGEN */}
                  <div className="w-28 h-28 bg-gray-200 rounded-xl flex items-center justify-center text-5xl">
                    {item.imagen}
                  </div>

                  {/* INFO */}
                  <div className="flex-1">

                    <h2 className="text-2xl font-bold text-black">
                      {item.nombre}
                    </h2>

                    <p className="text-gray-700 text-lg">
                      {item.categoria?.nombre || item.categoria || "Sin categoría"}
                    </p>

                    {/* CONTROLES */}
                    <div className="flex items-center gap-4 mt-5">

                      <button
                        onClick={() => disminuirCantidad(item.id)}
                        className="
                          w-10
                          h-10
                          border
                          rounded-lg
                          text-xl
                          font-bold
                          text-black
                          hover:bg-orange-500
                          hover:text-white
                          hover:shadow-[0_0_15px_rgba(249,115,22,0.8)]
                          transition-all
                          duration-300
                        "
                      >
                        -
                      </button>

                      <span className="font-bold text-xl text-black">
                        {item.cantidad}
                      </span>

                      <button
                        onClick={() => aumentarCantidad(item.id)}
                        className="
                          w-10
                          h-10
                          border
                          rounded-lg
                          text-xl
                          font-bold
                          text-black
                          hover:bg-orange-500
                          hover:text-white
                          hover:shadow-[0_0_15px_rgba(249,115,22,0.8)]
                          transition-all
                          duration-300
                        "
                      >
                        +
                      </button>

                    </div>
                  </div>

                  {/* PRECIO */}
                  <div className="text-right">

                    <p className="text-gray-700 text-lg">
                      ${item.precio.toFixed(2)} c/u
                    </p>

                    <p className="text-3xl font-bold text-orange-500">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </p>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* RESUMEN */}
          <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">

            <h2 className="text-3xl font-bold text-black mb-6">
              Resumen del Pedido
            </h2>

            <div className="space-y-4 text-lg">

              <div className="flex justify-between">

                <span className="text-gray-800">
                  Subtotal
                </span>

                <span className="text-black font-semibold">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">

                <span className="text-gray-800">
                  Envío
                </span>

                <span className="text-green-600 font-bold">
                  Gratis
                </span>
              </div>
            </div>

            <hr className="my-6" />

            <div className="flex justify-between text-2xl font-bold">

              <span className="text-black">
                Total
              </span>

              <span className="text-orange-500">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* BOTONES */}
            <div className="space-y-4 mt-8">

              <button
                onClick={procederAlPago}
                disabled={loading || carrito.length === 0}
                className="
                  w-full
                  bg-orange-500
                  hover:bg-orange-600
                  disabled:opacity-50
                  text-white
                  py-4
                  rounded-xl
                  font-bold
                  text-lg
                  transition-all
                "
              >
                {loading ? "Procesando..." : "Proceder al Pago"}
              </button>

              <button
                onClick={() => setCarrito([])}
                disabled={loading || carrito.length === 0}
                className="
                  w-full
                  border
                  py-4
                  rounded-xl
                  font-bold
                  text-gray-800
                  hover:bg-red-50
                  disabled:opacity-50
                  transition-all
                "
              >
                Vaciar Carrito
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}