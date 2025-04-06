import editIcon from "../../../static/editIcon-02.svg";
import deleteIcon from "../../../static/deleteIcon2.sg-14.svg";
import UpdateFormHotel from "../forms/updates/UpdateFormHotel";

import { useState } from "react";

const OwnersTable = ({ propertys }) => {
  const [showUpdateHotelForm, setShowUpdateHotelForm] = useState(false);
  const [propertyToUpdate, setPropertyToUpdate] = useState(null);

  const handleShowUpdateHotelForm = (property) => {
    setPropertyToUpdate(property);
    setShowUpdateHotelForm(true);
  };

  const handleHideUpdateHotelForm = () => {
    setShowUpdateHotelForm(false);
  };

  return (
    <div className="overflow-x-auto rounded-lg overflow-hidden ">
      {showUpdateHotelForm && <UpdateFormHotel initialData={propertyToUpdate} onClose={handleHideUpdateHotelForm} />}
      <table className="min-w-full divide-y divide-gray-200 ">
        <thead className="bg-secondary text-white  ">
          <tr className="text-left">
            {/* Se mostrará solo en pantallas lg o mayores */}
            <th className="px-4 py-2 text-left text-sm font-medium hidden lg:table-cell">
              ID
            </th>
            {/* Se mostrará en pantallas md o mayores */}
            <th className="px-4 py-2 text-left text-sm font-medium hidden md:table-cell">
              Tipo
            </th>
            {/* Siempre visible */}
            <th className="px-4 py-2 text-left text-sm font-medium">Nombre</th>
            {/* Se mostrará solo en pantallas lg o mayores */}
            <th className="px-4 py-2 text-left text-sm font-medium hidden lg:table-cell">
              Ubicación
            </th>
            {/* Se mostrará solo en pantallas lg o mayores */}
            <th className="px-4 py-2 text-left text-sm font-medium hidden lg:table-cell">
              Capacidad
            </th>
            {/* Se mostrará en pantallas md o mayores */}
            <th className="px-4 py-2 text-left text-sm font-medium hidden md:table-cell">
              Precio
            </th>
            {/* Siempre visible */}
            <th className="px-4 py-2 text-center text-sm font-medium">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {propertys?.map((property, index) => (
            <tr
              key={index}
              className="hover:bg-slate-50 transition-colors cursor-pointer"
              onClick={() => handleShowUpdateHotelForm(property)}
            >
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 hidden lg:table-cell">
                {property.id || "N/A"}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 hidden md:table-cell">
                {property.type || "N/A"}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                {property.name || "N/A"}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 hidden lg:table-cell">
                {property.location || "N/A"}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 hidden lg:table-cell">
                {property.capacity || "N/A"}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600 hidden md:table-cell">
                {property.avgPrice ? `$ ${property.avgPrice}` : "N/A"}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <button
                    className="h-8 w-8 flex items-center justify-center rounded hover:bg-green-100 transition-colors"
                    title="Editar"
                  >
                    <img src={editIcon} alt="Editar" className="h-5 w-5" />
                  </button>
                  <button
                    className="h-8 w-8 flex items-center justify-center rounded hover:bg-red-100 transition-colors"
                    title="Eliminar"
                  >
                    <img src={deleteIcon} alt="Eliminar" className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {propertys?.length === 0 && (
            <tr>
              <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                No hay registros disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OwnersTable;
