import React from "react";

const MessagesSheet = () => {
  return (
    <section
      tabIndex="-1"
      role="dialog"
      aria-label=""
      className="min-h-screen flex flex-col bg-gray-50"
    >
      {/* Invisible focus traps */}
      <div tabIndex="0" aria-hidden="true"></div>

      {/* Toolbar */}
      <div
        id="universal-profile-content-tolbar"
        className="flex items-center justify-between p-4 border-b border-gray-200"
      >
        <button
          type="button"
          className="p-2 text-gray-600 hover:text-gray-800"
          data-testid="egds-toolbar-button"
          aria-label="Volver"
        >
          <span className="flex items-center">
            <svg
              className="w-6 h-6"
              aria-label="Volver"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Volver</title>
              <path d="M10.793 5a.5.5 0 0 0-.354.146l-6.146 6.147a1 1 0 0 0 0 1.414l6.146 6.147a.5.5 0 0 0 .354.146h1.914c.258 0 .385-.322.207-.5l-5.5-5.5H19.5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H7.414l5.502-5.502c.175-.18.047-.498-.209-.498h-1.914z" />
            </svg>
          </span>
        </button>
        <div className="flex-grow text-center">
          <h1 className="text-xl font-bold">Mensajes</h1>
        </div>
        {/* Placeholder for right side spacing */}
        <div className="w-10"></div>
      </div>

      {/* Sheet Content */}
      <div className="flex-grow p-6 overflow-auto">
        <div id="communications-content">
          <div
            role="main"
            className="space-y-6 p-6 bg-white rounded-lg shadow"
          >
            {/* First Notification Card */}
            <div id="brand-list-content">
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-gray-700">
                    Controla las notificaciones que deseas recibir de nuestra
                    familia de marcas.
                  </p>
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <img
                        src="https://a.travel-assets.com/egds/marks/onekey__hotels__spanish.svg"
                        alt="Logo de Hoteles.com"
                        className="w-12 h-12 object-contain"
                        id="hotels.com"
                      />
                    </div>
                    <div>
                      <svg
                        className="w-6 h-6 text-gray-500"
                        aria-hidden="true"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <desc>chevron</desc>
                        <path d="M10.56 6.146a.5.5 0 0 0-.706 0l-.708.708a.5.5 0 0 0 0 .707L13.586 12l-4.44 4.44a.5.5 0 0 0 0 .706l.708.708a.5.5 0 0 0 .707 0l5.146-5.147a1 1 0 0 0 0-1.414l-5.146-5.147z" />
                      </svg>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full text-left text-blue-600 hover:underline"
                  >
                    {/* Visually hidden text if needed */}
                    <span className="sr-only"></span>
                  </button>
                </div>

                {/* Second Notification Card */}
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-gray-700">
                    Elige cómo deseas que te notifiquemos de las actualizaciones
                    de tu cuenta y de tus recompensas.
                  </p>
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex flex-col">
                      <span className="text-base font-medium text-gray-800">
                        Ayuda con la cuenta
                      </span>
                      <span className="text-sm text-gray-600 truncate">
                        Correo electrónico
                      </span>
                    </div>
                    <div>
                      <svg
                        className="w-6 h-6 text-gray-500"
                        aria-hidden="true"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <desc>chevron</desc>
                        <path d="M10.56 6.146a.5.5 0 0 0-.706 0l-.708.708a.5.5 0 0 0 0 .707L13.586 12l-4.44 4.44a.5.5 0 0 0 0 .706l.708.708a.5.5 0 0 0 .707 0l5.146-5.147a1 1 0 0 0 0-1.414l-5.146-5.147z" />
                      </svg>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full text-left text-blue-600 hover:underline"
                  >
                    <span className="sr-only">Correo electrónico</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invisible focus trap */}
      <div tabIndex="0" aria-hidden="true"></div>
    </section>
  );
};

export default MessagesSheet;
