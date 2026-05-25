"use client";

import { useState } from "react";
import Login from "../login";
import Menu from "Menu";
import Carrito from "Carrito";
import Perfil from "Perfil";

export default function Home() {
  const [pantalla, setPantalla] = useState("login");
  const [carrito, setCarrito] = useState([]);

  // Manejar logout
  const handleLogout = () => {
    localStorage.clear();
    setPantalla("login");
    setCarrito([]);
  };

  /* LOGIN */
  if (pantalla === "login") {
    return (
      <Login
        onLogin={() => setPantalla("menu")}
      />
    );
  }

  /* MENU */
  if (pantalla === "menu") {
    return (
      <Menu
        carrito={carrito}
        setCarrito={setCarrito}
        irCarrito={() => setPantalla("carrito")}
        irPerfil={() => setPantalla("perfil")}
        cerrarSesion={handleLogout}
      />
    );
  }

  /* CARRITO */
  if (pantalla === "carrito") {
    return (
      <Carrito
        carrito={carrito}
        setCarrito={setCarrito}
        volver={() => setPantalla("menu")}
        irMenu={() => setPantalla("menu")}
        irPerfil={() => setPantalla("perfil")}
        irCarrito={() => setPantalla("carrito")}
      />
    );
  }

  /* PERFIL */
  if (pantalla === "perfil") {
    return (
      <Perfil
        volver={() => setPantalla("menu")}
        cerrarSesion={handleLogout}
      />
    );
  }
}