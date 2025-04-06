import { useState, useEffect, useContext } from "react";
import locationIcon from "../../../../static/locationIcon.svg";
import dateIcon from "../../../../static/calendar-icon.svg";
import usersIcon from "../../../../static/usersGroup-Icon.svg";
import ModalPersonsPerRoom from "./ModalPersonsPerRoom";
import ModalDatePicker from "./ModalDatePicker";
import ModalLocation from "./ModalLocation";

import { loginContext } from "../../../../context/loginContext";
import { reservationsContext } from "../../../../context/reservationsContext";
import { geoLocationContext } from "../../../../context/geoLocationContext";
import { useDateFormatter } from "@react-aria/i18n";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { set } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";

const HotelSearchForm = () => {
  const {
    newReservationData,
    handleSetNewReservationData,
    reservations,
    setReservations,
    isLoadingReservations,
    setIsLoadingReservations,
  } = useContext(reservationsContext);
  const { filters, setFilters } = useContext(loginContext);

  const formatter = useDateFormatter({ dateStyle: "long" });
  const [personsPerRoom, setPersonsPerRoom] = useState({
    adults: 1,
    children: 0,
  });
  const [roomsCount, setRoomsCount] = useState(1);
  const [destination, setDestination] = useState("Puerto Gaitán, Colombia");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [rooms, setRooms] = useState([personsPerRoom]);

  const [showModalPersonsPerRoom, setShowModalPersonsPerRoom] = useState(false);
  const handleShowModalPersonsPerRoom = () => {
    setShowModalPersonsPerRoom(!showModalPersonsPerRoom);
  };
  const [showModalDatePicker, setShowModalDatePicker] = useState(false);
  const handleShowModalDatePicker = () => {
    setShowModalDatePicker(!showModalDatePicker);
  };
  const [showModalLocation, setShowModalLocation] = useState(false);
  const handleShowModalLocation = () => {
    setShowModalLocation(!showModalLocation);
  };

  const handleSearch = () => {
    const reservationData = {
      checkInDate,
      checkOutDate,
      personsPerRoom,
      roomsCount,
      destination,
    };
    setFilters((prevFilters) => ({
      ...prevFilters,
      location: [destination],
    }));
    handleSetNewReservationData(reservationData);
    setReservations([reservationData, ...reservations]);
    setIsLoadingReservations(true);
  };

   
    
  return (
    <div className="w-full h-full flex flex-row p-1 bg-transparent rounded-lg ">
      <div className=" w-full flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0  rounded-lg items-center justify-center">
        {/* Campo Ubicación */}
        <div
          className={`flex border w-full sm:w-1/3  h-14 overflow-hidden justify-start p-1 rounded-xl border-gray-400 bg-background `}
          onClick={handleShowModalLocation}
        >
          <div className="flex h-full w-14 overflow-hidden  justify-center items-center rounded-lg">
            <img src={locationIcon} alt="" className=" object-cover max-h-6" />
          </div>
          <div className="flex h-14 overflow-hidden  justify-start p-1 rounded-lg ">
            <div>
              <div data-stid="w-full">
                <div className="relative w-full">
                  <label
                    htmlFor="input-09nt1xg"
                    className="block text-xs font-bold text-text-primary w-full "
                  >
                    ¿Adónde quieres ir?
                  </label>
                  {/* Input oculto */}
                  <input
                    id="input-09nt1xg"
                    type="text"
                    className="hidden"
                    aria-label="¿Adónde quieres ir?"
                    defaultValue="Puerto Gaitan, Colombia"
                  />
                  {/* Botón que simula el input */}
                  <button
                    type="button"
                    className="w-full px-1 py-1 text-nowrap rounded-md text-left text-xs "
                  >
                    {`${destination} - Puerto Gaitán, Meta, Colombia`}
                  </button>
                  {/* Ícono */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campo Fecha (Date Picker) */}
        <div
          className={`flex border w-full sm:w-1/3  h-14 overflow-hidden justify-start p-1 rounded-xl border-gray-400 bg-background `}
          onClick={handleShowModalDatePicker}
        >
          <div className="flex h-full w-14 overflow-hidden  justify-center items-center rounded-lg">
            <img src={dateIcon} alt="" className=" object-cover max-h-6" />
          </div>
          <div className="flex h-14 overflow-hidden  justify-start p-1 rounded-lg ">
            <div className="relative w-full">
              <label
                htmlFor="datepickerr"
                className="block text-xs font-bold text-text-primary w-full "
              >
                Fechas
              </label>
              <input
                id="datepickerr"
                type="text"
                className="hidden"
                defaultValue="4 abr - 5 abr"
              />
              <button
                type="button"
                aria-label={"Fechas, 4 abr - 5 abr"}
                className="w-full px-1 py-1  rounded-md text-left text-xs "
              >
                <p className="text-default-700 font-medium text-nowrap">
                  {formatter.formatRange(checkInDate, checkOutDate)}
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Campo Huéspedes (Travelers) */}
        <div
          className={`bg-background flex border w-full sm:w-1/3  h-14 ${
            showModalPersonsPerRoom ? "" : " overflow-hidden"
          } justify-start p-1 rounded-xl border-gray-400`}
          onClick={handleShowModalPersonsPerRoom}
        >
          <div className="flex h-full w-14 overflow-hidden  justify-center items-center rounded-lg">
            <img src={usersIcon} alt="" className=" object-cover max-h-6" />
          </div>
          <div className="flex h-14 overflow-hidden  justify-start p-1 rounded-lg ">
            <div className="relative">
              <label
                htmlFor="input-qglfwvy"
                className="block text-xs font-bold text-text-primary w-full "
              >
                Huéspedes
              </label>
              <input
                id="input-qglfwvy"
                type="text"
                className="hidden"
                defaultValue="2 personas, 1 habitación"
              />
              <button
                type="button"
                aria-roledescription="ampliar para cambiar el número de huéspedes"
                data-stid="open-room-picker"
                aria-label="Huéspedes, 2 personas, 1 habitación"
                className="w-auto text-nowrap px-1 py-1  rounded-md text-left text-xs "
              >
                {`${personsPerRoom.adults} ${
                  personsPerRoom?.adults > 1 ? "Personas" : "Persona"
                }, ${roomsCount} ${
                  roomsCount > 1 ? "Habitaciones" : "Habitación"
                }`}
              </button>
            </div>
          </div>
        </div>
        {/* boton buscar */}
        <div className="flex justify-center h-14 w-full sm:w-auto ">
         <Link to="/hoteles" className="w-full h-full"> 
         <button
            id="search_button"
            type="submit"
            className="px-3  bg-primary text-white rounded-3xl shadow-lg w-full h-full sm:w-[100px]"
            onClick={() => {
              console.log(
                "Destino:",
                destination,
                "Check-in:",
                checkInDate,
                "Check-out:",
                checkOutDate,
                "Habitaciones:",
                roomsCount,
                "Personas por habitación:",
                personsPerRoom
              );

              handleSearch();
             
            }}
          >
            Buscar
          </button></Link>
        </div>
      </div>
      {showModalPersonsPerRoom && (
        <ModalPersonsPerRoom
          onClose={handleShowModalPersonsPerRoom}
          setPersons={setPersonsPerRoom}
          setRoomsCount={setRoomsCount}
          initialData={personsPerRoom}
        />
      )}

      {showModalDatePicker && (
        <ModalDatePicker
          onClose={handleShowModalDatePicker}
          setCheckin={setCheckInDate}
          setCheckout={setCheckOutDate}
        />
      )}
      {showModalLocation && (
        <ModalLocation
          onClose={handleShowModalLocation}
          setLocations={setDestination}
          locoations={destination}
        />
      )}
    </div>
  );
};

export default HotelSearchForm;
