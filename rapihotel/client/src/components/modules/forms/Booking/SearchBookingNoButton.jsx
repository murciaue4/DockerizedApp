import { useState, useEffect, useContext } from "react";
import dateIcon from "../../../../static/calendar-icon.svg";
import usersIcon from "../../../../static/usersGroup-Icon.svg";
import ModalPersonsPerRoom from "./ModalPersonsPerRoom";
import ModalDatePicker from "./ModalDatePicker";
import { reservationsContext } from "../../../../context/reservationsContext";
import { useDateFormatter } from "@react-aria/i18n";

const HotelSearchForm = () => {
  const { newReservationData, handleSetNewReservationData } =
    useContext(reservationsContext);

  const formatter = useDateFormatter({ dateStyle: "long" });
  const [personsPerRoom, setPersonsPerRoom] = useState([
    {
      adults: 1,
      children: 0,
    },
  ]);

  const [roomsCount, setRoomsCount] = useState(1);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const [showModalPersonsPerRoom, setShowModalPersonsPerRoom] = useState(false);
  const handleShowModalPersonsPerRoom = () => {
    setShowModalPersonsPerRoom(!showModalPersonsPerRoom);
  };
  const [showModalDatePicker, setShowModalDatePicker] = useState(false);
  const handleShowModalDatePicker = () => {
    setShowModalDatePicker(!showModalDatePicker);
  };

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const reservationData = {
        check_in: checkInDate,
        check_out: checkOutDate,
        totalNights: Math.abs(
          (checkInDate.getTime() - checkOutDate.getTime()) / (1000 * 3600 * 24)
        ),
      };
      handleSetNewReservationData(reservationData);
    }
  }, [checkInDate]);

  useEffect(() => {
    if (personsPerRoom) {
      const reservationData = {
        guestList: personsPerRoom,
        adults: personsPerRoom.adults,
        children: personsPerRoom.children,
        roomsCount: roomsCount,
      };
      console.log("personas", reservationData);
      handleSetNewReservationData(reservationData);
    }
  }, [personsPerRoom]);

  return (
    <div className="w-full h-full flex flex-row p-1  rounded-lg ">
      <div className="w-full flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0  rounded-lg items-center justify-center">
        <div className="flex flex-row space-x-4 w-full sm:w-1/2 ">
          {/* Campo Fecha (Date Picker) */}
          <div
            className={`flex border-2 w-full sm:w-1/2 h-14 overflow-hidden justify-start p-1 rounded-xl border-border `}
            onClick={handleShowModalDatePicker}
          >
            <div className="flex h-full w-14 overflow-hidden justify-center items-center rounded-lg">
              <img src={dateIcon} alt="" className="object-cover max-h-6" />
            </div>
            <div className="flex h-14 overflow-hidden justify-start p-1 rounded-lg ">
              <div className="relative w-full">
                <label
                  htmlFor="datepickerr"
                  className="block text-xs font-bold text-text-primary w-full"
                >
                  Desde
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
                  className="w-full px-1 py-1 rounded-md text-left text-xs"
                >
                  <p className="text-text-secondary font-medium text-nowrap">
                    {formatter.format(newReservationData.check_in, "long")}
                  </p>
                </button>
              </div>
            </div>
          </div>
          
          {/* Campo Fecha (Date Picker) */}
          <div
            className={`flex border-2 w-full sm:w-1/2 h-14 overflow-hidden justify-start p-1 rounded-xl border-border `}
            onClick={handleShowModalDatePicker}
          >
            <div className="flex h-full w-14 overflow-hidden justify-center items-center rounded-lg">
              <img src={dateIcon} alt="" className="object-cover max-h-6" />
            </div>
            <div className="flex h-14 overflow-hidden justify-start p-1 rounded-lg ">
              <div className="relative w-full">
                <label
                  htmlFor="datepickerr"
                  className="block text-xs font-bold text-text-primary w-full"
                >
                  Hasta
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
                  className="w-full px-1 py-1 rounded-md text-left text-xs"
                >
                  <p className="text-text-secondary font-medium text-nowrap">
                    {formatter.format(newReservationData.check_out, "long")}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row space-x-4 w-full sm:w-1/2">
          {/* Campo Huéspedes (Travelers) */}
          <div
            className={`flex border w-full h-14 ${
              showModalPersonsPerRoom ? "" : "overflow-hidden"
            } justify-start p-1 rounded-xl border-border`}
            onClick={handleShowModalPersonsPerRoom}
          >
            <div className="flex h-full w-14 overflow-hidden justify-center items-center rounded-lg">
              <img src={usersIcon} alt="" className="object-cover max-h-6" />
            </div>
            <div className="flex h-14 overflow-hidden justify-start p-1 rounded-lg ">
              <div className="relative">
                <label
                  htmlFor="input-qglfwvy"
                  className="block text-xs font-bold text-text-primary w-full"
                >
                  Huéspedes
                </label>
                <input
                  id="input-qglfwvy"
                  type="text"
                  className="hidden"
                  defaultValue="1 persona, 1 habitación"
                />
                <button
                  type="button"
                  aria-roledescription="ampliar para cambiar el número de huéspedes"
                  data-stid="open-room-picker"
                  aria-label="Huéspedes, 2 personas, 1 habitación"
                  className="w-auto text-nowrap px-1 py-1 rounded-md text-left text-xs text-text-secondary"
                >
                  {`${newReservationData?.adults} ${
                    newReservationData?.adults > 1 ? "Personas" : "Persona"
                  }, ${newReservationData.roomsCount} ${
                    newReservationData.roomsCount > 1 ? "Habitaciones" : "Habitación"
                  }`}
                </button>
              </div>
            </div>
          </div>
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
    </div>
  );
};

export default HotelSearchForm;