import React, { useContext, useState, useEffect } from "react";
import { loginContext } from "../../../../context/loginContext";
import Mapa from "../../Maps/UpdateMap"; // Componente interactivo para elegir ubicación
import StaticMap from "../../Maps/StaticMap"; // Componente para mostrar ubicación estática
import RoomSection from "../add/RoomSection"; // Componente para agregar habitaciones
import RoomCard from "../RoomsCard"; // Tarjeta para cada habitación
import DeleteFormHotel from "../delete/DeleteFormHotel";
import axios from "axios";

function UpdateFormHotel({ initialData = {}, onSubmit, onClose }) {
  const { servicesList, URLStatic } = useContext(loginContext);

  const initialServices =
    initialData.services && servicesList
      ? initialData.services
          .map(
            (service) =>
              service.id ||
              servicesList.find((s) => s.name === service.name)?.id
          )
          .filter(Boolean)
      : [];

  const [hotelData, setHotelData] = useState({
    id: initialData.id || "",
    id_user: initialData.id_user || "",
    name: initialData.name || "",
    descripcion: initialData.descripcion || "",
    groupName: initialData.groupName || "",
    telefono: initialData.telefono || "",
    segundoTelefono: initialData.segundoTelefono || "",
    email: initialData.email || "",
    type: initialData.type || "hotel",
    location: {
      country: initialData.country || "",
      city: initialData.city || "",
      sector: initialData.sector || "",
      directions: initialData.directions || "",
      barrio: initialData.barrio || "",
      indications: initialData.indications || "",
      lat: initialData.lat || "",
      lng: initialData.lng || "",
    },
    rooms:
      initialData.rooms?.map((room) => ({
        // Se asume que en initialData.rooms el campo "type" es el id del tipo de habitación
        type: room.room_type?.id || room.type || "",
        quantity: room.quantity || 0,
        price: room.price || 0,
        available: room.available || 0,
      })) || [],
    servicios: initialServices,
  });

  const [capturedChoords, setCapturedChoords] = useState(
    hotelData.location.lat && hotelData.location.lng
      ? {
          lat: parseFloat(hotelData.location.lat),
          lng: parseFloat(hotelData.location.lng),
        }
      : null
  );
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [showServicesUI, setShowServicesUI] = useState(false);
  const [showRoomSection, setShowRoomSection] = useState(false);
  const [showDeleteSection, setShowDeleteSection] = useState(false);

  const handleShowDeleteSection = (bol) => {
    setShowDeleteSection(bol);
  };

  useEffect(() => {
    if (capturedChoords) {
      setHotelData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          lat: capturedChoords.lat,
          lng: capturedChoords.lng,
        },
      }));
    }
  }, [capturedChoords]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  const handleRoomChange = (index, field, value) => {
    const updatedRooms = hotelData.rooms.map((room, i) =>
      i === index ? { ...room, [field]: value } : room
    );
    setHotelData((prev) => ({
      ...prev,
      rooms: updatedRooms,
    }));
  };

  const handleServicesChange = (e) => {
    const { value } = e.target;
    const servicios = value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setHotelData((prev) => ({
      ...prev,
      servicios,
    }));
  };

  const handleCheckboxChange = (e) => {
    const serviceId = parseInt(e.target.value, 10);
    if (e.target.checked) {
      setHotelData((prev) => ({
        ...prev,
        servicios: [...prev.servicios, serviceId],
      }));
    } else {
      setHotelData((prev) => ({
        ...prev,
        servicios: prev.servicios.filter((id) => id !== serviceId),
      }));
    }
  };

  const handleDeleteRoom = (index) => {
    setHotelData((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((_, i) => i !== index),
    }));
  };

  const updateRoomsFromRoomSection = (newRooms) => {
    setHotelData((prev) => ({
      ...prev,
      rooms: newRooms,
    }));
  };

  const handleSubmit = () => {
    
    const payload = {
      id: hotelData.id,
      id_user: hotelData.id_user,
      name: hotelData.name,
      descripcion: hotelData.descripcion,
      location: {
        country: hotelData.location.country,
        city: hotelData.location.city,
        sector: hotelData.location.sector,
        directions: hotelData.location.directions,
        barrio: hotelData.location.barrio,
        indications: hotelData.location.indications,
      },
      choords: {
        lat: hotelData.location.lat,
        lng: hotelData.location.lng,
      },
      groupName: hotelData.groupName,
      telefono: hotelData.telefono,
      segundoTelefono: hotelData.segundoTelefono,
      email: hotelData.email,
      type: hotelData.type,
      rooms: hotelData.rooms,
      servicios: hotelData.servicios,
    };
    console.log("payload", payload);
    const sendPayload = async () => {
      try {
        const response = await axios.post(
          `${URLStatic}/user/hoteles/apt/${hotelData.id}/${hotelData.id_user}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response", response);
      } catch (error) {
        console.warn("error", error);
      }
 
  };
  sendPayload();
};

  return (
    <div className="hotel-form-container  bg-primary w-screen h-auto absolute top-0 left-0 z-50  overflow-auto text-text-secondary flex flex-col justify-center items-center">
      <div className="w-full h-auto flex justify-end items-center p-2 sm:p-6 text-accent text-lg">
        <span
          className="font-semibold cursor-pointer "
          onClick={() => {
            onClose();
          }}
        >
          Atrás
        </span>
      </div>
      <section
        onSubmit={handleSubmit}
        className="hotel-form space-y-8  h-full w-full max-w-7xl flex flex-col  xs:p-4 sm:p-4 md:p-6 rounded-xl"
      >
        {/* Información del Hotel */}
        <div className="border-2 border-primary rounded-xl overflow-hidden p-4 space-y-4 bg-primary">
          <h2 className="text-2xl font-bold text-center text-white">
            Información del Hotel
          </h2>

          {/* Datos generales */}
          <div className="form-group">
            <label className="text-white font-semibold" htmlFor="name">
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={hotelData.name}
              onChange={handleInputChange}
              className="border-2 rounded-lg border-secondary p-2  w-full bg-background"
            />
          </div>

          <div className="form-group">
            <label className="text-white font-semibold" htmlFor="descripcion">
              Descripción:
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={hotelData.descripcion}
              onChange={handleInputChange}
              className="border-2 rounded-lg border-secondary p-2  w-full h-auto min-h-60 md:min-h-20 bg-background "
            />
          </div>

          <div className="form-group">
            <label className="text-white font-semibold" htmlFor="groupName">
              Nombre del Grupo:
            </label>
            <input
              type="text"
              id="groupName"
              name="groupName"
              value={hotelData.groupName}
              onChange={handleInputChange}
              className="border-2 rounded-lg border-secondary p-2  w-full bg-background"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="text-white font-semibold" htmlFor="telefono">
                Teléfono:
              </label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={hotelData.telefono}
                onChange={handleInputChange}
                className="border-2 rounded-lg border-secondary p-2  w-full bg-background"
              />
            </div>
            
            <div className="form-group">
              <label
                className="text-white font-semibold"
                htmlFor="segundoTelefono"
              >
                Segundo Teléfono:
              </label>
              <input
                type="text"
                id="segundoTelefono"
                name="segundoTelefono"
                value={hotelData.segundoTelefono}
                onChange={handleInputChange}
                className="border-2 rounded-lg border-secondary p-2  w-full bg-background"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="text-white font-semibold" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={hotelData.email}
              onChange={handleInputChange}
              className="border-2 rounded-lg border-secondary p-2  w-full bg-background"
            />
          </div>

          <div className="form-group">
            <label className="text-white font-semibold" htmlFor="type">
              Tipo:
            </label>
            <select
              id="type"
              name="type"
              value={hotelData.type}
              onChange={handleInputChange}
              className="border-2 rounded-lg border-secondary p-2  w-full bg-background"
            >
              <option value="hotel">Hotel</option>
              <option value="hostal">Hostal</option>
              <option value="apartamento">Apartamento</option>
              <option value="motel">Motel</option>
              <option value="campanmento">Campamento</option>
            </select>
          </div>
        </div>

        {/* Ubicación textual */}
        <div className="border-2 border-primary rounded-xl overflow-hidden p-4 space-y-4  bg-primary">
          <h3 className="text-2xl font-bold text-center text-white">
            Información de la dirección
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="text-white font-semibold" htmlFor="country">
                País:
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={hotelData.location.country}
                onChange={handleLocationChange}
                className="border-2 rounded-lg border-secondary p-2  w-full bg-background"
              />
            </div>
            <div className="form-group">
              <label className="text-white font-semibold" htmlFor="city">
                Ciudad:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={hotelData.location.city}
                onChange={handleLocationChange}
                className="border-2 rounded-lg border-secondary p-2  w-full bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-group">
              <label className="text-white font-semibold" htmlFor="sector">
                Sector:
              </label>
              <input
                type="text"
                id="sector"
                name="sector"
                value={hotelData.location.sector}
                onChange={handleLocationChange}
                className="border-2 rounded-lg border-secondary p-2  w-full bg-background"
              />
            </div>
            <div className="form-group">
              <label className="text-white font-semibold" htmlFor="directions">
                Direcciones:
              </label>
              <input
                type="text"
                id="directions"
                name="directions"
                value={hotelData.location.directions}
                onChange={handleLocationChange}
                className="border-2 rounded-lg border-secondary p-2  w-full bg-background"
              />
            </div>
            <div className="form-group">
              <label className="text-white font-semibold" htmlFor="barrio">
                Barrio:
              </label>
              <input
                type="text"
                id="barrio"
                name="barrio"
                value={hotelData.location.barrio}
                onChange={handleLocationChange}
                className="border-2 rounded-lg border-secondary p-2  w-full bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-group">
              <label className="text-white font-semibold" htmlFor="indications">
                Indicaciones:
              </label>
              <input
                type="text"
                id="indications"
                name="indications"
                value={hotelData.location.indications}
                onChange={handleLocationChange}
                className="border-2 rounded-lg border-secondary p-2  w-full bg-background"
              />
            </div>
            <div className="form-group hidden">
              <label className="text-white font-semibold" htmlFor="lat">
                Latitud:
              </label>
              <input
                type="text"
                id="lat"
                name="lat"
                value={hotelData.location.lat}
                onChange={handleLocationChange}
                className="border-2 rounded-lg border-secondary p-2  w-full bg-background"
                readOnly
              />
            </div>
            <div className="form-grou hidden">
              <label className="text-white font-semibold" htmlFor="lng">
                Longitud:
              </label>
              <input
                type="text"
                id="lng"
                name="lng"
                value={hotelData.location.lng}
                onChange={handleLocationChange}
                className="border-2 rounded-lg border-secondary p-2  w-full bg-background"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Sección de Ubicación en el Mapa */}
        <div className="mt-8 border-2 border-primary rounded-xl overflow-hidden bg-primary">
          <h3 className="text-2xl mt-4 font-bold text-center text-white">
            Ubicación en el Mapa
          </h3>

          {isEditingLocation ? (
            <div className="mt-4 border-4">
              <Mapa
                defaultCenter={capturedChoords || { lat: 0, lng: 0 }}
                onLocationSelected={setCapturedChoords}
               
              />
            </div>
          ) : capturedChoords ? (
            <div className="w-full h-52 flex justify-center my-4 overflow-hidden">
              <StaticMap
                choords={capturedChoords}
                className="w-full h-full rounded-lg"
              />
            </div>
          ) : null}
          <button
            type="button"
            onClick={() => setIsEditingLocation((prev) => !prev)}
            className="w-full px-4 py-2 bg-secondary hover:bg-primary text-white rounded mt-2 transition"
          >
            {isEditingLocation
              ? "Cancelar edición de ubicación"
              : "Editar Ubicación"}
          </button>
        </div>

        {/* Sección de Habitaciones */}
        <div className=" border-2 border-primary rounded-xl overflow-hidden bg-primary">
          <h3 className="text-2xl font-bold text-center text-white mb-6">
            Habitaciones
          </h3>
          <section className="w-full h-auto flex justify-evenly flex-wrap rounded">
            {hotelData.rooms.map((room, index) => (
              <RoomCard
                key={index}
                room={room}
                index={index}
                onChange={handleRoomChange}
                onDelete={handleDeleteRoom}
              />
            ))}
          </section>
          {/* Toggle para mostrar/ocultar el componente RoomSection */}

          {showRoomSection && (
            <div className="px-2">
              <RoomSection
                setHabitaciones={updateRoomsFromRoomSection}
                hab={hotelData.rooms}
              />
            </div>
          )}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowRoomSection((prev) => !prev)}
              className="w-full px-4 py-2 bg-secondary hover:bg-primary text-white rounded transition"
            >
              {showRoomSection
                ? "Ocultar agregar habitaciones"
                : "Agregar nuevas habitaciones"}
            </button>
          </div>
        </div>

        {/* Sección de Servicios */}
        <div className="mt-4 border-2 border-primary  rounded-xl overflow-hidden bg-primary text-white">
          <h3 className="text-2xl font-bold text-center text-white mt-4">
            Servicios
          </h3>

          {showServicesUI && servicesList && (
            <div className="w-full mt-4  px-4">
              {[
                ...new Set(servicesList.map((service) => service.category)),
              ].map((category) => (
                <fieldset
                  key={category}
                  className="mb-4 border border-border p-2 -lg rounded-xl"
                >
                  <legend className="text-xl font-bold text-accent">
                    {category}
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {servicesList
                      .filter((service) => service.category === category)
                      .map((service) => (
                        <label
                          key={service.id}
                          className="flex items-center space-x-3 cursor-pointer text-white font-semibold "
                        >
                          <input
                            type="checkbox"
                            value={service.id}
                            checked={hotelData.servicios.includes(service.id)}
                            onChange={handleCheckboxChange}
                            className="form-checkbox ring-0  h-5 w-5 focus:ring-2 focus:ring-accent"
                          />
                          <span className="text-md m-0">{service.name}</span>
                        </label>
                      ))}
                  </div>
                </fieldset>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => setShowServicesUI((prev) => !prev)}
            className="w-full px-4 py-2 mt-4 bg-secondary hover:bg-primary text-white rounded transition"
          >
            {showServicesUI
              ? "Ocultar opciones de servicios"
              : "Editar servicios"}
          </button>
        </div>

        <section className="w-full h-auto flex flex-col justify-center items-center space-y-4 px-4 ">
          <div className="cluster-buttons w-full flex justify-center items-center space-x-10  mb-20 ">
            <button
              type="submit"
              className="px-6 min-h-10 min-w-40 w-1/3 py-2 bg-backgroundAlt border-2 border-primary  font-bold text-lg hover:bg-primary hover:font-bold transition text-primary hover:text-white rounded mt-2"
              onClick={() => {
                console.log("hotelData", hotelData);
                onClose();
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 min-h-10 min-w-40 w-1/3 py-2 bg-accent font-bold border-2 border-accent text-lg hover:bg-primary hover:font-bold transition text-primary hover:text-accent rounded mt-2"
              onClick={() => {
                handleSubmit();
                onClose();
              }}
            >
              Guardar 
            </button>
          </div>
          {!showDeleteSection ? (
            <button
              type="button"
              className="px-6 min-h-10 min-w-40 w-1/3 py-2 bg-red-500 font-bold border-2 border-red-500 text-lg hover:bg-white hover:font-bold transition text-white hover:text-red-500 rounded mt-2"
              onClick={() => handleShowDeleteSection(true)}
            >
              Eliminar propiedad
            </button>
          ) : (
            <section className="w-full h-auto rounded-2xl flex flex-col justify-center items-center">
              <DeleteFormHotel onClose={handleShowDeleteSection} />
            </section>
          )}
        </section>
      </section>
    </div>
  );
}

export default UpdateFormHotel
