import { Link } from "react-router-dom";
import { loginContext } from "../../../context/loginContext";
import { useContext, useState } from "react";

import userIcon from "../../../static/userIconBold-06.svg";

import AlertLogUp from "../alerts/AlertLogUp";

const Nav = () => {
  // 'menuMounted' controla si el menú se renderiza en el DOM.
  // 'menuOpen' controla la animación (entrada/salida) del menú.
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    isLogin,
    user,
    closeSession,
    imgUser,
    showAlertLogUp,
    handleFavouritesClick,
    handleSetShowAlert,
  } = useContext(loginContext);

  function toCapitalCase(string) {
    return string.replace(/\b\w/g, (match) => match.toUpperCase());
  }

  const toggleMenu = () => {
    if (menuOpen) {
      // Si el menú está abierto, inicia la animación de salida
      setMenuOpen(false);
      // Después de la duración de la animación (300ms), se desmonta el menú
      setTimeout(() => {
        setMenuMounted(false);
      }, 300); // 300ms debe coincidir con la duración de la transición
    } else {
      // Si el menú está cerrado, se monta y se inicia la animación de entrada
      setMenuMounted(true);
      // Se utiliza un pequeño retraso para asegurarse de que el componente ya esté montado
      setTimeout(() => {
        setMenuOpen(true);
      }, 10);
    }
  };

  return (
    <div className={`w-full h-auto z-10 ${menuMounted ? 'fixed' : ''} bg-background flex items-start justify-start text-primary `}>
      <nav className="w-full h-[70px] flex items-center justify-between relative">
        <section className="flex flex-row items-end justify-end ml-5">
          <Link to="/">
            <h1 className="text-5xl font-semibold ">Rh</h1>
          </Link>
          <span className=" text-sm hidden md:block">Rubiales</span>
        </section>

        <section className="h-full w-auto flex items-center text-base">
          <button onClick={handleFavouritesClick} className="flex items-center h-full">
            <div className="flex items-center h-full w-full">
             
            </div>
            <div className="items-center ml-2 hidden md:block">
              <span>Favoritos</span>
            </div>
          </button>

          <button className="flex items-center h-full mx-4">
            {isLogin ? (
              
                <div className="w-9 h-9 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={imgUser ? imgUser : userIcon}
                    alt="Perfil"
                  />
                </div>
              
            ) : (
              <Link to="/login">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img
                    src={userIcon}
                    alt=""
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </Link>
            )}

            <div className="hidden md:block">
              {isLogin ? (
               null
              ) : (
                <Link to="/login" className="ml-2">
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </button>

          <section
            className=" relative"
           
          >
            
            {menuMounted && (
              <div
                className={`fixed z-20 top-[70px] right-0 bg-background text-lg text-primary h-screen w-full md:w-1/2 lg:w-1/3 flex flex-col items-start justify-start p-5 transition-transform duration-300 ${
                  menuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <h2 className="text-xl font-bold mb-4 text-accent">Menú</h2>
                <Link
                  to="/"
                  className="text-left py-3 px-5 w-full hover:bg-secondary rounded-md font-bold text-lg"
                >
                  Inicio
                </Link>

                <Link
                  to={isLogin ? "/profile" : "/login"}
                  className={`${
                    !isLogin ? "text-alert" : ""
                  } text-left py-3 px-5 w-full hover:bg-secondary rounded-md font-semibold`}
                >
                  {isLogin ? "Mi cuenta" : "Iniciar sesión"}
                </Link>

                {isLogin && (
                  <div className="w-full flex flex-col justify-center items-center px-5 font-normal">
                    <button className="text-left py-3 px-5 w-full hover:bg-secondary rounded-md">
                      Mis reservas
                    </button>
                    <Link
                      to="/hoteles/post"
                      className="text-left py-3 px-5 w-full hover:bg-secondary rounded-md"
                    >
                      Publicar
                    </Link>
                    <button className="text-left py-3 px-5 w-full hover:bg-secondary rounded-md">
                      Configuración
                    </button>
                  </div>
                )}

                <button className="text-left py-3 px-5 w-full hover:bg-secondary rounded-md font-semibold">
                  Vistos recientemente
                </button>

                <button className="text-left py-3 px-5 w-full hover:bg-secondary rounded-md font-semibold">
                  Ayuda y atención al cliente
                </button>

                <div className="w-full mt-8">
                  {isLogin ? (
                    <button
                      onClick={closeSession}
                      className="text-left py-3 px-5 w-full text-accent font-semibold hover:bg-red-100 rounded-md"
                    >
                      Cerrar sesión
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="text-left text-lg py-3 px-5 w-full text-primary hover:bg-secondary rounded-md font-bold"
                    >
                      Registrarse
                    </Link>
                  )}
                </div>
              </div>
            )}
          </section>
        </section>
      </nav>
      {showAlertLogUp && <AlertLogUp onClose={handleSetShowAlert} />}
    </div>
  );
};

export default Nav;
