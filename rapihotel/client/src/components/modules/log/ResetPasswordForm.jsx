import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const { search } = useLocation();
  console.log('search',search);
  const queryParams = new URLSearchParams(search);
  const token = queryParams.get('token');
  console.log('token',token);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }
  const body = {
    newPassword,
    token
    };

    try {
      const response = await axios.post("http://localhost:3333/auth/reset-password", body);
      console.log('response.data',response.data);

      setMessage("Contraseña actualizada con éxito.");
      window.location.href = "/login";
    } catch (error) {
      if (error.response && error.response.data) {
        // Manejar errores específicos enviados desde el servidor
        setMessage(error.response.data.message || "Error al actualizar la contraseña.");
      } else {
        // Manejar errores genéricos (como problemas de red)
        setMessage("Ocurrió un error al procesar la solicitud.");
      }
    }
  };
  

  return (
    <div
      className={`w-full h-auto min-h-screen flex flex-col justify-around items-center`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-11/12 max-w-[390px] h-[77%] flex flex-col justify-around items-center rounded-xl`}
      >
        <div className="w-full mb-14 flex flex-col justify-around items-center border h-auto p-2 rounded-xl bg-background border-secondary">
          <label className="text-md text-center text-primary" htmlFor="newPassword">
            Nueva Contraseña
          </label>
          <input
            className="divInputs w-full outline-none pl-2 border border-secondary h-11 rounded-xl text-center my-6 text-xl font-semibold"
            required
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label className="text-md text-center text-primary" htmlFor="confirmPassword">
            Confirmar Contraseña
          </label>
          <input
            className="divInputs w-full outline-none pl-2 border border-secondary h-11 rounded-xl text-center my-6 text-xl font-semibold"
            required
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p className="text-sm text-center text-primary mt-2">
            La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial.
          </p>
        </div>

        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="border-2 max-w-[500px] mb-5 flex justify-center items-center rounded-xl w-11/12 h-12 text-white font-semibold bg-primary"
          >
            Restablecer
          </button>
        </div>
      </form>
      {message && (
        <div className="text-green-600 font-semibold">{message}</div>
      )}
    </div>
  );
}

export default ResetPasswordForm;
