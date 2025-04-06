import React, { useContext } from "react";
import { loginContext } from "../../../context/loginContext";

const RoomCard = ({ room, index, onChange, onDelete }) => {
  const { roomTypes } = useContext(loginContext);

  return (
    <div className="h-auto w-full  xxs:max-w-xs sm:max-w-xs bg-gradient-to-r shadow-border-blur from-[#6366F1] to-[#5153d1] rounded-2xl  p-3 mb-6 transition transform hover:scale-105 hover:shadow-3xl">
      <div className="mb-5">
        <label className="block text-sm font-semibold text-white">
          Tipo de habitación
        </label>
        <input
          type="text"
          value={roomTypes[Number(room.type) - 1]?.name || room.type}
          readOnly
          placeholder="Escribe el tipo de habitación"
          className="mt-1 h-9 block w-full rounded-md border border-transparent bg-white/80 p-2 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>
      <div className="flex flex-col mb-5">
        <div className="CLUSTER flex flex-row justify-between space-x-6">
          <div className="CANTIDAD">
            <label className="block text-sm font-semibold text-white">
              Cantidad
            </label>
            <input
              type="number"
              value={room.quantity}
              onChange={(e) =>
                onChange(index, "quantity", Number(e.target.value))
              }
              placeholder="0"
              className="mt-1 h-9 block w-full rounded-md border border-transparent bg-white/80 p-2 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div className="PRECIO">
            <label className="block text-sm font-semibold text-white">
              Precio
            </label>
            <input
              type="number"
              value={room.price}
              onChange={(e) => onChange(index, "price", Number(e.target.value))}
              placeholder="0"
              className="mt-1 h-9 block w-full rounded-md border border-transparent bg-white/80 p-2 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>

        <div className="CLUSTER2 flex flex-row justify-between space-x-6 items-end">
          <div className="w-1/2">
            <label className="block text-sm font-semibold text-white">
              Disponibles
            </label>
            <input
              type="number"
              value={room.available}
              onChange={(e) =>
                onChange(index, "available", Number(e.target.value))
              }
              placeholder="0"
              className="mt-1 h-9 block w-full rounded-md border border-transparent bg-white/80 p-2 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div className="flex justify-end w-1/2">
            <button
              type="button"
              onClick={() => onDelete(index)}
              className="mt-1 h-10 block w-auto rounded-full border border-transparent bg-red-500 p-2 text-background placeholder-gray-600 hover:bg-red-600 transition duration-200"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
