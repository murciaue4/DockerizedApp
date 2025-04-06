import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

export default function RoomSelector({ onClose, setPersons, setRoomsCount, initialData }) {
  const [rooms, setRooms] = useState(initialData.rooms || [{ adults: 1, children: 0 }]);

  const updateGuests = (roomIndex, type, operation) => {
    setRooms((prevRooms) =>
      prevRooms.map((room, index) => {
        if (index === roomIndex) {
          return {
            ...room,
            [type]:
              operation === "increment"
                ? room[type] + 1
                : Math.max(0, room[type] - 1),
          };
        }
        return room;
      })
    );
  };

  const addRoom = () => {
    setRooms([...rooms, { adults: 1, children: 0 }]);
  };

  const removeRoom = (roomIndex) => {
    // Evitar eliminar la última habitación
    if (rooms.length > 1) {
      setRooms((prevRooms) => prevRooms.filter((_, index) => index !== roomIndex));
    }
  };

  console.log("roomsinmodalprsonperroom", rooms);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 ">
      <div
        className="absolute inset-0 m-8 text-xl cursor-pointer"
        onClick={() => onClose()}
      >
        <Icon icon="lucide:x" className="text-text-alt" width={24} height={24} />
      </div>
      <div className="bg-background border border-borderr shadow-md rounded-xl px-4 py-20 w-full h-full max-w-[410px] sm:h-auto sm:max-h-[700px] z-50 overflow-y-auto">
        {rooms.map((room, index) => (
          <div key={index} className="mb-4 border p-4 rounded-md relative">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold">Habitación {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeRoom(index)}
                disabled={rooms.length === 1}
                className={`text-sm text-red-600 hover:text-red-800 ${rooms.length === 1 ? "cursor-not-allowed opacity-50" : ""}`}
              >
                Eliminar
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 pl-1">
              <span className="text-sm">Adultos</span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="p-1 border rounded-md w-8 h-8"
                  onClick={() => updateGuests(index, "adults", "decrement")}
                >
                  -
                </button>
                <input
                  type="text"
                  className="w-10 text-center border rounded-md h-8"
                  value={room.adults}
                  readOnly
                />
                <button
                  type="button"
                  className="p-1 border rounded-md w-8 h-8"
                  onClick={() => updateGuests(index, "adults", "increment")}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 pl-1">
              <div>
                <span className="text-sm">Niños</span>
                <span className="text-xs text-text-secondary"> (De 0 a 12 años)</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="p-1 border rounded-md w-8 h-8"
                  onClick={() => updateGuests(index, "children", "decrement")}
                  disabled={room.children === 0}
                >
                  -
                </button>
                <input
                  type="text"
                  className="w-10 text-center border rounded-md h-8"
                  value={room.children}
                  readOnly
                />
                <button
                  type="button"
                  className="p-1 border rounded-md w-8 h-8"
                  onClick={() => updateGuests(index, "children", "increment")}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-end w-full mt-4 space-x-2">
          <button
            type="button"
            className="px-4 py-2 border rounded-md text-sm text-text-secondary w-full"
            onClick={addRoom}
          >
            Agregar otra habitación
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-primary text-white rounded-md text-sm w-20"
            onClick={() => {
              setPersons({
                rooms: rooms,
                adults: rooms.reduce((acc, room) => acc + room.adults, 0),
                children: rooms.reduce((acc, room) => acc + room.children, 0),
              });
              setRoomsCount(rooms.length);
              onClose();
            }}
          >
            Listo
          </button>
        </div>
        <div className="mt-4 w-full text-end">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary underline text-sm"
          >
            ¿Reservar 10 o más habitaciones?
          </a>
        </div>
      </div>
    </div>
  );
}
