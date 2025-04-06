
import { useState, useContext } from "react";
import AlertStandard from "../../alerts/AlertStandard";
import { loginContext } from "../../../../context/loginContext";


const ReviewHotelForm = ({ formData, handleFormDataSubmit, onClose, next, back }) => {

  const { roomTypes } = useContext(loginContext);

  const [showAlert , setShowAlert] = useState(false);


  console.log("submit Data", formData);


  const handleSubmit = async () => {
    const hotelId = await handleFormDataSubmit();
  
    if (hotelId) {
      next(true);
      onClose(false);
    } else {
      alert("Hubo un error al registrar el hotel. Intenta nuevamente.");
    }
  };
  
  const handleBack = () => {
    back(true);
    onClose(false)
  }


  const services = [
    { id: 1, name: "Recepción 24 horas", category: "Servicios Generales" },
    { id: 2, name: "Wi-Fi gratuito", category: "Servicios Generales" },
    { id: 3, name: "Estacionamiento", category: "Servicios Generales" },
    {
      id: 4,
      name: "Servicio de habitaciones",
      category: "Servicios Generales",
    },
    { id: 5, name: "Consigna de equipaje", category: "Servicios Generales" },
    { id: 6, name: "Servicio de traslado", category: "Servicios Generales" },
    {
      id: 7,
      name: "Acceso para personas con movilidad reducida",
      category: "Servicios Generales",
    },
    {
      id: 8,
      name: "Servicio de lavandería y tintorería",
      category: "Servicios Generales",
    },
    { id: 9, name: "Caja fuerte", category: "Servicios Generales" },
    { id: 10, name: "Cambio de moneda", category: "Servicios Generales" },
    { id: 11, name: "Servicio de concierge", category: "Servicios Generales" },
    {
      id: 12,
      name: "Check-in/check-out express",
      category: "Servicios Generales",
    },
    {
      id: 13,
      name: "Alquiler de autos y bicicletas",
      category: "Servicios Generales",
    },
    { id: 14, name: "Ascensores", category: "Servicios Generales" },

    {
      id: 15,
      name: "Aire acondicionado/calefacción",
      category: "Servicios en la Habitación",
    },
    {
      id: 16,
      name: "Televisión de pantalla plana",
      category: "Servicios en la Habitación",
    },
    { id: 17, name: "Mini bar", category: "Servicios en la Habitación" },
    { id: 18, name: "Caja fuerte", category: "Servicios en la Habitación" },
    {
      id: 19,
      name: "Escritorio de trabajo",
      category: "Servicios en la Habitación",
    },
    {
      id: 20,
      name: "Secador de cabello",
      category: "Servicios en la Habitación",
    },
    {
      id: 21,
      name: "Plancha y tabla de planchar",
      category: "Servicios en la Habitación",
    },
    {
      id: 22,
      name: "Baño privado con amenidades",
      category: "Servicios en la Habitación",
    },
    {
      id: 23,
      name: "Servicio de despertador",
      category: "Servicios en la Habitación",
    },
    {
      id: 24,
      name: "Servicio de limpieza diaria",
      category: "Servicios en la Habitación",
    },

    { id: 25, name: "Restaurante(s)", category: "Gastronomía" },
    { id: 26, name: "Bar o lounge", category: "Gastronomía" },
    { id: 27, name: "Cafetería", category: "Gastronomía" },
    { id: 28, name: "Desayuno buffet", category: "Gastronomía" },
    {
      id: 29,
      name: "Servicio de catering para eventos",
      category: "Gastronomía",
    },
    { id: 30, name: "Menús especiales", category: "Gastronomía" },
    { id: 31, name: "Room service", category: "Gastronomía" },

    { id: 32, name: "Piscina", category: "Ocio y Entretenimiento" },
    {
      id: 33,
      name: "Spa y centro de bienestar",
      category: "Ocio y Entretenimiento",
    },
    { id: 34, name: "Gimnasio", category: "Ocio y Entretenimiento" },
    { id: 35, name: "Sauna y jacuzzi", category: "Ocio y Entretenimiento" },
    { id: 36, name: "Club infantil", category: "Ocio y Entretenimiento" },
    {
      id: 37,
      name: "Zona de juegos para niños",
      category: "Ocio y Entretenimiento",
    },
    {
      id: 38,
      name: "Actividades recreativas",
      category: "Ocio y Entretenimiento",
    },
    {
      id: 39,
      name: "Excursiones organizadas",
      category: "Ocio y Entretenimiento",
    },
    {
      id: 40,
      name: "Entretenimiento en vivo",
      category: "Ocio y Entretenimiento",
    },
    {
      id: 41,
      name: "Campo de golf o minigolf",
      category: "Ocio y Entretenimiento",
    },
    {
      id: 42,
      name: "Cancha de tenis o pádel",
      category: "Ocio y Entretenimiento",
    },

    {
      id: 43,
      name: "Salas de reuniones y conferencias",
      category: "Servicios de Negocios",
    },
    { id: 44, name: "Centro de negocios", category: "Servicios de Negocios" },
    {
      id: 45,
      name: "Impresoras y fotocopiadoras",
      category: "Servicios de Negocios",
    },
    {
      id: 46,
      name: "Wi-Fi de alta velocidad",
      category: "Servicios de Negocios",
    },
    {
      id: 47,
      name: "Equipos audiovisuales",
      category: "Servicios de Negocios",
    },

    { id: 48, name: "Admisión de mascotas", category: "Servicios Especiales" },
    { id: 49, name: "Servicios para bodas", category: "Servicios Especiales" },
    {
      id: 50,
      name: "Servicios de fotografía",
      category: "Servicios Especiales",
    },
    { id: 51, name: "Guardaesquíes", category: "Servicios Especiales" },
    { id: 52, name: "Zona de playa privada", category: "Servicios Especiales" },
    { id: 53, name: "Servicio de niñera", category: "Servicios Especiales" },

    {
      id: 54,
      name: "Tienda de regalos y souvenirs",
      category: "Otros Servicios",
    },
    {
      id: 55,
      name: "Farmacia o botiquín disponible",
      category: "Otros Servicios",
    },
    { id: 56, name: "Cajero automático", category: "Otros Servicios" },
    { id: 57, name: "Máquinas expendedoras", category: "Otros Servicios" },
    {
      id: 58,
      name: "Servicio de transporte gratuito",
      category: "Otros Servicios",
    },
  ];
  const {
    id,
    id_user,
    name,
    email,
    location: { city, country, sector, directions, barrio, indications },
    choords: { lat, lng },
    capacity,
    type,
    servicios,
    groupName,
    telefono,
    segundoTelefono,
    rooms,
    descripcion,
  } = formData;
  const serviciosArray = servicios
return (
  <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg w-full  max-w-4xl mx-auto my-">
    <h1 className="text-3xl sm:text-4xl font-extrabold  text-center text-gray-800 mt-12 mb-8">
      Revisa <span className="text-primary">tu información</span>
    </h1>
    <div className="w-full space-y-6">
      {/* Información General */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-center mb-10 text-secondary ">Información General</h3>
        <p className="text-gray-600"><strong>ID:</strong> {id === 0 ? "Nuevo" : id}</p>
        <p className="text-gray-600"><strong>ID Usuario:</strong> {id_user}</p>
        <p className="text-gray-600"><strong>Nombre:</strong> {name}</p>
        <p className="text-gray-600"><strong>Email:</strong> {email}</p>
        <p className="text-gray-600"><strong>Teléfono:</strong> {telefono}</p>
        <p className="text-gray-600"><strong>Segundo Teléfono:</strong> {segundoTelefono}</p>
        <p className="text-gray-600">
          <strong>Descripción:</strong>
          <span className="block mt-2 bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
            {descripcion}
          </span>
        </p>
      </div>

      {/* Ubicación */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-center mb-10 text-secondary ">Ubicación</h3>
        <p className="text-gray-600"><strong>Ciudad:</strong> {city}</p>
        <p className="text-gray-600"><strong>País:</strong> {country}</p>
        <p className="text-gray-600"><strong>Sector:</strong> {sector}</p>
        <p className="text-gray-600"><strong>Dirección:</strong> {directions}</p>
        <p className="text-gray-600"><strong>Barrio:</strong> {barrio}</p>
        <p className="text-gray-600"><strong>Indicaciones:</strong> {indications}</p>
        <p className="text-gray-600"><strong>Coordenadas:</strong> {lat}, {lng}</p>
      </div>

      {/* Servicios */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-center mb-10 text-secondary">Servicios</h3>
        <ul className="flex flex-wrap gap-2">
          {serviciosArray.length > 0 ? (
            serviciosArray.map((serviceId) => {
              const service = services.find((s) => s.id === serviceId);
              return (
                <span
                  key={serviceId}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm shadow-sm"
                >
                  {service?.name}
                </span>
              );
            })
          ) : (
            <p className="text-gray-500">No se han agregado servicios.</p>
          )}
        </ul>
      </div>

      {/* rooms */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-center mb-10 text-secondary ">Habitaciones</h3>
        {rooms && Object.keys(rooms).length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(rooms).map((key) => (
              <div
                key={key}
                className="bg-gray-50 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-200"
              >
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  {roomTypes[rooms[key].type - 1].name.charAt(0).toUpperCase() +
                    roomTypes[rooms[key].type - 1].name.slice(1)}
                </h4>
                <p className="text-sm text-gray-600">
                  <strong>Cantidad:</strong> {rooms[key].quantity}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Precio:</strong> ${rooms[key].price}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Disponibles:</strong> {rooms[key].available}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No se han agregado habitaciones.</p>
        )}
      </div>
    </div>

    {/* Botones */}
    <div className="w-full flex flex-col justify-center items-center mt-20">
      <button
        onClick={handleBack}
         className="w-full max-w-[500px] mb-5 flex justify-center items-center rounded-xl h-12 text-primary font-semibold bg-background"
      >
        {"Editar"}
      </button>
      <button
        onClick={handleSubmit}
        className="w-full max-w-[500px] mb-5 flex justify-center items-center rounded-xl h-12 text-white font-semibold bg-primary"

      >
        {"Siguiente"}
      </button>
    </div>
  </div>
);
};

export default ReviewHotelForm;
