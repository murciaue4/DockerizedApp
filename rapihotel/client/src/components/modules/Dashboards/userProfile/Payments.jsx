import React from "react";

const PaymentCards = () => {
  return (
    <div className="p-4">
      <div className="container mx-auto mb-4">
        {/* Header Section */}
        <div
          id="item-member"
          className="bg-white p-4 rounded shadow flex flex-col space-y-2"
        >
          <div title="Danniel Murcia">
            <p>
              <a
                href="/profile/landing.html"
                className="text-blue-600 hover:underline"
              >
                Danniel Murcia
              </a>
            </p>
          </div>
          <h1 className="text-2xl font-bold">Tus tarjetas de pago</h1>
        </div>
        {/* Message Alert */}
        <div className="bg-yellow-100 p-4 rounded flex flex-col space-y-2">
          <span className="text-gray-800">
            Puedes agregar una tarjeta al momento del pago.
          </span>
          <span className="text-gray-800">
            La próxima vez que reserves, solo debes iniciar sesión y guardar los datos de tu tarjeta.
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentCards;
