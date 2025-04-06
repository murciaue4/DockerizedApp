import React from 'react';

const HotelCard = () => {
  return (
    <div className="relative flex flex-col justify-between border rounded-lg shadow-md p-4 bg-white z-10 max-w-screen-sm" draggable>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <header className="bg-blue-600 text-white py-2 px-4 rounded-t-lg">
          <h3 className="text-lg font-bold">Opción muy elegida</h3>
        </header>
      </div>

      {/* Contenedor de imagen (simulando carrusel simple) */}
      <div className="mt-10 relative">
        <img
          src="https://images.trvl-media.com/lodging/9000000/8060000/8051100/8051095/bc850a3a.jpg?impolicy=fcrop&w=1200&h=800&quality=medium"
          alt="Sábanas de algodón egipcio, ropa de cama de alta calidad y cubrecamas"
          className="w-full h-56 object-cover rounded-md"
        />
        {/* Controles simples */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button className="bg-gray-700 text-white rounded-full p-2 opacity-75 hover:opacity-100">
            &larr;
          </button>
          <button className="bg-gray-700 text-white rounded-full p-2 opacity-75 hover:opacity-100">
            &rarr;
          </button>
        </div>
      </div>

      {/* Detalles */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Habitación económica</h3>
        <div className="flex items-center mt-2">
          <span className="bg-green-500 text-white text-sm font-bold rounded px-2 py-1">
            9,0
          </span>
          <div className="ml-2">
            <p className="text-gray-800">Magnífica</p>
            <p className="text-gray-500 text-sm">17 opiniones</p>
          </div>
        </div>

        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          <li className="flex items-center">
            <span className="mr-2 text-green-600">✔</span>
            Estacionamiento gratis
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-600">✔</span>
            29 m²
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-600">✔</span>
            Capacidad para 3
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-600">✔</span>
            1 cama Queen size
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-600">✔</span>
            wifi gratis
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-600">✔</span>
            Acumula sellos y canjea noches
          </li>
        </ul>

        {/* Botón de "No reembolsable" */}
        <div className="mt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            No reembolsable
          </button>
        </div>

        {/* Sección de precios */}
        <div className="mt-4 text-right">
          <div className="text-sm text-gray-500 line-through">USD 97</div>
          <div className="text-2xl font-bold text-gray-900">USD 82</div>
          <div className="text-sm text-gray-600">USD 82 en total</div>
        </div>
      </div>

      {/* Botón de reserva */}
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Reservar
      </button>

      {/* Mensaje de información */}
      <div className="mt-2 text-center text-sm text-gray-500">
        Aún no se te cobrará nada.
      </div>
    </div>
  );
};

export default HotelCard;
