import React from "react";

const SecuritySettings = () => {
  return (

      <section
        className="bg-white w-full max-w-3xl mx-4 border"
        tabIndex="-1"
        role="dialog"
        aria-label="Seguridad y configuración"
      >
        {/* Focus Trap */}
        <div tabIndex="0" aria-hidden="true"></div>

        {/* Toolbar */}
        <div
          id="universal-profile-content-tolbar"
          className="flex items-center justify-between p-4 border-b border-gray-200"
        >
          <button
            type="button"
            data-testid="egds-toolbar-button"
            className="p-2 text-gray-600 hover:text-gray-800"
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
          <section className="flex-grow text-center">
            <h1 className="text-xl font-bold">Seguridad y configuración</h1>
          </section>
          {/* Spacer */}
          <div className="w-10"></div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto">
          <div id="settings-content">
            <div
              role="main"
              className="space-y-6 p-6 bg-white rounded-lg shadow"
            >
              <div className="grid gap-6">
                <div id="login-security-account-management">
                  <div className="flex flex-col space-y-12">
                    {/* Login & Security */}
                    <div id="login-information-settings">
                      <h2 className="text-xl font-semibold">
                        Inicio de sesión y seguridad
                      </h2>
                      <div className="text-sm text-gray-600">
                        Cambia tu contraseña y correo electrónico.
                      </div>
                      <div className="flex flex-col gap-4 pt-6">
                        <div className="grid gap-4 max-w-xs">
                          {/* Email Card */}
                          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow relative">
                            <div className="flex">
                              <div className="flex-grow">
                                <div className="font-medium text-gray-800">
                                  Correo electrónico
                                </div>
                                <div className="text-sm text-gray-600 truncate">
                                  gdmp29@gmail.com
                                </div>
                              </div>
                              <div className="flex items-center">
                                <svg
                                  className="w-6 h-6 text-gray-500"
                                  aria-hidden="true"
                                  role="img"
                                  viewBox="0 0 24 24"
                                >
                                  <desc>chevron</desc>
                                  <path d="M10.56 6.146a.5.5 0 0 0-.706 0l-.708.708a.5.5 0 0 0 0 .707L13.586 12l-4.44 4.44a.5.5 0 0 0 0 .706l.708.708a.5.5 0 0 0 .707 0l5.146-5.147a1 1 0 0 0 0-1.414l-5.146-5.147z" />
                                </svg>
                              </div>
                            </div>
                            <a
                              href="/verifyotp?path=CHANGE_EMAIL&redirectTo=/account/settings/change-email"
                              target="_self"
                              rel="noopener"
                              className="absolute inset-0"
                            >
                              <span className="sr-only">
                                Correo electrónico gdmp29@gmail.com
                              </span>
                            </a>
                          </div>
                          {/* Change Password Card */}
                          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow relative">
                            <div className="flex">
                              <div className="flex-grow">
                                <div className="font-medium text-gray-800">
                                  Cambia tu contraseña
                                </div>
                              </div>
                              <div className="flex items-center">
                                <svg
                                  className="w-6 h-6 text-gray-500"
                                  aria-hidden="true"
                                  role="img"
                                  viewBox="0 0 24 24"
                                >
                                  <desc>chevron</desc>
                                  <path d="M10.56 6.146a.5.5 0 0 0-.706 0l-.708.708a.5.5 0 0 0 0 .707L13.586 12l-4.44 4.44a.5.5 0 0 0 0 .706l.708.708a.5.5 0 0 0 .707 0l5.146-5.147a1 1 0 0 0 0-1.414l-5.146-5.147z" />
                                </svg>
                              </div>
                            </div>
                            <a
                              href="/verifyotp?path=CHANGE_PASSWORD&redirectTo=/account/settings"
                              target="_self"
                              rel="noopener"
                              className="absolute inset-0"
                            >
                              <span className="sr-only">
                                Cambia tu contraseña
                              </span>
                            </a>
                          </div>
                       
                        </div>

                        {/* Account Management */}
                        <div id="account-mgmt-settings">
                          <h2 className="text-xl font-semibold">
                            Administración de la cuenta
                          </h2>
                          <div className="text-sm text-gray-600">
                            Al tener control total, puedes eliminar
                            tu cuenta en el momento que desees.
                          </div>
                          <div className="flex flex-col gap-4 pt-6">
                            <a
                              href="/user/delete"
                              className="text-primary font-bold hover:underline"
                              role="link"
                            >
                              Eliminar cuenta
                            </a>
                            <div className="text-sm text-gray-600">
                              Elimina tus datos y cuenta de Hoteles.com de forma
                              permanente.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Trap */}
        <div tabIndex="0" aria-hidden="true"></div>
      </section>
  );
};

export default SecuritySettings;
