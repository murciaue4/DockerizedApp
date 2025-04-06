import React, { useState } from "react";

const UpdateContactInfo = ({
  onClose,
  user = {
    id: 16,
    name: "gerson",
    middle_name: null,
    lastname: "murcia",
    birthday: null,
    gender: null,
    accessibility_needs: null,
    email: "gdmp92@hotmail.com",
    telefono: null,
    segundoTelefono: null,
    usertype: 0,
    created_date: "2024-12-21T00:02:48.000Z",
    verify: 1,
  },
}) => {
  const [formData, setFormData] = useState({
    email: user.email || "",
    telefono: user.telefono || "",
    segundoTelefono: user.segundoTelefono || "",
  });

  // Maneja el cambio en cualquier input del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Payload a enviar:", formData);
    // Aquí se implementaría la llamada a la API
  };

  // Clase unificada para los inputs que coincide con los estilos del componente base
  const inputClass =
    "mt-1 block w-full border border-black px-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 h-8";

  return (
    <div
      id="app-layer-universal-profile-content"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-scroll scrollbar-hide"
      aria-hidden="false"
      tabIndex="-1"
    >
      <div className="bg-background h-full p-6 md:h-3/4 lg:w-1/3 xl:w-1/4 rounded-lg shadow-lg overflow-auto">
        <div>
          {/* Encabezado */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-800"
              onClick={onClose}
              aria-label="Volver"
            >
              <svg
                className="w-6 h-6"
                aria-label="Volver"
                role="img"
                viewBox="0 0 24 24"
              >
                <title>Volver</title>
                <path d="M10.793 5a.5.5 0 0 0-.354.146l-6.146 6.147a1 1 0 0 0 0 1.414l6.146 6.147a.5.5 0 0 0 .354.146h1.914c.258 0 .385-.322.207-.5l-5.5-5.5H19.5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H7.414l5.502-5.502c.175-.18.047-.498-.209-.498h-1.914z" />
              </svg>
            </button>
          </div>
          <div className="flex justify-center mb-4">
            <div className="max-w-lg">
              <h3 className="text-xl font-semibold">Información de Contacto</h3>
              <p className="mt-2 text-sm text-gray-600">
                Actualiza tu información de contacto para mantenerte al día.
              </p>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-6 max-w-lg w-full">
              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Teléfono
                </label>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Segundo Teléfono
                </label>
                <p className="mt-2 text-xs font-semibold text-gray-600">
               Puedes elegir un segundo número de teléfono o marcarlo como numero de <span>EMERGENCIAS</span>.
              </p>
              <input type="checkbox" className="bg-black" aria-label="maracar como numero de emergencias"/>
                <input
                  type="text"
                  name="segundoTelefono"
                  value={formData.segundoTelefono}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Calle
                </label>
                <input
                  type="text"
                  id="address1"
                  name="address1"
                  className={inputClass}
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Dirección (continuación)
                </label>
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  className={inputClass}
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Ciudad
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className={inputClass}
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Estado
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className={inputClass}
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Código postal
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  className={inputClass}
                  placeholder=""
                />
              </div>
              <div className="self-center">
                <button
                  type="submit"
                  className="w-full px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateContactInfo;
