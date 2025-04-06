import axios from 'axios';
import React, { useContext, useState } from 'react';
import { loginContext } from "../../../context/loginContext";

const VerifyAlert = () => {
  const [sentVerify, setSentVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, URLStatic, token } = useContext(loginContext);

  const sendEmail = async () => {
    setLoading(true);
    setError(null);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token, 
        },
      };

      const body = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      await axios.put(`${URLStatic}/auth/verify-email/${user.id}`, body, config);
      setSentVerify(true);
      alert("Hemos enviado un correo de verificación a tu dirección de correo electrónico. Ábrelo y haz clic en el botón 'VERIFICAR CORREO ELECTRÓNICO' para finalizar la verificación.");
    } catch (error) {
      console.error('Error al enviar correo de verificación:', error);
      setError("No se pudo enviar el correo de verificación. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center w-full bg-red-200 text-sm rounded-md shadow-md">
      <span className="mb-2 text-center">
        Tu cuenta aún no está verificada. Envía un mensaje de validación a tu dirección de correo electrónico y confirma que eres tú.
      </span>
      {error && <p className="text-red-600">{error}</p>}
      <button
        onClick={sendEmail}
        className="bg-blue-500 px-4 py-2 rounded-md text-white"
        disabled={loading || sentVerify}
      >
        {loading ? "Enviando..." : sentVerify ? "Correo enviado" : "Enviar correo de verificación"}
      </button>
    </div>
  );
};

export default VerifyAlert;
