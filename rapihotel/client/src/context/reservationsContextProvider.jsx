import React, { useContext, useState, useEffect, useCallback } from "react";
import { loginContext } from "./loginContext";
import { reservationsContext } from "./reservationsContext";
import AlertStandard from "../components/modules/alerts/AlertStandard.jsx";

// Datos de ejemplo (pueden ser removidos o utilizados para pruebas locales)
const staticReservationData = [
  {
    id: 1,
    hotel_id: 28,
    user_id: 11,
    check_in: "2022-12-12",
    check_out: "2022-12-15",
    check_in_time: "15:00",
    check_out_time: "12:00",
    guests: 3,
    room_type: "Suite",
    room_number: 305,
    total: 150000,
    status: "active",
    payment_method: "credit_card",
    payment_status: "paid",
    cancellation_policy: "Free cancellation up to 24 hours before check-in",
    notes: "Need an extra bed for a child",
  },
  // ... otros objetos de reserva si son necesarios
];

const ReservationsContextProvider = ({ children }) => {
  const { user, URLStatic } = useContext(loginContext);

  // Estados para reservas y la nueva reserva en proceso
  const [reservations, setReservations] = useState([]);
  const [newReservationData, setNewReservationData] = useState({
    check_in: new Date(),
    check_out: new Date(new Date().setDate(new Date().getDate() + 1)),
    check_in_time: "15:00",
    check_out_time: "12:00",
    adults: 1,
    children: 0,
    room_type: "",
    room_number: 0,
    total: 0,
    guestList: {
      rooms: [
        {
          adults: 2,
          children: 0,
        },
        {
          adults: 2,
          children: 0,
        },
      ],

      adults: 7,
      children: 0,
    },
    status: "",
    payment_method: "",
    payment_status: "",
    cancellation_policy: "",
    notes: "",
  });
  const [isLoadingReservations, setIsLoadingReservations] = useState(true);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  // Obtención de reservas del usuario al iniciar sesión o cuando cambia el usuario
  useEffect(() => {
    if (user) {
      const fetchReservations = async () => {
        try {
          const response = await fetch(
            `${URLStatic}/users/reservations/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.message || "Error al obtener las reservas."
            );
          }
          const data = await response.json();
          setReservations(data);
        } catch (err) {
          console.log("Error fetching reservations: ", err);
          setReservations(staticReservationData); // Usar datos de ejemplo  si falla la petición
          setError(err.message);
        } finally {
          console.log("Reservas cargadas exitosamente.", reservations);
          setIsLoadingReservations(false);
        }
      };
      fetchReservations();
    }
  }, [user, URLStatic]);

  // Handler para actualizar el estado de newReservationData de forma segura
  const handleSetNewReservationData = useCallback((newReservation) => {
    if (
      !newReservation ||
      typeof newReservation !== "object" ||
      Array.isArray(newReservation)
    ) {
      console.warn("El valor de newReservation debe ser un objeto válido.");
      return;
    }
    try {
      setNewReservationData((prevData) => {
        const updatedData = { ...prevData };
        Object.keys(newReservation).forEach((key) => {
          if (newReservation[key] !== undefined) {
            if (["check_in", "check_out"].includes(key)) {
              updatedData[key] = new Date(newReservation[key]);
            } else if (
              [
                "check_in_time",
                "check_out_time",
                "room_type",
                "status",
                "payment_method",
                "payment_status",
                "cancellation_policy",
                "notes",
              ].includes(key)
            ) {
              updatedData[key] = newReservation[key];
            } else if (["guests", "room_number"].includes(key)) {
              updatedData[key] = parseInt(newReservation[key], 10);
            } else if (key === "total") {
              updatedData[key] = parseFloat(newReservation[key]);
            } else {
              updatedData[key] = newReservation[key];
            }
          }
        });
        return updatedData;
      });
    } catch (error) {
      console.error("Error actualizando la reserva:", error);
      setError("Error actualizando los datos de la reserva.");
    }
  }, []);

  // Handler para agregar una nueva reserva
  const handleAddReservation = async () => {
    try {
      const response = await fetch(`${URLStatic}/users/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newReservationData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al agregar la reserva.");
      }
      const data = await response.json();
      setReservations((prevReservations) => [...prevReservations, data]);
      // Reiniciar los datos de la nueva reserva
      setNewReservationData({
        check_in: new Date(),
        check_out: new Date(),
        check_in_time: "15:00",
        check_out_time: "12:00",
        guests: 0,
        room_type: "",
        room_number: 0,
        total: 0,
        status: "",
        payment_method: "",
        payment_status: "",
        cancellation_policy: "",
        notes: "",
      });
      setAlertMessage("Reserva agregada exitosamente.");
    } catch (error) {
      console.error("Error adding reservation:", error);
      setError(error.message);
      setAlertMessage("Error al agregar la reserva.");
    }
  };

  // Handler para eliminar una reserva
  const handleDeleteReservation = async (id) => {
    try {
      const response = await fetch(`${URLStatic}/users/reservations/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar la reserva.");
      }
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== id)
      );
      setAlertMessage("Reserva eliminada exitosamente.");
    } catch (error) {
      console.error("Error deleting reservation:", error);
      setError(error.message);
      setAlertMessage("Error al eliminar la reserva.");
    }
  };

  // Handler para actualizar una reserva existente
  const handleUpdateReservation = async (id, updatedFields) => {
    try {
      const response = await fetch(`${URLStatic}/users/reservations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar la reserva.");
      }
      const updatedReservation = await response.json();
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === id ? updatedReservation : reservation
        )
      );
      setAlertMessage("Reserva actualizada exitosamente.");
    } catch (error) {
      console.error("Error updating reservation:", error);
      setError(error.message);
      setAlertMessage("Error al actualizar la reserva.");
    }
  };

  // Función para limpiar mensajes de alerta luego de cierto tiempo
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <reservationsContext.Provider
      value={{
        reservations,
        isLoadingReservations,
        error,
        newReservationData,
        handleSetNewReservationData,
        handleAddReservation,
        handleDeleteReservation,
        handleUpdateReservation,
        setReservations,
        setIsLoadingReservations,
      }}
    >
      {alertMessage && <AlertStandard AlertString={alertMessage} />}
      {children}
    </reservationsContext.Provider>
  );
};

export default ReservationsContextProvider;
