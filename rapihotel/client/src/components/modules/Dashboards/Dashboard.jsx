import { useContext, useEffect, useRef, useState } from "react";
import { loginContext } from "../../../context/loginContext";
import axios from "axios";
import Errors from "../alerts/Errors";
import { Link } from "react-router-dom";
import OwnerTable from "./OwnerTable";
import ProfilePictureModal from "../forms/ProfilePictureModal";
import VerifyAlert from "../alerts/VerifyAlert";
import Micuenta from "./Micuenta";
import Skeleton from "react-loading-skeleton";

import searchIconB from "../../../static/searchIconB-02.svg";
import propertyIcon from "../../../static/propertyIcon-10.svg";
import publishIcon from "../../../static/publishIcon-12.svg";
import reservedIcon from "../../../static/ReservasIcon-13.svg";
import subsIcon from "../../../static/MembershipIcon-11.svg";
import userIcon from "../../../static/userIconBold-06.svg";
import 'react-loading-skeleton/dist/skeleton.css';

const Dashboard = () => {
  const { URLStatic, user, token, imgUser } = useContext(loginContext);
  const [dataUser, setDataUser] = useState(null);
  const [err, setErr] = useState(false);
  const [dataOwner, setDataOwner] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const tableRef = useRef(null);

  const [showOwner, setShowOwner] = useState(false);
  const [showReservations, setShowReservations] = useState(false);
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const [showVerifyAlert, setShowVerifyAlert] = useState(false);






  useEffect(() => {
    const fetchDataUser = async () => {
      if (user) {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          };
          const response = await axios.get(
            `${URLStatic}/user/users/${user.user_id}`,
            config
          );
          setDataUser(response.data.body[0]);
          if (!response.data.body[0].verify) {
            setShowVerifyAlert(true);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchDataUser();
  }, [user, token, URLStatic]);
  useEffect(() => {
    const fetchDataOwner = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        };
        
        const propiedades = await axios.get(
          `${URLStatic}/user/hoteles/propietario_id/${user.user_id}`,
          config
        );
       
        if (propiedades.data.body?.length > 0) {

          
          setDataOwner(propiedades.data.body);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (user) fetchDataOwner();
  }, [user, token, URLStatic]);

  const scrollToTable = () => {
    if (tableRef.current) {
      const tableTop = tableRef.current.getBoundingClientRect().top;
      window.scrollTo({
        top: window.scrollY + tableTop,
        behavior: "smooth",
      });
    }
  };

  const ownerHandleShow = () => {
    setShowOwner(!showOwner);
    setTimeout(() => {
      scrollToTable();
    }, 100);
    setShowReservations(false);
    setShowSubscriptions(false);

  };

  const handleShowReservations = () => {
    setShowReservations(!showReservations);
    setShowOwner(false);
    setShowSubscriptions(false);
  }
  const handleShowSubscriptions = () => {
    setShowSubscriptions(!showSubscriptions);
    setShowOwner(false);
    setShowReservations(false);
  }
console.log('showMenuToggle', showMobileMenu)
  return (
    <div className="flex overflow-hidden  h-auto">
      {/* Sidebar para desktop */}
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
        <div className="p-6 border-b bg-secondary text-white">
          <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full overflow-hidden" onClick={() => setModalIsOpen(true)}>
                <img
                  className="container w-full h-full object-cover"
                  src={imgUser ? imgUser : userIcon}
                  alt="Perfil"
                />
               </div>
            <div>
              <h2 className="text-lg font-bold text-accent">
                {dataUser ? String(dataUser.name).charAt(0).toUpperCase()+String(dataUser.name).slice(1) : <Skeleton width={80} />}
              </h2>
              <p className="text-sm text-background">
                @{user.username || <Skeleton width={50} />}
              </p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <Link
            to="/"
            className="flex items-center p-2 my-2 text-gray-600 hover:bg-secondary hover:text-white rounded-md transition-colors"
          >
            <img src={searchIconB} alt="Buscar" className="w-5 h-5 mr-3" />
            <span>Buscar Hoteles</span>
          </Link>
          <button
            onClick={ownerHandleShow}
            className={`w-full flex items-center p-2 my-2 text-gray-600 hover:bg-secondary hover:text-white rounded-md transition-colors ${showOwner ? "bg-secondary text-white" : ""}`}>
            <img
              src={propertyIcon}
              alt="Mis propiedades"
              className="w-5 h-5 mr-3"
            />
            <span>Mis Propiedades</span>
          </button>
          <Link
            to="/hoteles/post"
            className={`flex items-center p-2 my-2 text-gray-600 hover:bg-secondary hover:text-white rounded-md transition-colors`}
          >
            <img src={publishIcon} alt="Publicar" className="w-5 h-5 mr-3" />
            <span>Publicar</span>
          </Link>
          <button className={`w-full  flex items-center p-2 my-2 text-gray-600 hover:bg-secondary hover:text-white rounded-md transition-colors  ${showReservations ? "bg-secondary text-white" : ""}`} onClick={handleShowReservations}>
            <img src={reservedIcon} alt="Reservas" className="w-5 h-5 mr-3" />
            <span>Reservas</span>
          </button>
          <button className={`w-full  flex items-center p-2 my-2 text-gray-600 hover:bg-secondary hover:text-white rounded-md transition-colors ${showSubscriptions ? "bg-secondary text-white" : ""}`} onClick={handleShowSubscriptions}>
            <img src={subsIcon} alt="Suscripciones" className="w-5 h-5 mr-3" />
            <span>Suscripciones</span>
          </button>
        </nav>
      </aside>

      {/* Menú lateral para mobile */}
      {showMobileMenu && (
        <div className={`md:hidden fixed inset-0 z-50 flex  ${showMobileMenu ? "animate-slideIn" : "animate-slideOut"} transition-transform duration-300`}>
    
          <div className="w-64 bg-white shadow-md">
            <div className="p-4 border-b flex justify-between items-start bg-primary text-white">
              <div className="flex items-start space-x-4 "> 
               <div className="w-14 h-14 rounded-full overflow-hidden">
                <img
                  className="container w-full h-full object-cover"
                  src={imgUser ? imgUser : userIcon}
                  alt="Perfil"
                />
               </div>
                <div>
                  <h2 className="text-lg font-bold text-accent">
                    {dataUser ? dataUser.name : <Skeleton width={80} />}
                  </h2>
                  <p className="text-sm">
                    @{user.username || <Skeleton width={50} />}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  
                  setShowMobileMenu(false)
                }}
                className="w-7 h-7 text-backgound border-2 border-background rounded-xl flex items-center justify-center"
              >
                x
              </button>
            </div>
            <nav className="p-4 ">
              <Link
                to="/"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center p-2 my-2 text-text-secondary hover:bg-primary hover:text-background rounded-md transition-colors"
              >
                <img src={searchIconB} alt="Buscar" className="w-5 h-5 mr-3" />
                <span>Buscar Hoteles</span>
              </Link>
              <button
                onClick={() => {
                  ownerHandleShow();
                  setShowMobileMenu(false);
                }}
                className={` w-full flex items-center p-2 my-2 text-text-secondary hover:bg-primary hover:text-background rounded-md transition-colors  `}
              >
                <img
                  src={propertyIcon}
                  alt="Mis propiedades"
                  className="w-5 h-5 mr-3"
                />
                <span>Mis Propiedades</span>
              </button>
              <Link
                to="/hoteles/post"
                onClick={() => {setShowMobileMenu(false)
                  setShowMobileMenu(false);}
                }
                className="flex items-center p-2 my-2 text-text-secondary hover:bg-primary hover:text-background rounded-md transition-colors"
              >
                <img
                  src={publishIcon}
                  alt="Publicar"
                  className="w-5 h-5 mr-3"
                />
                <span>Publicar</span>
              </Link>
              <button className="flex items-center p-2 my-2 text-text-secondary hover:bg-primary hover:text-background rounded-md transition-colors"
                onClick={() => {
                  handleShowReservations();
                  setShowMobileMenu(false);
                }
                }>
                <img
                  src={reservedIcon}
                  alt="Reservas"
                  className="w-5 h-5 mr-3"
                />
                <span>Reservas</span>
              </button>
              <button className="flex items-center p-2 my-2 text-text-secondary hover:primary hover:text-background rounded-md transition-colors"
                onClick={() => {
                  handleShowSubscriptions();
                  setShowMobileMenu(false);
                }}
              >
                <img
                  src={subsIcon}
                  alt="Suscripciones"
                  className="w-5 h-5 mr-3"
                />
                <span>Suscripciones</span>
              </button>
            </nav>
          </div>
          {/* Backdrop para cerrar el menú al hacer clic fuera */}
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setShowMobileMenu(false)}
          ></div>
        </div>
      )}

      {/* Área principal */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Barra superior para mobile */}
        <header className="md:hidden flex items-center justify-between bg-white p-4 shadow-md  ">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-gray-600 focus:outline-none"
          >
            {/* Ícono hamburguesa */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full overflow-hidden" onClick={() => setModalIsOpen(true)}>
                <img
                  className="container w-full h-full object-cover"
                  src={imgUser ? imgUser : userIcon}
                  alt="Perfil"
                />
               </div>
            <div>
              <h2 className="text-md font-bold text-primary">
                {dataUser ? dataUser.name : <Skeleton width={80} />}
              </h2>
              <p className="text-sm text-gray-500">
                @{user.username || <Skeleton width={50} />}
              </p>
            </div>
          </div>
         <Link to={'/'}>
         <button
            onClick={() => {}}
            className="text-accent font-bold"
          >
            Atrás
          </button>
         </Link>
        </header>

        <main className="p-6">
          <ProfilePictureModal
            isOpen={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
            onUpload={() => setModalIsOpen(false)}
            existingImage={imgUser ? URLStatic + imgUser : userIcon}
          />

          {showVerifyAlert && <VerifyAlert />

          }

          <div className="flex flex-col w-full">
            {/* Container para mostrar las opciones con diseño de skeleton por defecto */}
            <div className={`standartContainer w-full h-auto min-h-[150px] border my-6 rounded-2xl p-2 ${showOwner ? "bg-indigo-600" : ""}`} onClick={ownerHandleShow} >
              {
                (
                  /* Actual content when showOwner is true */
                  <div><OwnerTable propertys={dataOwner} /></div>
                ) || (
                  /* Skeleton de la sección de opciones de usuario */
                  <div className="space-y-4">
                    <Skeleton
                      height={390}
                      baseColor="#fff"
                      highlightColor="#eff"
                      className="w-3/4 mx-auto"
                    />
                    <Skeleton
                      height={30}
                      baseColor="#fff"
                      highlightColor="#fff"
                      className="w-5/6 mx-auto"
                    />
                    <div className="grid grid-cols-2 gap-4 ">
                      <Skeleton
                        height={60}
                        baseColor="#fff"
                        highlightColor="#fff"
                        className="w-2/3 mx-auto"
                      />
                      <Skeleton
                        height={30}
                        baseColor="#fff"
                        highlightColor="#fff"
                        className="w-4/5 mx-auto"
                      />
                    </div>
                  </div>
                )
              }


            </div>

            <div className={`standartContainer w-full h-auto min-h-[150px] border my-6 rounded-2xl p-2 ${showReservations ? "bg-secondary text-white" : ""}`} onClick={handleShowReservations}
              
            >
              <h3 className="text-2xl font-semibold text-gray-400">Tus reservas</h3>
            </div>

            <div className={`standartContainer w-full h-auto min-h-[150px] border my-6 rounded-2xl p-2 ${showSubscriptions ? "bg-secondary text-white" : ""}`} onClick={handleShowSubscriptions}>
              <h3 className="text-2xl font-semibold text-gray-400">Tus suscripciones</h3>
            </div>

            {/* Mi Cuenta */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Mi cuenta
                </h2>
                <button
                  onClick={() => setShowAccountDetails(!showAccountDetails)}
                  className="text-secondary font-medium"
                >
                  {showAccountDetails ? "Ocultar" : "Ver"}
                </button>
              </div>
              {showAccountDetails && (
                <Micuenta dataUser={dataUser} user={user} />
              )}
            </div>

            {/* Ajustes */}
           
          </div>

          {err && <Errors error={err} />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
