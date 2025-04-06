import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * Función para filtrar las habitaciones según el número de personas.
 * Se utiliza un mapeo para definir la capacidad de cada tipo de habitación.
 *
 * @param {Array} rooms - Lista de habitaciones con propiedades: type, price, quantity, available.
 * @param {number} people - Número de personas.
 * @param {Object} capacityMapping - Objeto con la capacidad por tipo de habitación.
 * @returns {Array} Habitaciones que pueden acomodar al número de personas.
 */
const filterRoomsByPeople = (rooms,people, capacityMapping ={ 
    "Cama Sencilla": 1,
    "Dos Camas": 2,
  }
) => {
  if (!people || people < 1) {
    console.error("El número de personas debe ser un entero mayor a 0");
    return [];
  }

  return rooms.filter((room) => {
    const capacity = capacityMapping[room.type] || 0;
    if (capacity === 0) {
      console.warn(
        `No se encontró capacidad definida para el tipo de habitación: ${room.type}`
      );
      return false;
    }
    const requiredRooms = Math.ceil(people / capacity);
    return room.available >= requiredRooms;
  });
};

const BookingForm = ({ hotel, onSubmitBooking }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      checkin: null,
      checkout: null,
      nights: 1,
      people: 1,
    },
  });

  // Estado para determinar si el usuario modificó manualmente las noches
  const [manualNights, setManualNights] = useState(false);
  // Estado para almacenar las habitaciones filtradas según el número de personas
  const [filteredRooms, setFilteredRooms] = useState([]);

  const checkinDate = watch("checkin");
  const checkoutDate = watch("checkout");
  const nightsValue = watch("nights");
  const peopleCount = watch("people");

  // Helpers para manipulación de fechas
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const diffDays = (start, end) =>
    Math.ceil((end - start) / (1000 * 3600 * 24));

  // Sincroniza el número de noches si el usuario no lo modificó manualmente
  useEffect(() => {
    if (checkinDate && checkoutDate && !manualNights) {
      let diff = diffDays(checkinDate, checkoutDate);
      diff = diff < 1 ? 1 : diff; // Forzamos un mínimo de 1 noche
      if (diff !== nightsValue) {
        setValue("nights", diff, { shouldValidate: true });
      }
    }
  }, [checkinDate, checkoutDate, manualNights, nightsValue, setValue]);

  // Si el usuario modifica manualmente el número de noches, se actualiza el checkout
  useEffect(() => {
    if (manualNights && checkinDate && nightsValue) {
      const validNights = nightsValue < 1 ? 1 : nightsValue;
      const newCheckout = addDays(checkinDate, validNights);
      if (!checkoutDate || checkoutDate.getTime() !== newCheckout.getTime()) {
        setValue("checkout", newCheckout, { shouldValidate: true });
      }
    }
  }, [manualNights, checkinDate, nightsValue, checkoutDate, setValue]);

  // Al modificar el check-in se restablece el checkout
  // Esto obliga a que el usuario seleccione nuevamente la fecha de salida
  // y evita que se sincronicen fechas incorrectamente.
  const handleCheckinChange = (date, field) => {
    field.onChange(date);
    setManualNights(false);
    setValue("checkout", null);
  };

  // Filtrar las habitaciones cada vez que cambia el número de personas
  useEffect(() => {
    if (hotel && hotel.rooms) {
      const filtered = filterRoomsByPeople(hotel.rooms, peopleCount);
      setFilteredRooms(filtered);
    }
  }, [hotel, peopleCount]);

  const onSubmit = (data) => {
    onSubmitBooking && onSubmitBooking(data);
    console.log("Datos de reserva:", data);
    console.log("Habitaciones filtradas:", filteredRooms);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Nombre completo */}
        <div>
          <label htmlFor="name">Nombre completo</label>
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "El nombre es obligatorio",
              minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres",
              },
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        {/* Correo electrónico */}
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Formato de correo inválido",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="phone">Teléfono</label>
          <input
            id="phone"
            type="tel"
            {...register("phone", {
              required: "El teléfono es obligatorio",
              pattern: {
                value: /^\+?[0-9]{10,15}$/,
                message:
                  "Número de teléfono inválido. Debe contener entre 10 y 15 dígitos, opcionalmente con un '+' al inicio",
              },
            })}
          />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        {/* Check-in */}
        <div>
          <label htmlFor="checkin">Check-in</label>
          <Controller
            control={control}
            name="checkin"
            rules={{ required: "La fecha de check-in es obligatoria" }}
            render={({ field }) => (
              <DatePicker
                id="checkin"
                placeholderText="Selecciona fecha de check-in"
                selected={field.value}
                onChange={(date) => handleCheckinChange(date, field)}
                dateFormat="yyyy/MM/dd"
              />
            )}
          />
          {errors.checkin && <p>{errors.checkin.message}</p>}
        </div>

        {/* Check-out */}
        <div>
          <label htmlFor="checkout">Check-out</label>
          <Controller
            control={control}
            name="checkout"
            rules={{
              required: "La fecha de check-out es obligatoria",
              validate: (value) => {
                if (!checkinDate) {
                  return "Debes seleccionar la fecha de check-in primero";
                }
                return (
                  value > checkinDate ||
                  "La fecha de check-out debe ser posterior a la fecha de check-in"
                );
              },
            }}
            render={({ field }) => (
              <DatePicker
                id="checkout"
                placeholderText="Selecciona fecha de check-out"
                selected={field.value}
                onChange={(date) => {
                  setManualNights(false);
                  field.onChange(date);
                }}
                dateFormat="yyyy/MM/dd"
                minDate={checkinDate}
              />
            )}
          />
          {errors.checkout && <p>{errors.checkout.message}</p>}
        </div>

        {/* Número de noches */}
        <div>
          <label htmlFor="nights">Número de noches</label>
          <input
            id="nights"
            type="number"
            min="1"
            {...register("nights", {
              required: "El número de noches es obligatorio",
              valueAsNumber: true,
              min: { value: 1, message: "Debe ser al menos 1 noche" },
            })}
            onChange={(e) => {
              setManualNights(true);
              const newNights = parseInt(e.target.value, 10);
              setValue("nights", newNights < 1 ? 1 : newNights, {
                shouldValidate: true,
              });
            }}
          />
          {errors.nights && <p>{errors.nights.message}</p>}
        </div>

        {/* Número de personas */}
        <div>
          <label htmlFor="people">Número de personas</label>
          <input
            id="people"
            type="number"
            {...register("people", {
              required: "El número de personas es obligatorio",
              valueAsNumber: true,
              min: { value: 1, message: "Debe haber al menos una persona" },
            })}
          />
          {errors.people && <p>{errors.people.message}</p>}
        </div>

        <button type="submit">Reservar</button>
      </form>

      {/* Listado de habitaciones filtradas */}
      <div>
        <h3>Opciones de habitaciones disponibles:</h3>
        {filteredRooms.length > 0 ? (
          <ul>
            {filteredRooms.map((room, index) => (
              <li key={index}>
                <strong>{room.type}</strong> - Precio: $
                {room.price.toLocaleString()} - Disponibles: {room.available}
              </li>
            ))}
          </ul>
        ) : (
          <p>
            No hay habitaciones disponibles para el número de personas
            seleccionado.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
