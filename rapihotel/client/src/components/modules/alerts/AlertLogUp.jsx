import React from "react";
import { Link } from "react-router-dom"; // Importar Link desde react-router-dom
import style from "./AlertLogUp.module.css";


const AlertLogUp = ({ onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-screen z-50 bg-black bg-opacity-90 `}
    >
      <div
        className={`flex flex-col justify-around items-center  h-full sm:w-1/3 w-30vw p-4`}
      >
        <div className=" h-full flex flex-col justify-center items-center p-4 ">
          <p className="text-center text-white mb-4 text-2xl font-semibold border-2 border-white rounded-2xl p-2 ">
            Inicia sesion para crear tu lista de hoteles
            favoritos y mucho más...
          </p>
        </div>
        {/* <LoginForm/> */}
        <div className="flex  flex-row justify-between items-center  w-11/12 mb-12">
          <button
            onClick={onClose}
            className=" top-0 right-0 bg-alert text-white text-2xl border-2 border-white shadow-md rounded-xl  font-semibold pb-2 px-3"
          >
            {" "}
            Cerrar
          </button>
          <button onClick={onClose} className="flex justify-end">
            <Link
              to="/login"
              className="top-0 right-0 bg-primary text-white text-2xl border-2 border-white shadow-md rounded-xl  font-semibold pb-2 px-3"
            >
              Iniciar sesión
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertLogUp;
