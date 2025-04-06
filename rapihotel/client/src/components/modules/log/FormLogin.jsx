import React, { useState } from "react";
import axios from "axios";
import Errors from "../alerts/Errors";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { loginContext } from "../../../context/loginContext";




function LoginForm({ handleSetShowForm01 }) {

  const { URLStatic } = useContext(loginContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSetError = (err) => {
    setError(err);
    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  const cambiar = () => {
    handleSetShowForm01();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let dataForm = {
      username,
      password,
    };

    const url = `${URLStatic}/auth/login/`;
    axios
      .post(url, dataForm, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.body);
        //guardar el token en localstorage
        window.localStorage.setItem(
          "sessionLogin",
          JSON.stringify(res.data.body.token)
        );
        //guardar credenciales en localstorage
        window.localStorage.setItem(
          "sessionLoginUser",
          JSON.stringify({
            id: res.data.body.id,
            user_id: res.data.body.user_id,
            username: res.data.body.username,
            email: res.data.body.email,
            temp_token: res.data.body.temp_token,
            is_verify: res.data.body.is_verify,
          })
        );

        location.reload();
      })
      .catch((err) => {
        console.log(err);
        handleSetError(err.response.data);
      });
  };

  return (
    <div
      className={`w-full max-w-screen-sm rounded-3xl h-[77%] flex flex-col justify-around items-center overflow-hidden bg-backgroundAlt p-8 m-`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full h-full flex flex-col justify-around items-center`}
      >
        <div className="bg-primary w-16 h-16 text-text-primary grid place-content-center font-bold rounded-md text-4xl border">
          H!
        </div>

        <div>
          <label className="text-md " htmlFor="username">
            Usuario
          </label>
          <input
            className="divInputs w-full outline-none   pl-2 border border-secondary h-11 rounded-xl text-center mb-6 text-medium font-semibold "
            required={true}
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <label className="text-md" htmlFor="password">
            Contraseña
          </label>
          <input
            className="divInputs w-full outline-none  pl-1 border border-secondary h-11 rounded-xl text-center text-xl font-semibold "
            required={true}
            type="password" // Este tipo de input oculta la contraseña
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="w-full flex justify-end hover:underline cursor-pointer">
            <Link to={'/auth/forgot'} className="text-md mt-4 text-alert font-medium">
              Olvidé mi contraseña
            </Link>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="border-2 max-w-[500px] mb-5 flex justify-center items-center rounded-xl w-11/12 h-12 text-white font-semibold bg-primary"
          >
            Iniciar sesión
          </button>
        </div>

        <span
        className="text-sm font-semibold cursor-pointer text-alert hover:text-blue-900"
        onClick={cambiar}
      >
        Crear una cuenta
      </span>
      </form>
      
      {error ? <Errors error={error} /> : null}
    </div>
  );
}

export default LoginForm;
