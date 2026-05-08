"use client";

import { useState } from "react";

export default function Perfil({
  volver,
  cerrarSesion
}) {

  const [modoEdicion, setModoEdicion] = useState(false);

  /* PEDIDOS DEMO */
  const pedidos = [
    {
      id: "#QB-1024",
      fecha: "05 Mayo 2026",
      total: 245,
      estado: "Entregado"
    },
    {
      id: "#QB-1020",
      fecha: "03 Mayo 2026",
      total: 180,
      estado: "Entregado"
    },
    {
      id: "#QB-1018",
      fecha: "01 Mayo 2026",
      total: 320,
      estado: "Entregado"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">

        {/* LOGO */}
        <h1 className="text-3xl font-bold text-orange-500">
          QuickBite
        </h1>

        {/* MENÚ */}
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
            onClick={volver}
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
            className="
              text-orange-500
              font-bold
            "
          >
            Perfil
          </button>

        </div>
      </nav>

      {/* CONTENIDO */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* COLUMNA IZQUIERDA */}
        <div className="space-y-6">

          {/* PERFIL */}
          <div
            className="
              bg-white
              rounded-3xl
              p-8
              shadow-sm
              hover:shadow-[0_0_25px_rgba(0,0,0,0.08)]
              transition-all
              duration-300
            "
          >

            {/* FOTO */}
            <div className="flex flex-col items-center">

              <div
                className="
                  w-32
                  h-32
                  rounded-full
                  bg-orange-500
                  flex
                  items-center
                  justify-center
                  text-white
                  text-5xl
                  font-bold
                  shadow-[0_0_25px_rgba(249,115,22,0.5)]
                "
              >
                C
              </div>

              <h2 className="text-3xl font-bold text-black mt-5">
                Cliente Demo
              </h2>

              <p className="text-gray-600 mt-1">
                Cliente Premium
              </p>

            </div>

            {/* INFO */}
            <div className="space-y-5 mt-8">

              <div>

                <p className="text-gray-500 text-sm">
                  Correo Electrónico
                </p>

                <p className="text-black font-semibold text-lg">
                  cliente@email.com
                </p>

              </div>

              <div>

                <p className="text-gray-500 text-sm">
                  Número Telefónico
                </p>

                <p className="text-black font-semibold text-lg">
                  +52 951 000 0000
                </p>

              </div>

              <div>

                <p className="text-gray-500 text-sm">
                  Dirección
                </p>

                <p className="text-black font-semibold text-lg">
                  Oaxaca, México
                </p>

              </div>

            </div>

            {/* BOTÓN */}
            <button
              onClick={() => setModoEdicion(!modoEdicion)}
              className="
                w-full
                mt-8
                bg-orange-500
                hover:bg-orange-600
                hover:shadow-[0_0_25px_rgba(249,115,22,0.8)]
                transition-all
                duration-300
                text-white
                py-4
                rounded-2xl
                font-bold
                text-lg
              "
            >
              {modoEdicion ? "Cancelar Edición" : "Editar Perfil"}
            </button>

          </div>

          {/* ESTADÍSTICAS */}
          <div className="grid grid-cols-2 gap-4">

            <div
              className="
                bg-white
                p-6
                rounded-3xl
                shadow-sm
                text-center
                hover:shadow-[0_0_20px_rgba(0,0,0,0.08)]
                transition-all
                duration-300
              "
            >

              <p className="text-4xl font-bold text-orange-500">
                24
              </p>

              <p className="text-gray-700 mt-2">
                Pedidos
              </p>

            </div>

            <div
              className="
                bg-white
                p-6
                rounded-3xl
                shadow-sm
                text-center
                hover:shadow-[0_0_20px_rgba(0,0,0,0.08)]
                transition-all
                duration-300
              "
            >

              <p className="text-4xl font-bold text-green-500">
                ⭐ 4.9
              </p>

              <p className="text-gray-700 mt-2">
                Valoración
              </p>

            </div>

          </div>

          {/* CERRAR SESIÓN */}
          <button
            onClick={cerrarSesion}
            className="
              w-full
              bg-red-500
              hover:bg-red-600
              hover:shadow-[0_0_20px_rgba(239,68,68,0.7)]
              transition-all
              duration-300
              text-white
              py-4
              rounded-2xl
              font-bold
              text-lg
            "
          >
            Cerrar sesión
          </button>

        </div>

        {/* COLUMNA DERECHA */}
        <div className="lg:col-span-2 space-y-8">

          {/* INFORMACIÓN PERSONAL */}
          <div
            className="
              bg-white
              rounded-3xl
              p-8
              shadow-sm
            "
          >

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold text-black">
                Información Personal
              </h2>

              <button
                disabled={!modoEdicion}
                className={`
                  px-5
                  py-3
                  rounded-2xl
                  font-semibold
                  text-white
                  transition-all
                  duration-300

                  ${
                    modoEdicion
                      ? `
                        bg-orange-500
                        hover:bg-orange-600
                        hover:shadow-[0_0_20px_rgba(249,115,22,0.7)]
                        cursor-pointer
                      `
                      : `
                        bg-gray-300
                        cursor-not-allowed
                      `
                  }
                `}
              >
                Guardar Cambios
              </button>

            </div>

            {/* FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>

                <label className="text-gray-700 font-medium">
                  Nombre Completo
                </label>

                <input
                  type="text"
                  defaultValue="Cliente Demo"
                  disabled={!modoEdicion}
                  className={`
                    w-full
                    mt-2
                    p-4
                    rounded-2xl
                    border
                    text-black
                    focus:outline-none
                    focus:ring-2
                    focus:ring-orange-400

                    ${modoEdicion ? "bg-white" : "bg-gray-100"}
                  `}
                />

              </div>

              <div>

                <label className="text-gray-700 font-medium">
                  Correo Electrónico
                </label>

                <input
                  type="email"
                  defaultValue="cliente@email.com"
                  disabled={!modoEdicion}
                  className={`
                    w-full
                    mt-2
                    p-4
                    rounded-2xl
                    border
                    text-black
                    focus:outline-none
                    focus:ring-2
                    focus:ring-orange-400

                    ${modoEdicion ? "bg-white" : "bg-gray-100"}
                  `}
                />

              </div>

              <div>

                <label className="text-gray-700 font-medium">
                  Teléfono
                </label>

                <input
                  type="text"
                  defaultValue="+52 951 000 0000"
                  disabled={!modoEdicion}
                  className={`
                    w-full
                    mt-2
                    p-4
                    rounded-2xl
                    border
                    text-black
                    focus:outline-none
                    focus:ring-2
                    focus:ring-orange-400

                    ${modoEdicion ? "bg-white" : "bg-gray-100"}
                  `}
                />

              </div>

              <div>

                <label className="text-gray-700 font-medium">
                  Ciudad
                </label>

                <input
                  type="text"
                  defaultValue="Oaxaca"
                  disabled={!modoEdicion}
                  className={`
                    w-full
                    mt-2
                    p-4
                    rounded-2xl
                    border
                    text-black
                    focus:outline-none
                    focus:ring-2
                    focus:ring-orange-400

                    ${modoEdicion ? "bg-white" : "bg-gray-100"}
                  `}
                />

              </div>

            </div>

          </div>

          {/* HISTORIAL */}
          <div
            className="
              bg-white
              rounded-3xl
              p-8
              shadow-sm
            "
          >

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold text-black">
                Historial de Pedidos
              </h2>

              <button
                className="
                  border
                  px-5
                  py-3
                  rounded-2xl
                  text-gray-700
                  hover:bg-gray-100
                  transition-all
                  duration-300
                "
              >
                Ver Todos
              </button>

            </div>

            {/* LISTA */}
            <div className="space-y-5">

              {pedidos.map((pedido) => (

                <div
                  key={pedido.id}
                  className="
                    border
                    rounded-2xl
                    p-5
                    flex
                    justify-between
                    items-center
                    hover:shadow-[0_0_20px_rgba(0,0,0,0.08)]
                    hover:-translate-y-1
                    transition-all
                    duration-300
                  "
                >

                  {/* INFO */}
                  <div>

                    <p className="text-xl font-bold text-black">
                      {pedido.id}
                    </p>

                    <p className="text-gray-600 mt-1">
                      {pedido.fecha}
                    </p>

                  </div>

                  {/* ESTADO */}
                  <div className="text-center">

                    <p
                      className="
                        bg-green-100
                        text-green-700
                        px-4
                        py-2
                        rounded-xl
                        font-semibold
                      "
                    >
                      {pedido.estado}
                    </p>

                  </div>

                  {/* TOTAL */}
                  <div className="text-right">

                    <p className="text-gray-600">
                      Total
                    </p>

                    <p className="text-2xl font-bold text-orange-500">
                      ${pedido.total}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

