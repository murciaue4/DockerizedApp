import React, { useContext, useEffect, useState } from "react";
import ProfileInfo from "./Profile";
import Messages from "./Messages";
import Payments from "./Payments";
import Reviews from "./Reviews";
import Settings from "./Setting";
import Help from "./HelpCenter";
import { loginContext } from "../../../../context/loginContext";
import axios from "axios";
import { capitalizeWords } from "../../../../helpers";
import { data } from "autoprefixer";
import {Avatar} from "@heroui/react";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const { URLStatic, user, token, imgUser, closeSession } = useContext(loginContext);
  const [dataUser, setDataUser] = useState(null);

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

  const [showInfoContainer, setShowInfoContainer] = useState(false);
  const [currentSection, setCurrentSection] = useState("profile");
console.log(dataUser);
  return (
    <div className="bg-background min-h-screen p-6 scrollbar-hide">
      <div className="max-w-6xl mx-auto">
        <div id="dashboard-content">
          <div id="dashboard-heading-section" className="mb-12">
            <div className="mb-6">
              <div
                data-stid="loyalty-account-summary"
                className="bg-backgroundAlt rounded-lg shadow p-6"
              >
                <h2 className="sr-only">Información de la cuenta</h2>
                <div className="flex flex-col">
                <Avatar size="lg" src={imgUser} />
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-text-primary">
                      {capitalizeWords(dataUser?.name + ' ' + dataUser?.lastname) || "Nombre de usuario"}
                    </div>
                    <div className="text-sm text-text-secondary break-words">
                     {dataUser?.email || "Correo electrónico"}
                    </div>
                  </div>
                  <div className="flex flex-col bg-backgroundAlt border border-border rounded-lg mt-3 p-4">
                    <a
                      href="https://www.hoteles.com/account/hotelscomrewards.html"
                      aria-label="Ver actividad de recompensas"
                      className="flex items-center gap-4"
                    >
                      <Link to={'/hoteles'} ><span className="text-sm text-primary flex-grow font-bold">
                        Buscar hoteles
                      </span></Link>
                      <svg
                        className="w-5 h-5 text-primary"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                      >
                        <path d="M10.56 6.146a.5.5 0 0 0-.706 0l-.708.708a.5.5 0 0 0 0 .707L13.586 12l-4.44 4.44a.5.5 0 0 0 0 .706l.708.708a.5.5 0 0 0 .707 0l5.146-5.147a1 1 0 0 0 0-1.414l-5.146-5.147z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full">
            <section className="w-full lg:w-1/3 bg-backgroundAlt lg:p-6">
              <div className="text-sm text-text-primary mb-4 p-2">
                <h1 className="text-2xl font-semibold mb-4">
                  Configuración de la cuenta
                </h1>
                <p className="text-sm text-text-secondary mb-4">
                  Toma el control de tu información y preferencias de cuenta.
                  Aquí puedes actualizar tu información personal, preferencias
                  de comunicación y más.
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-6">
                <div
                  className="flex bg-backgroundAlt rounded-lg shadow hover:border-2 hover:border-secondary border-border"
                  onClick={() => {
                    setCurrentSection("profile");
                    setShowInfoContainer(true);
                  }}
                >
                  <div className="flex items-center p-4" aria-hidden="true">
                    <svg
                      className="w-6 h-6 text-text-primary"
                      aria-describedby="person-description"
                      role="img"
                      viewBox="0 0 24 24"
                    >
                      <desc id="person-description">Perfil</desc>
                      <path
                        fillRule="evenodd"
                        d="M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm2 5c-4.056 0-7.42 2.975-7.979 6.86-.179 1.247.86 2.14 1.919 2.14h12.12c1.06 0 2.098-.893 1.919-2.14C19.42 14.976 16.056 12 12 12zm0 2c3.008 0 5.497 2.169 5.976 5H6.024c.479-2.831 2.967-5 5.976-5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col flex-grow p-4">
                    <a
                      href="/account/profile"
                      target="_self"
                      rel="noopener"
                      className="text-primary"
                    >
                      <span className="sr-only">Perfil</span>
                    </a>
                    <div className="mb-1">
                      <h2 className="text-lg font-semibold text-text-primary">
                        Perfil
                      </h2>
                      <div className="text-sm text-text-secondary lg:hidden">
                        Ingresa tu información personal y de contacto
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center p-4" aria-hidden="true">
                    <svg
                      className="w-5 h-5 text-text-secondary"
                      aria-describedby="chevron_right-description"
                      role="img"
                      viewBox="0 0 24 24"
                    >
                      <desc id="chevron_right-description">chevron</desc>
                      <path d="M10.56 6.146a.5.5 0 0 0-.706 0l-.708.708a.5.5 0 0 0 0 .707L13.586 12l-4.44 4.44a.5.5 0 0 0 0 .706l.708.708a.5.5 0 0 0 .707 0l5.146-5.147a1 1 0 0 0 0-1.414l-5.146-5.147z" />
                    </svg>
                  </div>
                </div>

                {/* Mensajes */}
                <div
                  className="flex bg-backgroundAlt rounded-lg shadow hover:border-2 hover:border-secondary border-border"
                  onClick={() => {
                    setCurrentSection("messages");
                    setShowInfoContainer(true);
                  }}
                >
                  <div className="flex items-center p-4" aria-hidden="true">
                    <svg
                      className="w-6 h-6 text-text-primary"
                      aria-describedby="email-description"
                      role="img"
                      viewBox="0 0 24 24"
                    >
                      <desc id="email-description">Mensajes</desc>
                      <path
                        fillRule="evenodd"
                        d="M5 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H5zm-.174 2.015A.988.988 0 0 1 5 6h14c.06 0 .118.005.174.015l-6.62 4.413a1 1 0 0 1-1.109 0l-6.62-4.413zM4 7.87V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7.869l-6.336 4.223a3 3 0 0 1-3.328 0L4 7.87z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col flex-grow p-4">
                    <a
                      href="/account/communications"
                      target="_self"
                      rel="noopener"
                      className="text-primary"
                    >
                      <span className="sr-only">Mensajes</span>
                    </a>
                    <div className="mb-1">
                      <h2 className="text-lg font-semibold text-text-primary">
                        Mensajes
                      </h2>
                      <div className="text-sm text-text-secondary lg:hidden">
                        Controla las notificaciones que recibes
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center p-4" aria-hidden="true">
                    <svg
                      className="w-5 h-5 text-text-secondary"
                      aria-describedby="chevron_right-description"
                      role="img"
                      viewBox="0 0 24 24"
                    >
                      <desc id="chevron_right-description">chevron</desc>
                      <path d="M10.56 6.146a.5.5 0 0 0-.706 0l-.708.708a.5.5 0 0 0 0 .707L13.586 12l-4.44 4.44a.5.5 0 0 0 0 .706l.708.708a.5.5 0 0 0 .707 0l5.146-5.147a1 1 0 0 0 0-1.414l-5.146-5.147z" />
                    </svg>
                  </div>
                </div>

                {/* Pagos */}
                <div
                  className="flex bg-backgroundAlt rounded-lg shadow hover:border-2 hover:border-secondary border-border"
                  onClick={() => {
                    setCurrentSection("payments");
                    setShowInfoContainer(true);
                  }}
                >
                  <div className="flex items-center p-4" aria-hidden="true">
                    <svg
                      className="w-6 h-6 text-text-primary"
                      aria-describedby="credit_card-description"
                      role="img"
                      viewBox="0 0 24 24"
                    >
                      <desc id="credit_card-description">Pagos</desc>
                      <path
                        fillRule="evenodd"
                        d="M5 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H5zM4 7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2H4V7zm0 4v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6H4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col flex-grow p-4">
                    <a
                      href="/profile/payments.html"
                      target="_blank"
                      rel="noopener"
                      className="text-primary"
                    >
                      <span className="sr-only">Formas de pago</span>
                    </a>
                    <div className="mb-1">
                      <h2 className="text-lg font-semibold text-text-primary">
                        Formas de pago
                      </h2>
                      <div className="text-sm text-text-secondary lg:hidden">
                        Consulta tus formas de pago guardadas
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center p-4" aria-hidden="true">
                    <svg
                      className="w-5 h-5 text-text-secondary"
                      aria-describedby="chevron_right-description"
                      role="img"
                      viewBox="0 0 24 24"
                    >
                      <desc id="chevron_right-description">chevron</desc>
                      <path d="M10.56 6.146a.5.5 0 0 0-.706 0l-.708.708a.5.5 0 0 0 0 .707L13.586 12l-4.44 4.44a.5.5 0 0 0 0 .706l.708.708a.5.5 0 0 0 .707 0l5.146-5.147a1 1 0 0 0 0-1.414l-5.146-5.147z" />
                    </svg>
                  </div>
                </div>

                {/* Opiniones */}
                <div
                  className="flex bg-backgroundAlt rounded-lg shadow hover:border-2 hover:border-secondary border-border"
                  onClick={() => {
                    setCurrentSection("reviews");
                    setShowInfoContainer(true);
                  }}
                >
                  <div className="flex items-center p-4" aria-hidden="true">
                    <svg
                      className="w-6 h-6 text-text-primary"
                      aria-describedby="chat_bubble-description"
                      role="img"
                      viewBox="0 0 24 24"
                    >
                      <desc id="chat_bubble-description">Opiniones</desc>
                      <path
                        fillRule="evenodd"
                        d="M8.106 20.553C7.779 21.206 8.27 22 9 22a6.993 6.993 0 0 0 5.745-3H19a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h3.727a8.66 8.66 0 0 1-.621 1.553zM4 6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-4.803a1 1 0 0 0-.865.5 5.014 5.014 0 0 1-2.737 2.24c.16-.53.273-1.072.339-1.622A1.01 1.01 0 0 0 9.94 17H5a1 1 0 0 1-1-1V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col flex-grow p-4">
                    <a
                      href="/profile/reviews.html"
                      target="_blank"
                      rel="noopener"
                      className="text-primary"
                    >
                      <span className="sr-only">Opiniones</span>
                    </a>
                    <div className="mb-1">
                      <h2 className="text-lg font-semibold text-text-primary">
                        Opiniones
                      </h2>
                      <div className="text-sm text-text-secondary lg:hidden">
                        Lee las opiniones que compartiste
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center p-4" aria-hidden="true">
                    <svg
                      className="w-5 h-5 text-text-secondary"
                      aria-describedby="chevron_right-description"
                      role="img"
                      viewBox="0 0 24 24"
                    >
                      <desc id="chevron_right-description">chevron</desc>
                      <path d="M10.56 6.146a.5.5 0 0 0-.706 0l-.708.708a.5.5 0 0 0 0 .707L13.586 12l-4.44 4.44a.5.5 0 0 0 0 .706l.708.708a.5.5 0 0 0 .707 0l5.146-5.147a1 1 0 0 0 0-1.414l-5.146-5.147z" />
                    </svg>
                  </div>
                </div>

                {/* Configuración */}
                <div
                  className="flex bg-backgroundAlt rounded-lg shadow hover:border-2 hover:border-secondary border-border"
                  onClick={() => {
                    setCurrentSection("settings");
                    setShowInfoContainer(true);
                  }}
                >
                  <div className="flex items-center p-4" aria-hidden="true">
                    <svg
                      className="w-6 h-6 text-text-primary"
                      aria-describedby="settings-description"
                      role="img"
                      viewBox="0 0 24 24"
                    >
                      <desc id="settings-description">Configuración</desc>
                      <path
                        fillRule="evenodd"
                        d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M9.728 2.262a1 1 0 0 0-.738.715l-.438 1.636a1 1 0 0 1-1.225.707l-1.625-.435a1 1 0 0 0-.988.281 10.026 10.026 0 0 0-2.282 3.93 1 1 0 0 0 .25 1c.427.428.82.804 1.211 1.212a1 1 0 0 1-.014 1.4l-1.197 1.196a1 1 0 0 0-.25 1 10.026 10.026 0 0 0 2.282 3.93 1 1 0 0 0 .988.281l1.625-.435a1 1 0 0 1 1.225.707l.438 1.636a1 1 0 0 0 .738.715 9.99 9.99 0 0 0 4.544 0 1 1 0 0 0 .738-.715l.438-1.636a1 1 0 0 1 1.225-.707l1.625.435a1 1 0 0 0 .988-.281 10.024 10.024 0 0 0 2.282-3.93 1 1 0 0 0-.25-1l-1.197-1.197a1 1 0 0 1 0-1.414l1.198-1.197a1 1 0 0 0 .249-1 10.026 10.026 0 0 0-2.282-3.93 1 1 0 0 0-.988-.281l-1.625.435a1 1 0 0 1-1.225-.707l-.438-1.636a1 1 0 0 0-.738-.715 9.992 9.992 0 0 0-4.544 0zm.756 2.869.277-1.034a8.109 8.109 0 0 1 2.478 0l.277 1.034a3 3 0 0 0 3.675 2.121l1.023-.274a8.03 8.03 0 0 1 1.248 2.146l-.755.755a3 3 0 0 0 0 4.242l.755.755a8.025 8.025 0 0 1-1.248 2.146l-1.023-.274a3 3 0 0 0-3.674 2.121l-.278 1.035a8.11 8.11 0 0 1-2.478 0l-.277-1.035a3 3 0 0 0-3.675-2.121l-1.023.274a8.027 8.027 0 0 1-1.248-2.146l.755-.755a3 3 0 0 0 .043-4.199c-.26-.27-.532-.54-.797-.801a8.028 8.028 0 0 1 1.247-2.143l1.023.274a3 3 0 0 0 3.675-2.121z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col flex-grow p-4">
                    <a
                      href="/account/settings"
                      target="_self"
                      rel="noopener"
                      className="text-primary"
                    >
                      <span className="sr-only">Seguridad y configuración</span>
                    </a>
                    <div className="mb-1">
                      <div className="text-md font-bold text-text-primary">
                        Seguridad y configuración
                      </div>
                      <div className="text-sm text-text-secondary lg:hidden">
                        Actualiza tu correo electrónico o contraseña
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center p-4" aria-hidden="true">
                    <svg
                      className="w-5 h-5 text-text-secondary"
                      aria-describedby="chevron_right-description"
                      role="img"
                      viewBox="0 0 24 24"
                    >
                      <desc id="chevron_right-description">chevron</desc>
                      <path d="M10.56 6.146a.5.5 0 0 0-.706 0l-.708.708a.5.5 0 0 0 0 .707L13.586 12l-4.44 4.44a.5.5 0 0 0 0 .706l.708.708a.5.5 0 0 0 .707 0l5.146-5.147a1 1 0 0 0 0-1.414l-5.146-5.147z" />
                    </svg>
                  </div>
                </div>

                {/* Ayuda */}
                <div
                  className="flex bg-backgroundAlt rounded-lg shadow hover:border-2 hover:border-secondary border-border"
                  onClick={() => {
                    setCurrentSection("help");
                    setShowInfoContainer(true);
                  }}
                >
                  <div className="flex items-center p-4" aria-hidden="true">
                    <svg
                      className="w-6 h-6 text-text-primary"
                      aria-describedby="help-description"
                      role="img"
                      viewBox="0 0 24 24"
                    >
                      <desc id="help-description">Ayuda y comentarios</desc>
                      <path
                        fillRule="evenodd"
                        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM10.489 8.921C10.197 9.146 10 9.475 10 10H8c0-1.132.475-2.052 1.269-2.664C10.032 6.75 11.016 6.5 12 6.5c.984 0 1.968.249 2.731.836C15.525 7.948 16 8.868 16 10c0 .764-.223 1.428-.663 1.955-.428.51-.995.815-1.555 1-.392.13-.556.296-.636.42-.089.139-.146.336-.146.625h-2c0-.54.105-1.15.465-1.708.367-.57.938-.987 1.69-1.236.334-.11.533-.247.648-.384.101-.122.197-.313.197-.672 0-.525-.197-.854-.489-1.079C13.19 8.673 12.673 8.5 12 8.5c-.673 0-1.189.173-1.511.421zM11 16.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col flex-grow p-4">
                    <a
                      href="/account/help"
                      target="_self"
                      rel="noopener"
                      className="text-primary"
                    >
                      <span className="sr-only">Ayuda y comentarios</span>
                    </a>
                    <div className="mb-1">
                      <h2 className="text-lg font-semibold text-text-primary">
                        Ayuda y comentarios
                      </h2>
                      <div className="text-sm text-text-secondary lg:hidden">
                        Accede al servicio de atención a clientes
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center p-4" aria-hidden="true">
                    <svg
                      className="w-5 h-5 text-text-secondary"
                      aria-describedby="chevron_right-description"
                      role="img"
                      viewBox="0 0 24 24"
                    >
                      <desc id="chevron_right-description">chevron</desc>
                      <path d="M10.56 6.146a.5.5 0 0 0-.706 0l-.708.708a.5.5 0 0 0 0 .707L13.586 12l-4.44 4.44a.5.5 0 0 0 0 .706l.708.708a.5.5 0 0 0 .707 0l5.146-5.147a1 1 0 0 0 0-1.414l-5.146-5.147z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center py-6">
                <button
                  type="button"
                  className="px-4 py-2 border border-border rounded-md text-text-primary hover:bg-background"
                  onClick={() => {
                    // Aquí puedes agregar la lógica para cerrar sesión
                    closeSession();
                    // Por ejemplo, redirigir al usuario a la página de inicio de sesión
                  }
                }
                >
                  Cerrar sesión
                </button>
              </div>
            </section>

            <section className="w-0 lg:w-2/3 h-full">
              {showInfoContainer ? (
                <div className="w-full min-h-full p-6 max-lg:fixed max-lg:inset-0 max-lg:z-50 bg-background">
                  <div>
                    <button
                      className="absolute lg:hidden top-4 right-4 bg-backgroundAlt text-text-primary px-2 py-1 rounded-md"
                      onClick={() => setShowInfoContainer(false)}
                    >
                      Cerrar
                    </button>
                    <div>
                      {currentSection === "profile" && (
                        <ProfileInfo
                          dataUser={dataUser}
                          user={user}
                          setShowInfoContainer={setShowInfoContainer}
                        />
                      )}
                      {currentSection === "settings" && <Settings />}
                      {currentSection === "messages" && <Messages />}
                      {currentSection === "payments" && <Payments />}
                      {currentSection === "reviews" && <Reviews />}
                      {currentSection === "help" && <Help />}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full min-h-screen p-4 bg-background border border-border flex flex-col items-center justify-start max-lg:hidden">
                  <h2 className="text-lg font-semibold m-4 text-text-primary">
                    Bienvenido a tu cuenta
                  </h2>
                  <p className="text-sm text-text-secondary mb-4">
                    Aquí puedes ver y editar tu información personal,
                    preferencias de comunicación y más.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>

        <div id="mobile-verification-container">
          <div id="universal-profile-mobile-verification"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;