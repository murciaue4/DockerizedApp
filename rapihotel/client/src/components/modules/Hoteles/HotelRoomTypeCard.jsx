import React from "react";
import PropTypes from "prop-types";
import userIcon from "../../../static/userIconwhite.svg";
import bedIconBlack from "../../../static/bdeIconBlack.svg";
import { capitalizeFirstLetterOfText } from "../../../helpers";

const HotelRoomTypeCard = ({
  room,
  filterMode = "individual",
  peoplePerRoom = 0,
  minPeoplePerRoomFilter = 0,
  handleBooking = () => {},
}) => {
  const finalPrice = room.discount && room.discount > 0
    ? room.price - (room.price * room.discount) / 100
    : room.price;

  return (
    <div className="relative max-md:mx-2 flex flex-col justify-between rounded-lg shadow-md bg-backgroundAlt z-10 max-w-screen-sm h-[740px] overflow-hidden"
      draggable="true"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <header className="bg-primary text-text-alt py-2 px-4 rounded-t-lg">
          <h3 className="text-lg font-semibold">{capitalizeFirstLetterOfText(room.room_type.name)}</h3>
        </header>
      </div>

      {/* Contenedor de imagen */}
      <div className="mt-10 relative">
        <img
          src={'https://images.trvl-media.com/lodging/9000000/8060000/8051100/8051095/bc850a3a.jpg?impolicy=fcrop&w=1200&h=800&quality=medium'}
          alt="Habitación"
          className="w-full h-56 object-cover rounded-md"
        />
        {room.available > 0 && (
          <div className="absolute top-2 right-2 bg-success text-text-alt text-md font-medium px-3 py-1 rounded-full shadow">
            <span className="text-md"><strong>{room.available}</strong> Disponibles</span>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button className="bg-background text-text-primary rounded-full p-2 opacity-75 hover:opacity-100">
            &larr;
          </button>
          <button className="bg-background text-text-primary rounded-full p-2 opacity-75 hover:opacity-100">
            &rarr;
          </button>
        </div>
      </div>

      {/* Detalles de la habitación */}
      <div className="mt-4 p-4">
        <h3 className="text-xl font-semibold text-text-primary">
          {capitalizeFirstLetterOfText(room?.room_type?.name)}
        </h3>

        <div className="flex items-center mt-2">
          <div className="flex items-center mr-4">
            <img src={bedIconBlack} alt="Camas" className="h-5 w-5 mr-1" />
            <span className="text-sm text-text-secondary font-semibold">
              {room.room_type.beds} Camas
            </span>
          </div>
          <div className="flex items-center">
            <img src={userIcon} alt="Capacidad" className="h-5 w-5 mr-1" />
            <span className="text-sm text-text-secondary font-semibold">
              Capacidad: {room.room_type.capacity}
            </span>
          </div>
        </div>

        <section className="description text-sm mt-2 text-text-secondary">
          <span>
            {room.room_type.description.length > 100
              ? capitalizeFirstLetterOfText(room.room_type.description)
                  .substring(0, 100) + "..."
              : capitalizeFirstLetterOfText(room.room_type.description)}
          </span>
        </section>

        {/* Sección de precios */}
        <div className="mt-4 text-right">
          <div className={`text-2xl ${
              room.discount && room.discount > 0
                ? "text-error line-through text-sm"
                : "text-text-primary font-semibold"
            }`}
          >
            ${room.price.toLocaleString()}
          </div>
          {room.discount && room.discount > 0 && (
            <>
              <div className="text-2xl font-bold text-text-primary">
                ${finalPrice > 0 ? finalPrice.toLocaleString() : ""}
              </div>
              <div className="text-sm text-secondary">
                ${finalPrice > 0 ? finalPrice.toLocaleString() : ""} en total
              </div>
            </>
          )}
        </div>

        {/* Lista de amenities */}
        <ul className="mt-4 space-y-2 text-sm text-text-secondary">
          <li className="flex items-center">
            <span className="mr-2 text-success">✔</span>
            Estacionamiento gratis
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-success">✔</span>
            {room.room_type.capacity * room.available} personas en total
          </li>
        </ul>

        {room.discount && room.discount > 0 && (
          <div className="mt-4">
            <button className="bg-error text-text-primary px-2 py-1 rounded">
              No reembolsable
            </button>
          </div>
        )}
      </div>

      {/* Botón de reserva */}
      <div className="w-full p-4 flex flex-col items-center justify-center">
        <button
          disabled={!room.available}
          onClick={() => handleBooking(room)}
          className={`mt-4 mx-auto w-11/12 bg-primary text-text-alt py-2 rounded hover:bg-secondary transition-colors duration-200 focus:outline-none ${
            room.available ? "" : "bg-disabled cursor-not-allowed"
          }`}
        >
          {room.available ? "Reservar" : "No disponible"}
        </button>

        <div className="text-center text-sm text-text-secondary">
          Aún no se te cobrará nada.
        </div>
      </div>
    </div>
  );
};

HotelRoomTypeCard.propTypes = {
  room: PropTypes.object.isRequired,
  filterMode: PropTypes.string,
  peoplePerRoom: PropTypes.number,
  minPeoplePerRoomFilter: PropTypes.number,
  handleBooking: PropTypes.func,
};

export default HotelRoomTypeCard;