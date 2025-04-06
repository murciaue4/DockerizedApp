import React from 'react';

const OwnerDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Contenedor principal del dashboard */}
        <div id="dashboard-content">
          {/* Sección de encabezado */}
          <div id="dashboard-heading-section" className="mb-12">
            <div className="mb-6">
              <div
                data-stid="owner-account-summary"
                className="bg-white rounded-lg shadow p-6"
              >
                <h2 className="sr-only">
                  Información de la cuenta de propietario
                </h2>
                <div className="flex flex-col">
                  <div className="mb-4">
                    <div className="text-xl font-medium text-gray-800">
                      Hola, Propietario
                    </div>
                    <div className="text-sm text-gray-600 break-words">
                      propietario@ejemplo.com
                    </div>
                  </div>
                  <div className="flex flex-col bg-white border rounded-lg mt-3 p-4">
                    <a
                      href="/owner/properties"
                      aria-label="Ver mis propiedades"
                      className="flex items-center gap-4"
                    > <svg
                        className="w-5 h-5 text-blue-600 rotate-180"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                      >
                        <path d="M10.56 6.146a.5.5 0 0 0-.706 0l-.708.708a.5.5 0 0 0 0 .707L13.586 12l-4.44 4.44a.5.5 0 0 0 0 .706l.708.708a.5.5 0 0 0 .707 0l5.146-5.147a1 1 0 0 0 0-1.414l-5.146-5.147z" />
                      </svg>

                      <span className="text-sm text-blue-600 flex-grow">
                        Ver mi perfil
                      </span>

                     

                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de contenido general */}
          <div>
            <div className="text-sm text-gray-700">
              Administra tu propiedad, tus reservas y preferencias en aquí.
            </div>
        
            {/* Tarjetas de navegación */}
            <div className="flex flex-col gap-4 pt-6">
              {/* Tarjeta: Mis Propiedades */}
              <div className="flex bg-white rounded-lg shadow hover:border-2 hover:border-secondary">
                <div className="flex items-center p-4" aria-hidden="true">
                  <svg
                    className="w-6 h-6"
                    aria-describedby="properties-description"
                    role="img"
                    viewBox="0 0 24 24"
                  >
                    <desc id="properties-description">Propiedad</desc>
                    <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10z" />
                    <path d="M9 22V12h6v10" />
                  </svg>
                </div>
                <div className="flex flex-col flex-grow p-4">
                  <a
                    href="/owner/properties"
                    target="_self"
                    rel="noopener"
                    className="text-blue-600"
                  >
                    <span className="sr-only">Propiedad</span>
                  </a>
                  <div className="mb-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Propiedad
                    </h2>
                    <div className="text-sm text-gray-500">
                      Gestiona tu propiedad
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-4" aria-hidden="true">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    aria-describedby="chevron_right-description"
                    role="img"
                    viewBox="0 0 24 24"
                  >
                    <desc id="chevron_right-description">chevron</desc>
                    <path d="M10.56 6.146a.5.5 0 0 0-.706 0l-.708.708a.5.5 0 0 0 0 .707L13.586 12l-4.44 4.44a.5.5 0 0 0 0 .706l.708.708a.5.5 0 0 0 .707 0l5.146-5.147a1 1 0 0 0 0-1.414l-5.146-5.147z" />
                  </svg>
                </div>
              </div>

              {/* Tarjeta: Reservas */}
              <div className="flex bg-white rounded-lg shadow hover:border-2 hover:border-secondary">
                <div className="flex items-center p-4" aria-hidden="true">
                  <svg
                    className="w-6 h-6"
                    aria-describedby="reservations-description"
                    role="img"
                    viewBox="0 0 24 24"
                  >
                    <desc id="reservations-description">Reservas</desc>
                    <path d="M3 8h18v13H3z" />
                    <path d="M16 2v4" />
                    <path d="M8 2v4" />
                    <path d="M3 13h18" />
                  </svg>
                </div>
                <div className="flex flex-col flex-grow p-4">
                  <a
                    href="/owner/reservations"
                    target="_self"
                    rel="noopener"
                    className="text-blue-600"
                  >
                    <span className="sr-only">Reservas</span>
                  </a>
                  <div className="mb-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Reservas
                    </h2>
                    <div className="text-sm text-gray-500">
                      Consulta y gestiona tus reservas
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-4" aria-hidden="true">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    aria-describedby="chevron_right-description"
                    role="img"
                    viewBox="0 0 24 24"
                  >
                    <desc id="chevron_right-description">chevron</desc>
                    <path d="M10.56 6.146a.5.5 0 0 0-.706 0l-.708.708a.5.5 0 0 0 0 .707L13.586 12l-4.44 4.44a.5.5 0 0 0 0 .706l.708.708a.5.5 0 0 0 .707 0l5.146-5.147a1 1 0 0 0 0-1.414l-5.146-5.147z" />
                  </svg>
                </div>
              </div>

              {/* Tarjeta: Pagos y Facturación */}
              <div className="flex bg-white rounded-lg shadow hover:border-2 hover:border-secondary">
                <div className="flex items-center p-4" aria-hidden="true">
                  <svg
                    className="w-6 h-6"
                    aria-describedby="payments-description"
                    role="img"
                    viewBox="0 0 24 24"
                  >
                    <desc id="payments-description">
                      Pagos y Facturación
                    </desc>
                    <path d="M5 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H5z" />
                    <path d="M4 7h16v2H4z" />
                  </svg>
                </div>
                <div className="flex flex-col flex-grow p-4">
                  <a
                    href="/owner/payments"
                    target="_self"
                    rel="noopener"
                    className="text-blue-600"
                  >
                    <span className="sr-only">
                      Pagos y Facturación
                    </span>
                  </a>
                  <div className="mb-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Pagos y Facturación
                    </h2>
                    <div className="text-sm text-gray-500">
                      Revisa tus ingresos y facturación
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-4" aria-hidden="true">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    aria-describedby="chevron_right-description"
                    role="img"
                    viewBox="0 0 24 24"
                  >
                    <desc id="chevron_right-description">chevron</desc>
                    <path d="M10.56 6.146a.5.5 0 0 0-.706 0l-.708.708a.5.5 0 0 0 0 .707L13.586 12l-4.44 4.44a.5.5 0 0 0 0 .706l.708.708a.5.5 0 0 0 .707 0l5.146-5.147a1 1 0 0 0 0-1.414l-5.146-5.147z" />
                  </svg>
                </div>
              </div>

              {/* Tarjeta: Opiniones y Sugerencias */}
              <div className="flex bg-white rounded-lg shadow hover:border-2 hover:border-secondary">
                <div className="flex items-center p-4" aria-hidden="true">
                  <svg
                    className="w-6 h-6"
                    aria-describedby="reviews-description"
                    role="img"
                    viewBox="0 0 24 24"
                  >
                    <desc id="reviews-description">
                      Opiniones y Sugerencias
                    </desc>
                    <path d="M8 10h8v8H8z" />
                  </svg>
                </div>
                <div className="flex flex-col flex-grow p-4">
                  <a
                    href="/owner/reviews"
                    target="_self"
                    rel="noopener"
                    className="text-blue-600"
                  >
                    <span className="sr-only">
                      Opiniones y Sugerencias
                    </span>
                  </a>
                  <div className="mb-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Opiniones y Sugerencias
                    </h2>
                    <div className="text-sm text-gray-500">
                      Lee y comparte comentarios sobre tus propiedades
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-4" aria-hidden="true">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    aria-describedby="chevron_right-description"
                    role="img"
                    viewBox="0 0 24 24"
                  >
                    <desc id="chevron_right-description">chevron</desc>
                    <path d="M10.56 6.146a.5.5 0 0 0-.706 0l-.708.708a.5.5 0 0 0 0 .707L13.586 12l-4.44 4.44a.5.5 0 0 0 0 .706l.708.708a.5.5 0 0 0 .707 0l5.146-5.147a1 1 0 0 0 0-1.414l-5.146-5.147z" />
                  </svg>
                </div>
              </div>

              {/* Tarjeta: Configuración (seleccionada) */}
              <div className="flex bg-white rounded-lg shadow hover:border-2 hover:border-secondary border-2 border-blue-500">
                <div className="flex items-center p-4" aria-hidden="true">
                  <svg
                    className="w-6 h-6"
                    aria-describedby="settings-description"
                    role="img"
                    viewBox="0 0 24 24"
                  >
                    <desc id="settings-description">Configuración</desc>
                    <path
                      d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                    <path
                      d="M9.728 2.262a1 1 0 0 0-.738.715l-.438 1.636a1 1 0 0 1-1.225.707l-1.625-.435a1 1 0 0 0-.988.281 10.026 10.026 0 0 0-2.282 3.93 1 1 0 0 0 .25 1c.427.428.82.804 1.211 1.212a1 1 0 0 1-.014 1.4l-1.197 1.196a1 1 0 0 0-.25 1 10.026 10.026 0 0 0 2.282 3.93 1 1 0 0 0 .988.281l1.625-.435a1 1 0 0 1 1.225.707l.438 1.636a1 1 0 0 0 .738.715 9.99 9.99 0 0 0 4.544 0 1 1 0 0 0 .738-.715l.438-1.636a1 1 0 0 1 1.225-.707l1.625.435a1 1 0 0 0 .988-.281 10.024 10.024 0 0 0 2.282-3.93 1 1 0 0 0-.25-1l-1.197-1.197a1 1 0 0 1 0-1.414l1.198-1.197a1 1 0 0 0 .249-1 10.026 10.026 0 0 0-2.282-3.93 1 1 0 0 0-.988-.281l-1.625.435a1 1 0 0 1-1.225-.707l-.438-1.636a1 1 0 0 0-.738-.715 9.992 9.992 0 0 0-4.544 0zm.756 2.869.277-1.034a8.109 8.109 0 0 1 2.478 0l.277 1.034a3 3 0 0 0 3.675 2.121l1.023-.274a8.03 8.03 0 0 1 1.248 2.146l-.755.755a3 3 0 0 0 0 4.242l.755.755a8.025 8.025 0 0 1-1.248 2.146l-1.023-.274a3 3 0 0 0-3.674 2.121l-.278 1.035a8.11 8.11 0 0 1-2.478 0l-.277-1.035a3 3 0 0 0-3.675-2.121l-1.023.274a8.027 8.027 0 0 1-1.248-2.146l.755-.755a3 3 0 0 0 .043-4.199c-.26-.27-.532-.54-.797-.801a8.028 8.028 0 0 1 1.247-2.143l1.023.274a3 3 0 0 0 3.675-2.121z"
                    />
                    <path
                      d="M10.56 6.146a.5.5 0 0 0-.706 0l-.708.708a.5.5 0 0 0 0 .707L13.586 12l-4.44 4.44a.5.5 0 0 0 0 .706l.708.708a.5.5 0 0 0 .707 0l5.146-5.147a1 1 0 0 0 0-1.414l-5.146-5.147z"
                    />
                  </svg>
                </div>
              </div>

              {/* Tarjeta: Ayuda y Soporte */}
              <div className="flex bg-white rounded-lg shadow hover:border-2 hover:border-secondary">
                <div className="flex items-center p-4" aria-hidden="true">
                  <svg
                    className="w-6 h-6"
                    aria-describedby="support-description"
                    role="img"
                    viewBox="0 0 24 24"
                  >
                    <desc id="support-description">Ayuda y Soporte</desc>
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="M10 8h4v4h-4z" />
                  </svg>
                </div>
                <div className="flex flex-col flex-grow p-4">
                  <a
                    href="/owner/support"
                    target="_self"
                    rel="noopener"
                    className="text-blue-600"
                  >
                    <span className="sr-only">Ayuda y Soporte</span>
                  </a>
                  <div className="mb-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Ayuda y Soporte
                    </h2>
                    <div className="text-sm text-gray-500">
                      Contacta a nuestro equipo para asistencia
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-4" aria-hidden="true">
                  <svg
                    className="w-5 h-5 text-gray-400"
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

            {/* Botón de Cerrar sesión */}
            <div className="flex flex-col items-center py-6">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>

        {/* Contenedor para verificación móvil (vacío en este ejemplo) */}
        <div id="mobile-verification-container">
          <div id="universal-profile-mobile-verification"></div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
