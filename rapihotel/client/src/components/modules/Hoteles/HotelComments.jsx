import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { loginContext } from "../../../context/loginContext";
import AlertLogUp from "../alerts/AlertLogUp";
import AlertStandar from "../alerts/AlertStandard";

const ReviewsCard = ({ hotel }) => {
  const [comments, setComments] = useState([]);
  const [ratingsUser, setRatingsUser] = useState([]);
  const [newComent, setNewComent] = useState("");
  const [newRate, setNewRate] = useState(0);
  const [selectedRate, setSelectedRate] = useState(1);
  const [showAlertLogUp, setShowAlertLogUp] = useState(false);
  const [error, setError] = useState(null);

  // Estado para saber si el usuario es cliente del hotel

  const { user, URLStatic, token, isLogin, handleCustomShooter } =
    useContext(loginContext);
  const [isClient] = useState(user);

  // Actualiza la calificación seleccionada
  const handleSetNewRate = (value) => {
    setNewRate(value);
    setSelectedRate(value);
  };

  // Muestra u oculta el alerta para loguearse
  const handleShowAlertLogUp = () => {
    setShowAlertLogUp(!showAlertLogUp);
  };

  // Controla el input del comentario
  const handleNewComment = (e) => {
    setNewComent(e.target.value);
  };

  // Obtiene los comentarios desde la API
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${URLStatic}/user/hoteles/${hotel?.id}/comments`
      );
      console.log("response.data.body", response.data.body);
      setComments(response.data.body);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await axios.get(
        `${URLStatic}/user/${user.user_id}/ratings/`
      );
      console.log("fetch ratings", response.data.body);
      setRatingsUser(response.data.body);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  useEffect(() => {
    if (hotel?.id) {
      fetchComments();
    }
  }, [hotel?.id]);

  useEffect(() => {
    if (user?.user_id) {
      fetchRatings();
    }
  }, [user?.user_id]);

  // Envía un nuevo comentario y calificación
  const handleSendNewComent = async () => {
    if (newComent.trim().length === 0 || newRate === 0) {
      setError({
        AlertTitle: "Error",
        AlertString: "Debes escribir un comentario y calificar el hotel",
        AlertType: "error",
      });
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    const commentToSend = {
      comment_text: newComent,
      username: user.username,
    };

    const rateToSend = {
      calificacion: newRate,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      };

      await axios.post(
        `${URLStatic}/user/hoteles/${hotel.id}/comments/${user.user_id}`,
        commentToSend,
        config
      );

      await axios.post(
        `${URLStatic}/user/hoteles/${hotel.id}/ratings/${user.user_id}`,
        rateToSend,
        config
      );

      // Actualiza el "shooter" personalizado y recarga comentarios
      handleCustomShooter();
      fetchComments();
      setNewComent("");
      setNewRate(0);
      setSelectedRate(1);
    } catch (error) {
      console.error("Error al enviar tu opinión:", error);
    }
  };

  // Convierte la fecha del comentario a un formato legible
  const getLegibleDate = (timeStamp) => {
    const fechaUTC = new Date(timeStamp);
    const horaLocal = fechaUTC.toLocaleTimeString(undefined, { hour12: true });
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const dia = fechaUTC.getDate();
    const mes = meses[fechaUTC.getMonth()];
    const año = fechaUTC.getFullYear();

    return (
      <div className="text-xs text-gray-500">
        <p>{`${dia} de ${mes} de ${año}`}</p>
        <p>{horaLocal}</p>
      </div>
    );
  };

  // Devuelve un texto legible según la calificación promedio
  const obtenerCalificacionTexto = (promedio, totalRates) => {
    if (totalRates === 0) return "Sin calificar";
    if (promedio >= 9.0) return "Excelente";
    if (promedio >= 8.0) return "Muy bueno";
    if (promedio >= 7.0) return "Bueno";
    if (promedio >= 6.0) return "Aceptable";
    return "Regular";
  };

  // Busca la calificación del usuario para el hotel
  const getRateByUserComment = (comment) => {
    const rate = ratingsUser.find(
      (rate) => rate.hotel_id === hotel.id && rate.cliente_id === user.user_id
    );
    return rate ? rate.calificacion : 0;
  };
  return (
    <div className="bg-background rounded-xl shadow p-6">
      {showAlertLogUp && <AlertLogUp onClose={handleShowAlertLogUp} />}
      {error && <AlertStandar onClose={() => setError(null)} {...error} />}

      {/* Sección de calificación promedio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="col-span-12 md:col-span-6 lg:col-span-4 text-center">
          <div>
            <h2 className="text-3xl font-bold  text-start mb-6">Opiniones</h2>
          </div>
          <div
            className="text-4xl font-bold text-accent md:text-start"
            aria-hidden="true"
          >
            {hotel?.avg_rating
              ? Number(hotel.avg_rating).toFixed(1)
              : "Sin calificar"}
          </div>
          <span className="sr-only">
            {hotel?.avg_rating
              ? `${Number(hotel.avg_rating).toFixed(1)} de 10`
              : "Sin calificar"}
          </span>
          <div className="mt-2 flex items-center justify-center md:justify-start">
            <div
              className="text-lg font-medium text-text-primary"
              aria-hidden="true"
            >
              {obtenerCalificacionTexto(
                hotel?.avg_rating,
                hotel?.total_ratings
              )}
            </div>
          </div>
          <span className="text-sm text-start text-text-secondary">
            Basado en {hotel?.total_ratings || 0} opiniones de usuarios verificados
          </span>
          <div className="mt-4 flex flex-col items-center md:items-start">
            <button
              type="button"
              className="flex items-center justify-center text-primary hover:underline focus:outline-none"
            >
              <span>{hotel?.total_ratings || 0} opiniones verificadas</span>
            </button>
            <div className="mt-2 text-sm text-text-secondary">
              Todas las opiniones...
              <a href="#" className="text-primary hover:underline">
                Más información
              </a>
            </div>
          </div>
        </div>

        {/* Sección de opiniones recientes */}
        <div className="col-span-12 lg:col-span-8">
          <h3 className="text-xl font-semibold text-text-primary">
            Opiniones recientes
          </h3>
          <div className="mt-4 flex space-x-4 overflow-x-auto">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment?.id}
                  className="min-w-[300px] bg-backgroundAlt rounded-lg shadow p-4 border-border border"
                >
                  <h3 className="text-lg font-semibold text-text-primary">
                    {getRateByUserComment(comment)} / 10
                  </h3>
                  <p className="text-sm text-text-primary line-clamp-4">
                    {comment?.text_comment}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-sm font-medium text-text-primary">
                      {comment.username && `@${comment.username}`}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {getLegibleDate(comment.date)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-text-secondary">No hay opiniones aún.</p>
            )}
          </div>

          {/* Controles del carousel */}
          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex space-x-2">
              <button className="p-2 bg-background-alt rounded-full hover:bg-background-alt/50 focus:outline-none text-text-primary">
                {/* Ícono */}
              </button>
            </div>
            <button className="text-primary hover:underline">
              Ver todas las opiniones
            </button>
          </div>
        </div>
      </div>

      {/* Sección de nuevo comentario */}
      {isClient && (
        <div className="bg-gradient-to-r from-background to-background-alt p-6 rounded-xl shadow-lg w-full">
          <h3 className="text-2xl font-semibold text-text-primary mb-4">
            Comparte tu experiencia
          </h3>
          <textarea
            value={newComent}
            onChange={handleNewComment}
            className="w-full h-28 p-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-background text-text-primary"
          ></textarea>

          {/* Botones de calificación */}
          <div className="w-full  mb-4 flex flex-wrap justify-center gap-2">
            {[...Array(10)].map((_, index) => (
              <button
                onClick={() => handleSetNewRate(index + 1)}
                key={index}
                className={`px-4 py-2 rounded-full border transition-all ${
                  selectedRate === index + 1
                    ? "bg-accent text-white"
                    : "bg-background text-accent border-accent hover:bg-accent/10"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={handleSendNewComent}
            className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90"
          >
            Enviar opinión
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsCard;
