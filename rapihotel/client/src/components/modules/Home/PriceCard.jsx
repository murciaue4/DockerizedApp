import React from "react";
import PropTypes from "prop-types";
import userIcon from "../../../static/userIconWhite.svg";
import bedIconBlack from "../../../static/bdeIconBlack.svg";
import { capitalizeFirstLetterOfText } from "../../../helpers";

const RoomCard = ({
  room,
  filterMode = "individual",
  peoplePerRoom = 0,
  minPeoplePerRoomFilter = 0,
  handleBooking = () => {},
}) => {
  const finalPrice = room.discount
    ? room.price - (room.price * room.discount) / 100
    : room.price;
  
  return (
    <div
      className="bg-gray-200 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-101 hover:shadow-2xl "
      onClick={() => console.log("room.discount", room)}
    >
      <div className="relative border">
        <img src={room.image} alt={``} className="w-full h-full object-cover" />

        {room.available > 0 ? (
          <div className="absolute top-2 left-2 bg-green-500 text-text-secondary text-md font-bold px-3 py-1 rounded-full shadow">
            <span className="text-md">{room.available} Disponibles</span>
          </div>
        ) : null}
        
      </div>
      <div className="p-6 mt-2">
        <div className="flex justify-left space-x-3 items-center">
          <div className="flex items-center flex-col justify-center mt-2">
            <span className="text-sm text-text-secondary font-semibold">
              {room.room_type.beds}
            </span>
            <img src={bedIconBlack} alt="Bed icon" className="h-5 w-5" />
          </div>

          <div className="flex items-center flex-col justify-center mt-2">
            <span className="text-sm text-text-secondary font-semibold">
              {room.room_type.capacity}
            </span>
            <img src={userIcon} alt="User icon" className="h-5 w-5" />
          </div>

          {/* {peoplePerRoom >= 1 && (
            <div className="flex items-center space-x-1 mt-2">
              <span className="text-2xl font-semibold">
                {peoplePerRoom * room.available}
              </span>
              <img src={userIcon} alt="User icon" className="h-9 w-9" />
            </div>
          )}

          {minPeoplePerRoomFilter >= 1 && (
            <div className="flex items-center space-x-1 mt-2">
              <img src={userIcon} alt="User icon" className="h-5 w-5" />=
              <span className="text-2xl font-semibold">
                {room.available * room.room_type.capacity}
              </span>
            </div>
          )}

          {filterMode === "total" && (
            <div className="flex items-center space-x-1 mt-2">
              <img src={userIcon} alt="User icon" className="h-5 w-5" />=
              <span className="text-2xl font-semibold">
                {room.available * room.room_type.capacity}
              </span>
            </div>
          )}

          {filterMode === "individual" && (
            <div className="flex items-center space-x-1 mt-2">
              <img src={userIcon} alt="User icon" className="h-5 w-5" />=
              <span className="text-2xl font-semibold">
                {room.room_type.capacity * room.available}
              </span>
            </div>
          )} */}
        </div>
        <h3 className="text-lg font-semibold text-primary mb-2">
          {capitalizeFirstLetterOfText(room?.room_type?.name)}
        </h3>
        <section className="description text-sm">
          <span>
            {room.room_type.description.length > 100
              ? capitalizeFirstLetterOfText(
                  room.room_type.description
                ).substring(0, 100) + "..."
              : capitalizeFirstLetterOfText(room.room_type.description)}
          </span>
        </section>

        <div className="flex items-center ">
          <span
            className={`text-lg ${
              room.discount
                ? "line-through text-red-500 mr-3"
                : "text-gray-800 font-semibold"
            }`}
          >
            ${room.price.toLocaleString()}
          </span>
          {room.discount && room.discount > 0 ? (
            <span className="text-xl font-semibold text-green-600">
              ${finalPrice > 0 ? finalPrice.toLocaleString() : ""}
            </span>
          ) : null}
        </div>
        {room.discount && room.discount > 0 ? (
          <div className=" w-1/2 h-auto bg-red-600 text-white text-sm px-1  mb-4 rounded shadow">
            <span className="font-bold">{room.discount}%</span> de descuento.
          </div>
        ) : null}
        <button
          disabled={!room.available}
          onClick={() => handleBooking(room)}
          className={`w-full py-3 rounded-md font-semibold transition-colors duration-200 focus:outline-none ${
            room.available
              ? "bg-secondary hover:bg-primary hover:text-secondary text-white"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {room.available ? "Reservar" : "No disponible"}
        </button>
      </div>
    </div>
  );
};

RoomCard.propTypes = {
  room: PropTypes.object.isRequired,
  filterMode: PropTypes.string,
  peoplePerRoom: PropTypes.number,
  minPeoplePerRoomFilter: PropTypes.number,
  handleBooking: PropTypes.func,
};

export default RoomCard;
