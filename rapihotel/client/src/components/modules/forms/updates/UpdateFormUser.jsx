import { DateInput } from "@heroui/react";
import { CalendarDate, parseDate, } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import React, { useState } from "react";

const UpdateFormUser = ({onClose, user}) => {
    const formater = new useDateFormatter({ dateStyle: "long", timeZone: "UTC" });
  // Estado para gestionar los datos del formulario
  const [formData, setFormData] = useState({
    firstName: "Danniel",
    middleName: "",
    lastName: "Murcia",
    dateOfBirth: parseDate("2000-01-01"),
    gender: "",
    accessibilityNeeds: "NOT_PROVIDED",
  });

  console.log("formData", formData);
  // Maneja el cambio en cualquier input del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log("formData", formData);
  };
 const payload = {
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      // Se formatea la fecha en formato AAAA-MM-DD
      dateOfBirth: `${formData.dateOfBirth.year}-${String(
        formData.dateOfBirth.month
      ).padStart(2, "0")}-${String(formData.dateOfBirth.day).padStart(2, "0")}`,
      // Se envían los valores de género y necesidades de accesibilidad
      gender: formData.gender,
      accessibilityNeeds: formData.accessibilityNeeds,
    };
  // Función para enviar la información al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Se arma el payload a enviar. Se pueden hacer ajustes según la estructura requerida.
   

    console.log("Payload a enviar:", payload);

    // try {
    //   const response = await fetch("YOUR_BACKEND_API_ENDPOINT", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Error en el envío de datos");
    //   }

    //   const result = await response.json();
    //   console.log("Datos enviados correctamente:", result);
    //   // Aquí se puede agregar lógica adicional, como mostrar una notificación de éxito
    // } catch (error) {
    //   console.error("Error al enviar los datos:", error);
    //   // Aquí se puede agregar lógica para mostrar el error al usuario
    // }
  };

  return (
    <div
      id="app-layer-universal-profile-content"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-scroll scrollbar-hide  "
      aria-hidden="false"
      tabIndex="-1"
    >
      <div className="bg-background h-full p-6 md:h-3/4 lg:w-1/3 xl:w-1/4 rounded-lg shadow-lg overflow-auto ">
        <div id="edit-basic-info-form ">
          {/* Encabezado del formulario */}
          <div className="flex items-center justify-between mb-4">
            {/* boton atras */}
            <button
              type="button"
              className=" text-gray-600 hover:text-gray-800"
              onClick={onClose}
              aria-label="Volver"
            >
              <svg
                className="w-6 h-6"
                aria-label="Volver"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <title>Volver</title>
                <path d="M10.793 5a.5.5 0 0 0-.354.146l-6.146 6.147a1 1 0 0 0 0 1.414l6.146 6.147a.5.5 0 0 0 .354.146h1.914c.258 0 .385-.322.207-.5l-5.5-5.5H19.5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H7.414l5.502-5.502c.175-.18.047-.498-.209-.498h-1.914z" />
              </svg>
            </button>
          </div>
          <div className="flex justify-center mb-4">
            <div className="max-w-lg">
              <h3 className="text-xl font-semibold">Información básica</h3>
              <p className="mt-2 text-sm text-gray-600">
                La información ingresada debe coincidir con la del documento de
                identidad que uses para viajar.
              </p>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <div className="flex flex-col gap-6 max-w-lg w-full">
                {/* Nombre completo */}
                <fieldset>
                  <legend className="mb-3 text-base font-medium">
                    Nombre completo
                  </legend>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label
                        htmlFor="profile-first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nombre <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="profile-first-name"
                        name="firstName"
                        type="text"
                        aria-label="Nombre"
                        className="mt-1 block w-full border border-black px-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 h-8"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="profile-middle-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Segundo nombre
                      </label>
                      <input
                        id="profile-middle-name"
                        name="middleName"
                        type="text"
                        aria-label="Segundo nombre"
                        className="mt-1 block w-full border border-black px-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 h-8"
                        value={formData.middleName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="profile-last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Apellido <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="profile-last-name"
                        name="lastName"
                        type="text"
                        aria-label="Apellido"
                        className="mt-1 block w-full border border-black px-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 h-8"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Fecha de nacimiento */}
                <fieldset>
                  <legend className="mb-3 text-base font-medium">
                    Fecha de nacimiento
                  </legend>
                  <div className="w-full flex flex-row gap-2">
                    <div className="w-full flex flex-col gap-y-2">
                      <DateInput

                        label="mes / dia / año"
                        value={formData.dateOfBirth}
                        onChange={(date) => {
                          setFormData((prev) => ({
                            ...prev,
                            dateOfBirth: date,
                          }));
                        }}
                      />
                      <p className="text-default-500 text-xs">
                      
                      </p>
                    </div>
                  </div>
                </fieldset>

                {/* Género */}
                <fieldset>
                  <h6 className="mb-3 text-base font-medium">Género</h6>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="FEMALE"
                          checked={formData.gender === "FEMALE"}
                          onChange={handleChange}
                          className="mr-2"
                          aria-label="Femenino"
                        />
                        <span>Femenino</span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="MALE"
                          checked={formData.gender === "MALE"}
                          onChange={handleChange}
                          className="mr-2"
                          aria-label="Masculino"
                        />
                        <span>Masculino</span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="UNSPECIFIED"
                          checked={formData.gender === "UNSPECIFIED"}
                          onChange={handleChange}
                          className="mr-2"
                          aria-label="Indefinido"
                        />
                        <span>Indefinido</span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="UNDISCLOSED"
                          checked={formData.gender === "UNDISCLOSED"}
                          onChange={handleChange}
                          className="mr-2"
                          aria-label="Prefiero no decirlo"
                        />
                        <span>Prefiero no decirlo</span>
                      </label>
                    </div>
                  </div>
                </fieldset>

                {/* Facilidades de acceso */}
                <fieldset>
                  <legend className="mb-3 text-base font-medium">
                    Facilidades de acceso
                  </legend>
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-700">
                      Agrega esta información para ayudarnos a diseñar
                      facilidades de acceso para las personas con discapacidad
                      en sus viajes.
                    </p>
                    <div className="relative">
                      <label
                        htmlFor="accessibility-needs"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Elige una opción
                      </label>
                      <select
                        id="accessibility-needs"
                        name="accessibilityNeeds"
                        aria-label="Elige una opción"
                        className="mt-1 block w-full border border-black px-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 h-8"
                        value={formData.accessibilityNeeds}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Selecciona una opción
                        </option>
                        <option value="NOT_PROVIDED">Sin información</option>
                        <option value="NO">
                          No, no necesito facilidades de acceso
                        </option>
                        <option value="YES">
                          Sí, necesito facilidades de acceso
                        </option>
                        <option value="RATHER_NOT_SAY">
                          Prefiero no especificarlo
                        </option>
                      </select>
                    </div>
                  </div>
                </fieldset>

                {/* Botón de envío */}
                <div className="self-center">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFormUser;
