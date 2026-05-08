"use client";

import { useState } from "react";

import Login from "../components/Login";
import Menu from "../components/Menu";
import Carrito from "../components/Carrito";
import Perfil from "../components/Perfil";

export default function Home() {

  const [pantalla, setPantalla] = useState("login");

  const [carrito, setCarrito] = useState([]);

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

        cerrarSesion={() => setPantalla("login")}
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

        cerrarSesion={() => setPantalla("login")}

      />
    );
  }
}