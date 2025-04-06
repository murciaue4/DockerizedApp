import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { reservationsContext } from "../../../context/reservationsContext";
import { loginContext } from "../../../context/loginContext";
import PriceCard from "../Hoteles/HotelRoomTypeCard";
import SearchBookingNoButton from "../forms/Booking/SearchBookingNoButton";
import ContainerLancer from "../others/ContainerLancer";
import iconFilter from "../../../static/filterIconWhite.svg";
import SliderCardsHotel from "../Home/SliderCardsHotel";
const filterRoomsByPeople = (rooms, people, capacityMapping = {}) => {
  if (!people || people < 1) {
    console.error("El número de personas debe ser un entero mayor a 0");
    return [];
  }
  return rooms.filter((room) => {
    if (!room.room_type || !room.room_type.name) {
      console.warn("La habitación no tiene definido un tipo");
      return false;
    }
    const capacity = capacityMapping[room.room_type.name.toLowerCase()] || 0;
    if (capacity === 0) {
      console.warn(
        `No se encontró capacidad definida para el tipo de habitación: ${room.room_type.name}`
      );
      return false;
    }
    const requiredRooms = Math.ceil(people / capacity);
    return room.available >= requiredRooms;
  });
};
const filterRoomsByGuestListGrouped = (rooms, guestList) => {
  if (!guestList || !Array.isArray(guestList) || guestList.length === 0) {
    console.error("guestList no es un arreglo válido");
    return [];
  }

  // 1. Agrupar las configuraciones: key = cantidad de huéspedes, value = cantidad de configuraciones
  const grouping = {};
  guestList.forEach((guest) => {
    const req = (guest.adults || 0) + (guest.children || 0);
    grouping[req] = (grouping[req] || 0) + 1;
  });

  // Obtiene la clave mínima (la cantidad requerida mínima)
  const keys = Object.keys(grouping).map(Number);
  const minKey = Math.min(...keys);

  // 2. Primer filtro: Solo habitaciones con capacidad >= minKey
  const filteredByMin = rooms.filter((room) => {
    const capacity = room.room_type.capacity; // se asume que es numérico
    return capacity >= minKey;
  });

  // 3. Segundo filtro: para cada habitación, si su capacidad coincide con alguna clave, se verifica que su available sea >= valor del grupo.
  const finalFiltered = filteredByMin.filter((room) => {
    const capacity = room.room_type.capacity;
    if (grouping.hasOwnProperty(capacity)) {
      // Si coincide, se requiere que available >= cantidad de configuraciones que necesitan esa capacidad.
      return room.available >= grouping[capacity];
    }
    // Si no coincide, se deja pasar.
    return true;
  });

  return finalFiltered;
};

