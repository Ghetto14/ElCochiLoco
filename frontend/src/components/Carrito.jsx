"use client";

export default function Carrito({
  carrito,
  setCarrito,
  volver,
  irMenu,
  irPerfil,
  irCarrito
}) {

  const total = carrito.reduce(
    (acc, item) => acc + (item.precio * item.cantidad),
    0
  );

  /* AUMENTAR */
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

  /* DISMINUIR */
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
                  key={`${item.id}-${item.nombre}-${item.cantidad}`}
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
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="
                      w-28
                      h-28
                      object-cover
                      rounded-xl
                    "
                  />

                  {/* INFO */}
                  <div className="flex-1">

                    <h2 className="text-2xl font-bold text-black">
                      {item.nombre}
                    </h2>

                    <p className="text-gray-700 text-lg">
                      {item.categoria}
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
                      ${item.precio} c/u
                    </p>

                    <p className="text-3xl font-bold text-orange-500">
                      ${item.precio * item.cantidad}
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
                className="
                  w-full
                  bg-orange-500
                  text-white
                  py-4
                  rounded-xl
                  font-bold
                  text-lg
                "
              >
                Proceder al Pago
              </button>

              <button
                onClick={() => setCarrito([])}
                className="
                  w-full
                  border
                  py-4
                  rounded-xl
                  font-bold
                  text-gray-800
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