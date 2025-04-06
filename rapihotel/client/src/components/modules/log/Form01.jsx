import React, { useState, useContext, useEffect, useCallback } from "react";
import Errors from "../alerts/Errors";
import { loginContext } from "../../../context/loginContext";
import AlertStandard from "../alerts/AlertStandard";

const initialFormData = {
  id: 0,
  usertype: "",
  name: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const initialError = { error: false, message: "" };
const initialAlert = { AlertTitle: "", AlertString: "", AlertType: "", onClose: () => {} };

const Form01 = ({ handleSetShowForm01 }) => {
  const { URLStatic } = useContext(loginContext);
  const [formData, setFormData] = useState(initialFormData);
  const [err, setErr] = useState(initialError);
  const [showAlert, setShowAlert] = useState(initialAlert);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (err.error) {
      const timer = setTimeout(() => setErr(initialError), 3000);
      return () => clearTimeout(timer);
    }
  }, [err]);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      setErr({ error: true, message: "Todos los campos son obligatorios." });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErr({ error: true, message: "El correo electrónico no es válido." });
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErr({ 
        error: true, 
        message: "La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y un número." 
      });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setErr({ error: true, message: "Las contraseñas no coinciden." });
      return false;
    }
    return true;
  };

  const postNewUser = async (user) => {
    const url = `${URLStatic}/user/users`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      if (data.error) {
        handleSetShowAlert( "Error",data.body || "Error al crear el usuario.","error");
        setErr({ error: true, message: data.body || "Error al crear el usuario." });
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error en postNewUser:", error);
      setErr({ error: true, message: "Error de conexión. Inténtalo más tarde." });
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const success = await postNewUser(formData);
    setIsSubmitting(false);
    if (success) {
      handleSetShowForm01();
    }
  };

  const handleSetShowAlert = (AlertTitle, AlertString, AlertType) => {
    setShowAlert({ AlertTitle, AlertString, AlertType, onClose: () => setShowAlert(initialAlert) });
    setTimeout(() => {
      setShowAlert(initialAlert);
    }, 3000);
  };

  return (
    <div className="w-full max-w-screen-sm h-full  p-8 flex flex-col justify-around items-center rounded-xl bg-backgroundAlt">
      <h1 className="bg-primary w-16 h-16 text-text-primary grid place-content-center font-bold rounded-md text-4xl p-2 mb-12">H!</h1>
      
      <form className="w-full h-full flex flex-col justify-around items-center" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col items-center">
          <label htmlFor="name" className="text-md w-full text-left mb-1 text-text-primary">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full outline-none pl-2 border border-border h-11 rounded-xl text-center mb-4 text-xl font-semibold text-primary bg-background"
          />

          {formData.usertype !== "Empresa" && (
            <>
              <label htmlFor="lastname" className="text-md w-full text-left mb-1 text-text-primary">Apellidos</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                required
                value={formData.lastname}
                onChange={handleInputChange}
                className="w-full outline-none pl-2 border border-border h-11 rounded-xl text-center mb-4 text-xl font-semibold text-primary bg-background"
              />
            </>
          )}

          <label htmlFor="email" className="text-md w-full text-left mb-1 text-text-primary">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full outline-none pl-2 border border-border h-11 rounded-xl text-center mb-4 text-xl font-semibold text-primary bg-background"
          />

          <label htmlFor="username" className="text-md w-full text-left mb-1 text-text-primary">
            @Username
            <p className="text-sm mb-1 font-normal text-text-secondary">
              <i>Crea un nombre de usuario para iniciar sesión más tarde.</i>
            </p>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Ej: Pepito123"
            className="w-full outline-none pl-2 border border-border h-11 rounded-xl text-center mb-4 text-xl font-semibold text-primary bg-background"
          />

          <label htmlFor="password" className="text-md w-full text-left mb-1 text-text-primary">
            Contraseña
            <p className="text-sm mb-1 font-normal text-text-secondary">
              <i>8 dígitos, incluye mayúsculas, minúsculas y al menos un número.</i>
            </p>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className="w-full outline-none pl-2 border border-border h-11 rounded-xl text-center mb-4 text-xl font-semibold text-primary bg-background"
          />

          <label htmlFor="confirmPassword" className="text-md w-full text-left mb-1 text-text-primary">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full outline-none pl-2 border h-11 rounded-xl text-center mb-4 text-xl font-semibold text-primary bg-background ${
              formData.password === formData.confirmPassword ? "border-success" : "border-error"
            }`}
          />
        </div>
        
        <div className="w-full flex justify-center mt-12">
          <button
            type="submit"
            disabled={isSubmitting}
            className="max-w-[500px] mb-5 flex justify-center items-center rounded-xl w-11/12 h-12 font-semibold bg-primary text-text-primary hover:bg-secondary transition-colors"
          >
            {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </div>
        
        <span
          onClick={handleSetShowForm01}
          className="text-md font-semibold cursor-pointer text-primary hover:text-secondary"
        >
          Ya tengo una cuenta
        </span>
      </form>
     
      {showAlert.AlertTitle && <AlertStandard {...showAlert} />}
    </div>
  );
};

export default Form01;