const HotelPrices = ({ hotel }) => {
  console.log("hotel", hotel);
  const { user, roomTypes } = useContext(loginContext);
  const { newReservationData } = useContext(reservationsContext);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [filterMode, setFilterMode] = useState("individual"); // Opciones: individual, total, maxPerRoom, minimoPorHabitacion
  const [peoplePerRoom, setPeoplePerRoom] = useState(0);
  const [minPeoplePerRoomFilter, setMinPeoplePerRoomFilter] = useState(0);

  useEffect(() => {
    if (
      hotel &&
      hotel.rooms &&
      roomTypes &&
      roomTypes.length > 0 &&
      newReservationData
    ) {
      const capacityMapping = roomTypes.reduce((acc, type) => {
        acc[type.name.toLowerCase()] = type.capacity;
        return acc;
      }, {});
      console.log("newReservationData in HotelPrices", newReservationData);
      const totalPeople =
        (newReservationData.adults || 0) + (newReservationData.children || 0);
      console.log("Total de personas:", totalPeople);

      let filtered = [];
      console.log("capacityMapping", capacityMapping);

      if (filterMode === "individual") {
        // Extraemos el arreglo guestList. Suponemos que viene en newReservationData.guestList.rooms.
        // Si no existe, se podría usar un fallback con la misma estructura.
        const guestListObj =
          newReservationData.guestList &&
          newReservationData.guestList.rooms &&
          Array.isArray(newReservationData.guestList.rooms) &&
          newReservationData.guestList.rooms.length > 0
            ? newReservationData.guestList
            : {
                rooms: [
                  {
                    adults: newReservationData.adults,
                    children: newReservationData.children,
                  },
                ],
                adults: newReservationData.adults,
                children: newReservationData.children,
              };
        const guestList = guestListObj.rooms;
        filtered = filterRoomsByGuestListGrouped(hotel.rooms, guestList);
      } else if (filterMode === "total") {
        const totalCapacity = hotel.rooms.reduce((sum, room) => {
          if (room.room_type && room.room_type.name) {
            const capacity =
              capacityMapping[room.room_type.name.toLowerCase()] || 0;
            return sum + room.available * capacity;
          }
          return sum;
        }, 0);
        filtered = totalCapacity >= totalPeople ? hotel.rooms : [];
      } else if (filterMode === "minimoPorHabitacion") {
        const eligibleRooms = hotel.rooms.filter((room) => {
          if (room.room_type && room.room_type.name) {
            const capacity =
              capacityMapping[room.room_type.name.toLowerCase()] || 0;
            return capacity >= minPeoplePerRoomFilter;
          }
          return false;
        });
        const totalEffectiveCapacity = eligibleRooms.reduce((sum, room) => {
          const capacity =
            capacityMapping[room.room_type.name.toLowerCase()] || 0;
          return sum + room.available * capacity;
        }, 0);
        filtered = totalEffectiveCapacity >= totalPeople ? eligibleRooms : [];
      } else if (filterMode === "maxPerRoom") {
        const eligibleRooms = hotel.rooms.filter((room) => {
          if (room.room_type && room.room_type.name) {
            const capacity =
              capacityMapping[room.room_type.name.toLowerCase()] || 0;
            return capacity <= peoplePerRoom;
          }
          return false;
        });

        const totalEffectiveCapacity = eligibleRooms.reduce((sum, room) => {
          const capacity =
            capacityMapping[room.room_type.name.toLowerCase()] || 0;
          return sum + room.available * capacity;
        }, 0);

        filtered = totalEffectiveCapacity >= totalPeople ? eligibleRooms : [];
      }

      setFilteredRooms(filtered);
    }
  }, [
    hotel,
    roomTypes,
    filterMode,
    peoplePerRoom,
    minPeoplePerRoomFilter,
    newReservationData, // Dependencia para actualizar el filtrado automáticamente
  ]);

  return (
    <div className="max-w-7xl sm:mx-auto">
      <div>
        <h2 className="text-3xl font-bold mb-4">Habitaciones y Precios</h2>
      </div>
      <SearchBookingNoButton /> {/* Componente de búsqueda de reservas */}
      {/* Sección de selección del modo de filtro */}
      <div className="w-full">
        <div className="w-full bg-primary        bg-opacity-90  text-text-alt p-2 rounded-lg  my-8 flex flex-col items-start">
          <h2 className="text-2xl font-bold mb-4 underline w-full text-start">
            <span>{`¿Necesita alojar a un gran equipo?`}</span>
          </h2>
          <p className="text-small mb-4 text-white">
            <strong className="text-medium"></strong> Utilice el filtro de
            habitaciones para descubrir de forma rápida la opción perfecta y
            disponible para asegurar que todos sus colaboradores se sientan como
            en casa.
          </p>
          <ContainerLancer
            title="Selecciona el modo de filtro"
            subTitle="Ver las opciones disponibles"
            textColor="text-white"
            urlIcon={iconFilter}
            justify="justify-center"
            space={2}
            borderColor="border-border-primary"
            bg="dg-transparent"
            onToggle={() => {}}
            className="mb-4 text-start"
            children={
              <div className="w-full  p-4 rounded-xl  ">
                <div className="grid gap-3 w-full">
                  <div className="w-full">
                    <span>Hasta {hotel?.capacity}</span>
                    <span className="">{` habitaciones para alojar acomodar tu equipo, selecciona la configuracion que mas se acomode a tus necesidades y reserva`}</span>
                    <label
                      htmlFor="filterMode"
                      className="block text-sm font-bold mt-8"
                    >
                      Modo de filtro
                    </label>
                    <select
                      id="filterMode"
                      value={filterMode}
                      onChange={(e) => setFilterMode(e.target.value)}
                      className="w-full p-2 rounded-md border  bg-transparent border-background  "
                    >
                      <option
                        className="bg-transparent text-text-secondary"
                        value="individual"
                      >
                        Por tipo de habitación
                      </option>
                      <option
                        className="bg-transparent text-text-secondary"
                        value="total"
                      >
                        Capacidad total del hotel
                      </option>
                      <option
                        className="bg-transparent text-text-secondary"
                        value="maxPerRoom"
                      >
                        Máximo por habitación
                      </option>
                      <option
                        className="bg-transparent text-text-secondary"
                        value="minimoPorHabitacion"
                      >
                        Mínimo por habitación
                      </option>
                    </select>
                  </div>

                  {filterMode === "maxPerRoom" && (
                    <div>
                      <label
                        htmlFor="peoplePerRoom"
                        className="block text-sm font-bold"
                      >
                        Personas por habitación
                      </label>
                      <input
                        type="number"
                        id="peoplePerRoom"
                        value={peoplePerRoom}
                        onChange={(e) =>
                          setPeoplePerRoom(parseInt(e.target.value, 10))
                        }
                        min="0"
                        className="w-full p-2 rounded-md bg-transparent border border-gray-300 2  "
                      />
                    </div>
                  )}

                  {filterMode === "minimoPorHabitacion" && (
                    <div>
                      <label
                        htmlFor="minPeoplePerRoomFilter"
                        className="block text-sm font-bold"
                      >
                        Mínimo por habitación
                      </label>
                      <input
                        type="number"
                        id="minPeoplePerRoomFilter"
                        value={minPeoplePerRoomFilter}
                        onChange={(e) =>
                          setMinPeoplePerRoomFilter(
                            parseInt(e.target.value, 10)
                          )
                        }
                        min="0"
                        className="w-full p-2 rounded-md bg-transparent border border-gray-300  "
                      />
                    </div>
                  )}
                </div>
                <div
                  className="border border-background p-2 w-full mt-8 text-center bg-background text-primary rounded-xl "
                  onClick={() => {
                    setFilterMode("individual");
                    setPeoplePerRoom(0);
                    setMinPeoplePerRoomFilter(0);
                  }}
                >
                  Limpiar
                </div>
              </div>
            }
          />
        </div>
      </div>
      {/* Listado de habitaciones filtradas */}
      <div className="flex flex-wrap">
        {filteredRooms.map((room) => (
          <div
            key={room.room_type.name}
            className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-8"
          >
            <PriceCard
              room={room}
              filterMode={filterMode}
              peoplePerRoom={peoplePerRoom}
              minPeoplePerRoomFilter={minPeoplePerRoomFilter}
              handleBooking={() => {}}
            />
          </div>
        ))}
      </div>
      <div>{true ? <SliderCardsHotel /> : null}</div>
    </div>
  );
};

export default HotelPrices;
