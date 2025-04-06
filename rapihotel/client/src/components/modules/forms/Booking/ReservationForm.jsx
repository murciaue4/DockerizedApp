import { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReservationModal = ({ hotelId, userId, rooms, onClose, onSubmit }) => {
  const [reservationData, setReservationData] = useState({
    hotelId,
    userId,
    roomType: "",
    checkInDate: new Date(),
    checkOutDate: new Date(),
    guests: 1,
    specialRequests: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (name, date) => {
    setReservationData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  const handleSubmit = () => {
    onSubmit(reservationData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Reservar Habitación</h2>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Tipo de Habitación</label>
          <select
            className="border border-gray-400 h-12 px-2 rounded-lg w-full text-lg"
            name="roomType"
            value={reservationData.roomType}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un tipo de habitación</option>
            {rooms.map((room) => (
              <option key={room.value} value={room.value}>
                {room.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Fecha de Entrada</label>
          <DatePicker
            selected={reservationData.checkInDate}
            onChange={(date) => handleDateChange("checkInDate", date)}
            className="border border-gray-400 h-12 px-2 rounded-lg w-full text-lg"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Fecha de Salida</label>
          <DatePicker
            selected={reservationData.checkOutDate}
            onChange={(date) => handleDateChange("checkOutDate", date)}
            className="border border-gray-400 h-12 px-2 rounded-lg w-full text-lg"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Número de Huéspedes</label>
          <input
            className="border border-gray-400 h-12 px-2 rounded-lg w-full text-lg"
            type="number"
            name="guests"
            value={reservationData.guests}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Peticiones Especiales</label>
          <textarea
            className="border border-gray-400 h-24 px-2 rounded-lg w-full text-lg"
            name="specialRequests"
            value={reservationData.specialRequests}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg mr-2"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

ReservationModal.propTypes = {
  hotelId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ReservationModal;