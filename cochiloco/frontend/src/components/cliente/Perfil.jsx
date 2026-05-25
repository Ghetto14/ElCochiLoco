"use client";

import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:8080/api";

export default function Perfil({ volver, cerrarSesion }) {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [cliente, setCliente] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    ciudad: "",
    direccion: ""
  });

  // CARGAR DATOS DEL CLIENTE Y PEDIDOS
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const clienteEmail = localStorage.getItem("userEmail");

        if (!clienteEmail) {
          console.error("No hay email en localStorage");
          setLoading(false);
          return;
        }

        // Obtener cliente por email
        const clienteResponse = await fetch(
          `${API_BASE_URL}/clientes/email/${clienteEmail}`
        );
        
        if (!clienteResponse.ok) throw new Error("Cliente no encontrado");
        const clienteData = await clienteResponse.json();
        setCliente(clienteData);

        setFormData({
          nombre: clienteData.nombre || "",
          email: clienteData.email || "",
          telefono: clienteData.telefono || "",
          ciudad: clienteData.ciudad || "",
          direccion: clienteData.direccion || ""
        });

        localStorage.setItem("userId", clienteData.id);

        // Obtener pedidos del cliente
        try {
          const pedidosResponse = await fetch(
            `${API_BASE_URL}/pedidos/cliente/${clienteData.id}`
          );
          if (pedidosResponse.ok) {
            const pedidosData = await pedidosResponse.json();
            setPedidos(pedidosData);
          } else {
            setPedidos([]);
          }
        } catch (error) {
          console.log("No se pudieron cargar los pedidos:", error);
          setPedidos([]);
        }

      } catch (error) {
        console.error("Error cargando datos:", error);
        alert("Error al cargar el perfil. Asegúrate que el backend esté corriendo.");
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  // GUARDAR CAMBIOS
  const guardarCambios = async () => {
    if (!cliente) return;

    setSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/clientes/${cliente.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          id: cliente.id,
          tipoCliente: cliente.tipoCliente || "Regular"
        })
      });

      if (!response.ok) throw new Error("Error actualizando cliente");
      const clienteActualizado = await response.json();
      setCliente(clienteActualizado);
      setModoEdicion(false);
      alert("✅ Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar los cambios");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading || !cliente) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-xl">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-orange-500">QuickBite</h1>

        {/* MENÚ */}
        <div className="flex gap-8 text-lg font-medium">
          <button
            onClick={volver}
            className="text-gray-800 hover:text-orange-500 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-300"
          >
            Inicio
          </button>

          <button
            onClick={volver}
            className="text-gray-800 hover:text-orange-500 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-300"
          >
            Menú
          </button>

          <button className="text-orange-500 font-bold">Perfil</button>
        </div>
      </nav>

      {/* CONTENIDO */}
      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLUMNA IZQUIERDA */}
        <div className="space-y-6">
          {/* PERFIL */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-[0_0_25px_rgba(0,0,0,0.08)] transition-all duration-300">
            {/* FOTO */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-orange-500 flex items-center justify-center text-white text-5xl font-bold shadow-[0_0_25px_rgba(249,115,22,0.5)]">
                {cliente.nombre.charAt(0).toUpperCase()}
              </div>

              <h2 className="text-3xl font-bold text-black mt-5">
                {cliente.nombre}
              </h2>

              <p className="text-gray-600 mt-1">
                Cliente {cliente.tipoCliente || "Regular"}
              </p>
            </div>

            {/* INFO */}
            <div className="space-y-5 mt-8">
              <div>
                <p className="text-gray-500 text-sm">Correo Electrónico</p>
                <p className="text-black font-semibold text-lg">{cliente.email}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Número Telefónico</p>
                <p className="text-black font-semibold text-lg">
                  {cliente.telefono || "No registrado"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Dirección</p>
                <p className="text-black font-semibold text-lg">
                  {cliente.ciudad || "No registrada"}
                </p>
              </div>
            </div>

            {/* BOTÓN */}
            <button
              onClick={() => setModoEdicion(!modoEdicion)}
              className="w-full mt-8 bg-orange-500 hover:bg-orange-600 hover:shadow-[0_0_25px_rgba(249,115,22,0.8)] transition-all duration-300 text-white py-4 rounded-2xl font-bold text-lg"
            >
              {modoEdicion ? "Cancelar Edición" : "Editar Perfil"}
            </button>
          </div>

          {/* ESTADÍSTICAS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm text-center hover:shadow-[0_0_20px_rgba(0,0,0,0.08)] transition-all duration-300">
              <p className="text-4xl font-bold text-orange-500">{pedidos.length}</p>
              <p className="text-gray-700 mt-2">Pedidos</p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm text-center hover:shadow-[0_0_20px_rgba(0,0,0,0.08)] transition-all duration-300">
              <p className="text-4xl font-bold text-green-500">⭐ {cliente.valoracion || "5.0"}</p>
              <p className="text-gray-700 mt-2">Valoración</p>
            </div>
          </div>

          {/* CERRAR SESIÓN */}
          <button
            onClick={cerrarSesion}
            className="w-full bg-red-500 hover:bg-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.7)] transition-all duration-300 text-white py-4 rounded-2xl font-bold text-lg"
          >
            Cerrar sesión
          </button>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="lg:col-span-2 space-y-8">
          {/* INFORMACIÓN PERSONAL */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-black">Información Personal</h2>

              <button
                onClick={guardarCambios}
                disabled={!modoEdicion || saving}
                className={`
                  px-5 py-3 rounded-2xl font-semibold text-white transition-all duration-300
                  ${
                    modoEdicion && !saving
                      ? "bg-orange-500 hover:bg-orange-600 hover:shadow-[0_0_20px_rgba(249,115,22,0.7)] cursor-pointer"
                      : "bg-gray-300 cursor-not-allowed"
                  }
                `}
              >
                {saving ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>

            {/* FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-700 font-medium">Nombre Completo</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  disabled={!modoEdicion || saving}
                  className={`
                    w-full mt-2 p-4 rounded-2xl border text-black focus:outline-none focus:ring-2 focus:ring-orange-400
                    ${modoEdicion ? "bg-white" : "bg-gray-100"}
                  `}
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Correo Electrónico</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled={true}
                  className="w-full mt-2 p-4 rounded-2xl border text-black bg-gray-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Teléfono</label>
                <input
                  type="text"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange("telefono", e.target.value)}
                  disabled={!modoEdicion || saving}
                  className={`
                    w-full mt-2 p-4 rounded-2xl border text-black focus:outline-none focus:ring-2 focus:ring-orange-400
                    ${modoEdicion ? "bg-white" : "bg-gray-100"}
                  `}
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Ciudad</label>
                <input
                  type="text"
                  value={formData.ciudad}
                  onChange={(e) => handleInputChange("ciudad", e.target.value)}
                  disabled={!modoEdicion || saving}
                  className={`
                    w-full mt-2 p-4 rounded-2xl border text-black focus:outline-none focus:ring-2 focus:ring-orange-400
                    ${modoEdicion ? "bg-white" : "bg-gray-100"}
                  `}
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-gray-700 font-medium">Dirección</label>
                <input
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => handleInputChange("direccion", e.target.value)}
                  disabled={!modoEdicion || saving}
                  className={`
                    w-full mt-2 p-4 rounded-2xl border text-black focus:outline-none focus:ring-2 focus:ring-orange-400
                    ${modoEdicion ? "bg-white" : "bg-gray-100"}
                  `}
                />
              </div>
            </div>
          </div>

          {/* HISTORIAL */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-black">Historial de Pedidos</h2>
            </div>

            {/* LISTA */}
            <div className="space-y-5">
              {pedidos.length > 0 ? (
                pedidos.map((pedido) => (
                  <div
                    key={pedido.id}
                    className="border rounded-2xl p-5 flex justify-between items-center hover:shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* INFO */}
                    <div>
                      <p className="text-xl font-bold text-black">Pedido #{pedido.id}</p>
                      <p className="text-gray-600 mt-1">
                        {new Date(pedido.fecha).toLocaleDateString()}
                      </p>
                    </div>

                    {/* ESTADO */}
                    <div className="text-center">
                      <p
                        className={`
                          px-4 py-2 rounded-xl font-semibold
                          ${
                            pedido.estado === "Entregado"
                              ? "bg-green-100 text-green-700"
                              : pedido.estado === "Pendiente"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }
                        `}
                      >
                        {pedido.estado}
                      </p>
                    </div>

                    {/* TOTAL */}
                    <div className="text-right">
                      <p className="text-gray-600">Total</p>
                      <p className="text-2xl font-bold text-orange-500">
                        ${parseFloat(pedido.total).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-600 py-8">
                  No tienes pedidos aún
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}