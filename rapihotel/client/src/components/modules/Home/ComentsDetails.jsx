import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { loginContext } from "../../../context/loginContext";
import AlertLogUp from "../alerts/AlertLogUp";
import AlertStandar from "../alerts/AlertStandard";


const ComentsDetails = ({ hotel }) => {
  const [comments, setComments] = useState([]);
  const [newComent, setNewComent] = useState("");
  const [newRate, setNewRate] = useState(0);
  const [selectedRate, setSelectedRate] = useState(1);
  const [showAlertLogUp, setShowAlertLogUp] = useState(false);
  const [error, setError] = useState(null);
  const { user, URLStatic, token, isLogin, customShooter, handleCustomShooter} = useContext(loginContext);

  const handleSetNewRate = (value) => {
    setNewRate(value);
    setSelectedRate(value);
  };

  const handleShowAlertLogUp = () => {
    setShowAlertLogUp(!showAlertLogUp);
  };

  const handleNewComment = (e) => {
    setNewComent(e.target.value);
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${URLStatic}/user/hoteles/${hotel.id}/comments`
      );
      setComments(response.data.body);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [hotel?.id]);

  const handleSendNewComent = async () => {
    if (newComent.length === 0 || newRate === 0) {
      setError({AlertTitle: "Error", AlertString: "Debes escribir un comentario y calificar el hotel", AlertType: "error"});
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
handleCustomShooter();
fetchComments();
      setNewComent("");
      setNewRate(0);
      
    } catch (error) {
      console.error("Error al enviar tu opinión:", error);
    }
  };

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

  const obtenerCalificacionTexto = (promedio, totalRates) => {
    if (totalRates === 0) return "Sin calificar";

    if (promedio >= 9.0) return "Excelente";
    if (promedio >= 8.0) return "Muy bueno";
    if (promedio >= 7.0) return "Bueno";
    if (promedio >= 6.0) return "Aceptable";
    return "Regular";
  };

  return (
    <div className="flex flex-col justify-center items-center w-full  mb-4  py-8 px-2 h-auto border  ">
      {showAlertLogUp && <AlertLogUp onClose={handleShowAlertLogUp} />}
      {/* Calificación Promedio */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Calificación Promedio
        </h2>
        <div className="mt-2">
          <p className="text-3xl font-bold text-accent">
            {hotel?.avg_rating
              ? Number(hotel?.avg_rating).toFixed(1)
              : "Sin calificar"}
          </p>
          <p className="text-sm font-medium text-gray-600">
            {obtenerCalificacionTexto(hotel?.avg_rating, hotel?.total_ratings)}
          </p>
        </div>
        <span className="text-sm text-gray-500">
          Basado en {hotel?.total_ratings || 0} opiniones de usuarios
        </span>
      </div>

      {/* Lista de Comentarios */}
      <div className="mb-6 w-full max-w-5xl">
        <h1 className="text-lg font-bold text-primary mb-4">Opiniones</h1>
        <ul className="space-y-4 h-auto  min-h-32 max-h-96 overflow-y-scroll ">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="p-4 border rounded-lg shadow-border-blur bg-white"
            >
              <div className="flex justify-between items-center mb-2 ">
                <span className="text-sm font-medium text-secondary">
                  @{comment.username}
                </span>
                <span className="text-xs text-gray-500">
                  {getLegibleDate(comment.date)}
                </span>
              </div>
              <p className="text-sm text-gray-700">{comment.text_comment}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Nuevo Comentario */}
      <div className=" bg-background py-4 px-1 rounded-lg w-full max-w-2xl ">
        <textarea
          placeholder="Escribe tu comentario..."
          value={newComent}
          onChange={handleNewComment}
          className="w-full h-24 p-3 border rounded-lg text-gray-700 focus:outline-none focus:shadow-border-blur"
        ></textarea>
        <div className=" flex w-full flex-col items-center justify-between ">
          <div className="flex flex-row justify-center items-center w-full ">
            <div className="my-6 flex flex-col items-center w-full max-w-[390px]">
              <input
                type="range"
                min="1"
                max="10"
                value={selectedRate}
                onChange={(e) => handleSetNewRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-alert focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="mt-2 text-base font-medium text-secondary">
                Calificación: <span className="font-bold text-xl text-alert">{selectedRate}</span>
              </span>
            </div>
          </div>
          <button
            onClick={() =>
              isLogin ? handleSendNewComent() : handleShowAlertLogUp()
            }
            className="px-2 py-1 bg-accent text-white rounded-lg hover:bg-primary"
          >
            Enviar comentario
          </button>
        </div>
      </div>
      {error && <AlertStandar onClose={() => setError(null)} {...error} />}
    </div>
  );
};

export default ComentsDetails;
