import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { reservationsContext } from "../../../context/reservationsContext";
import { loginContext } from "../../../context/loginContext";
import { addDays } from "../../../helpers";
import PriceCard from "../Home/PriceCard"; // Asegúrate de ajustar la ruta de importación
import { set } from "react-hook-form";

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

const PricesDetails = ({ hotel }) => {
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [nights, setNights] = useState(1);
  const [manualNights, setManualNights] = useState(false);
  const [people, setPeople] = useState(1);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [filterMode, setFilterMode] = useState("total"); // Opciones: individual, total, maxPerRoom, minimoPorHabitacion
  const [peoplePerRoom, setPeoplePerRoom] = useState(0);
  const [minPeoplePerRoomFilter, setMinPeoplePerRoomFilter] = useState(0);
  const { roomTypes } = useContext(loginContext);
  const { setBookingData, user } = useContext(reservationsContext);
  const navigate = useNavigate();

  const diffDays = (start, end) => {
    return Math.ceil((end - start) / (1000 * 3600 * 24));
  };

  useEffect(() => {
    if (checkin && checkout && !manualNights) {
      const diff = diffDays(checkin, checkout);
      const validDiff = diff < 1 ? 1 : diff;
      if (validDiff !== nights) {
        setNights(validDiff);
      }
    }
  }, [checkin, checkout, manualNights, nights]);

  useEffect(() => {
    if (checkin && nights && manualNights) {
      const newCheckout = addDays(checkin, nights);
      if (!checkout || checkout.getTime() !== newCheckout.getTime()) {
        setCheckout(newCheckout);
      }
    }
  }, [nights, checkin, manualNights, checkout]);

  const handleCheckinChange = (date) => {
    setCheckin(date);
    setManualNights(false);
    if (checkout && date > checkout) {
      setCheckout(null);
    }
  };

  const handleNightsChange = (e) => {
    const newNights = parseInt(e.target.value, 10);
    setManualNights(true);
    if (isNaN(newNights) || newNights < 1) {
      setNights(1);
    } else {
      setNights(newNights);
    }
  };

  useEffect(() => {
    if (hotel && hotel.rooms && roomTypes && roomTypes.length > 0) {
      const capacityMapping = roomTypes.reduce((acc, type) => {
        acc[type.name.toLowerCase()] = type.capacity;
        return acc;
      }, {});

      let filtered = [];

      if (filterMode === "individual") {
        setPeoplePerRoom(0);
        setMinPeoplePerRoomFilter(0);
        filtered = filterRoomsByPeople(hotel.rooms, people, capacityMapping);
      } else if (filterMode === "total") {
        setPeoplePerRoom(0);
        setMinPeoplePerRoomFilter(0);
        const totalCapacity = hotel.rooms.reduce((sum, room) => {
          if (room.room_type && room.room_type.name) {
            const capacity =
              capacityMapping[room.room_type.name.toLowerCase()] || 0;
            return sum + room.available * capacity;
          }
          return sum;
        }, 0);
        filtered = totalCapacity >= people ? hotel.rooms : [];
      } else if (filterMode === "minimoPorHabitacion") {
        setPeoplePerRoom(0);
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

        filtered = totalEffectiveCapacity >= people ? eligibleRooms : [];
      } else if (filterMode === "maxPerRoom") {
        setMinPeoplePerRoomFilter(0);
        const eligibleRooms = hotel.rooms.filter((room) => {
          if (room.room_type && room.room_type.name) {
            const capacity =
              capacityMapping[room.room_type.name.toLowerCase()] || 0;
            return capacity >= peoplePerRoom;
          }
          return false;
        });

        const totalEffectiveCapacity = eligibleRooms.reduce(
          (sum, room) => sum + room.available * peoplePerRoom,
          0
        );

        filtered = totalEffectiveCapacity >= people ? eligibleRooms : [];
      }

      setFilteredRooms(filtered);
    }
  }, [
    hotel,
    people,
    roomTypes,
    filterMode,
    peoplePerRoom,
    minPeoplePerRoomFilter,
  ]);

  const handleBooking = (room) => {
    if (!checkin || !checkout) {
      alert("Por favor, selecciona las fechas de check-in y check-out");
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (checkin < today) {
      alert("La fecha de check-in no puede ser en el pasado");
      return;
    }
    if (checkin >= checkout) {
      alert("La fecha de check-out debe ser posterior a la fecha de check-in");
      return;
    }
    if (!user.fullName || user.fullName.trim() === "") {
      alert("Por favor, ingresa tu nombre completo en tu perfil");
      return;
    }
    const bookingInfo = {
      checkin,
      checkout,
      nights,
      people,
      room,
      fullName: user.fullName,
    };
    setBookingData(bookingInfo);
    navigate("/booking");
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Formulario de selección */}
      <div className="w-full mb-8 p-6 bg-gradient-to-r from-blue-600 to-purple-700 shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold text-white mb-2">
          Reserva tu habitación
        </h2>
        <p className="text-white mb-6">
          Selecciona las fechas, número de noches, personas y modo de filtro
          para ver las opciones disponibles
        </p>
        <div className="flex flex-wrap -mx-2">
          {/* Check-in */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
            <label
              htmlFor="checkin"
              className="block text-sm font-medium text-white mb-1"
            >
              Check-in
            </label>
            <DatePicker
              id="checkin"
              selected={checkin}
              onChange={handleCheckinChange}
              dateFormat="yyyy/MM/dd"
              placeholderText="Selecciona check-in"
              className="w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {/* Check-out */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
            <label
              htmlFor="checkout"
              className="block text-sm font-medium text-white mb-1"
            >
              Check-out
            </label>
            <DatePicker
              id="checkout"
              selected={checkout}
              onChange={(date) => {
                setManualNights(false);
                setCheckout(date);
              }}
              dateFormat="yyyy/MM/dd"
              placeholderText="Selecciona check-out"
              className="w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              minDate={checkin}
            />
          </div>
          {/* Número de noches */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
            <label
              htmlFor="nights"
              className="block text-sm font-medium text-white mb-1"
            >
              Número de noches
            </label>
            <input
              id="nights"
              type="number"
              value={nights}
              onChange={handleNightsChange}
              min="1"
              className="w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {/* Número de personas */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
            <label
              htmlFor="people"
              className="block text-sm font-medium text-white mb-1"
            >
              Número de personas
            </label>
            <input
              type="number"
              id="people"
              value={people}
              onChange={(e) => setPeople(parseInt(e.target.value, 10))}
              min="1"
              className="w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {/* Modo de filtro */}
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label
              htmlFor="filterMode"
              className="block text-sm font-medium text-white mb-1"
            >
              Modo de filtro
            </label>
            <select
              id="filterMode"
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="individual">Por tipo</option>
              <option value="total">Capacidad total</option>
              <option value="maxPerRoom">Personas por habitación</option>
              <option value="minimoPorHabitacion">Mínimo por habitación</option>
            </select>
          </div>
          {/* Opciones condicionales */}
          {filterMode === "maxPerRoom" && (
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label
                htmlFor="peoplePerRoom"
                className="block text-sm font-medium text-white mb-1"
              >
                Personas por habitación
              </label>
              <input
                type="number"
                id="peoplePerRoom"
                value={peoplePerRoom}
                onChange={(e) => setPeoplePerRoom(parseInt(e.target.value, 10))}
                min="0"
                className="w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}
          {filterMode === "minimoPorHabitacion" && (
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label
                htmlFor="minPeoplePerRoomFilter"
                className="block text-sm font-medium text-white mb-1"
              >
                Mínimo por habitación
              </label>
              <input
                type="number"
                id="minPeoplePerRoomFilter"
                value={minPeoplePerRoomFilter}
                onChange={(e) =>
                  setMinPeoplePerRoomFilter(parseInt(e.target.value, 10))
                }
                min="0"
                className="w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}
        </div>
      </div>
  
      {/* Listado de habitaciones filtradas */}
      <div className="flex flex-wrap -mx-4 p-4">
        {filteredRooms.map((room) => (
          <div key={room.room_type.name} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
            <PriceCard
              room={room}
              filterMode={filterMode}
              peoplePerRoom={peoplePerRoom}
              minPeoplePerRoomFilter={minPeoplePerRoomFilter}
              handleBooking={handleBooking}
            />
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default PricesDetails;
