import { useState, useContext } from "react";
import axios from "axios";
import Errors from "../alerts/Errors";
import { json } from "react-router-dom";
import { loginContext } from "../../../context/loginContext";

function PasswordRecoveryForm({ handleSetShowLogin }) {
  const { token } = useContext(loginContext);
  console.log(token);
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [mailSent, setMailSent] = useState(false);

  const handleSetError = (err) => {
    setError(err);
    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3333/auth/forgot-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          authorization: token,
        }
      )
      .then((res) => {
        setSuccessMessage("Revisa tu correo electrónico para continuar.");
        setMailSent(true);
      })
      .catch((err) => {
        console.error(err);
        handleSetError(
          "No pudimos procesar tu solicitud. Inténtalo más tarde."
        );
        json.send(err);
      });
  };

  return (
    <div
      className={`w-full h-auto min-h-screen flex flex-col justify-around items-center`}
    >
    {!mailSent ? (
      <form
        onSubmit={handleSubmit}
        className={`w-11/12 max-w-[390px] h-[77%] flex flex-col justify-around items-center rounden-xl`}
      >
        <div className="w-full mb-14 flex flex-col justify-around items-center border h-40 p-2 rounded-xl bg-background border-secondary ">
          <label className="text-md text-center text-primary" htmlFor="email">
            Ingresa tu correo electrónico
          </label>
          <input
            className="divInputs w-full outline-none pl-2 border border-secondary h-11 rounded-xl text-center my-6 text-xl font-semibold"
            required
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="border-2 max-w-[500px] mb-5 flex justify-center items-center rounded-xl w-11/12 h-12 text-white font-semibold bg-primary"
          >
            Recuperar contraseña
          </button>
        </div>
      </form>
      ) : (
        <div className="w-11/12 max-w-[390px] h-[77%] flex flex-col justify-around items-center rounden-xl">
          <div className="bg-primary w-16 h-16 text-white grid place-content-center font-bold rounded-md text-4xl border">
            H!  
          </div>
          <div className="text-md text-center text-primary">
            Hemos enviado un correo electrónico a {email} con las instrucciones para recuperar tu contraseña.
          </div>
        </div>
      )}



      {successMessage && (
        <div className="text-green-600 font-semibold">{successMessage}</div>
      )}
      {error && <Errors error={error} />}
      <span
        className="text-sm font-semibold cursor-pointer text-alert hover:text-blue-900"
        onClick={handleSetShowLogin}
      >
        Volver al inicio de sesión
      </span>
    </div>
  );
}

export default PasswordRecoveryForm;
