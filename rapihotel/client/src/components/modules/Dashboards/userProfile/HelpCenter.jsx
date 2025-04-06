import React from "react";
import ActionCard from "./ActionCardMenu";

const HelpFeedbackSheet = () => {
  // Funciones para manejar acciones
  const handleChatOpen = () => {
    // Lógica para abrir el chat
    console.log("Abrir chat");
  };

  // Definir los SVGs para cada acción (puedes moverlos a un archivo de utilidades o similar)
  const chatIcon = (
    <svg
      className="w-6 h-6 text-gray-500"
      aria-describedby="chat-description"
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <desc id="chat-description">Abrir chat</desc>
      <path
        fillRule="evenodd"
        d="M4 5a1 1 0 00-1 1v6a1 1 0 001 1h.47a1 1 0 01.997 1.062 17.248 17.248 0 01-.202 1.777 5.01 5.01 0 003.067-2.34A1 1 0 009.197 13H13a1 1 0 001-1V6a1 1 0 00-1-1H4zM1 6a3 3 0 013-3h9a3 3 0 013 3v6a3 3 0 01-3 3H9.745A6.993 6.993 0 014 18a1 1 0 01-.97-1.242l.015-.06c.145-.581.256-1.17.332-1.763A3.001 3.001 0 011 12V6z"
        clipRule="evenodd"
      />
      <path d="M14.803 17H9.17A3.001 3.001 0 0012 19h2.255A6.993 6.993 0 0020 22a1 1 0 00.97-1.242l-.015-.06a15.27 15.27 0 01-.332-1.763A3.001 3.001 0 0023 16v-6a3 3 0 00-3-3h-2v2h2a1 1 0 011 1v6a1 1 0 01-1 1h-.47a1 1 0 00-.997 1.062c.036.595.104 1.188.202 1.777a5.01 5.01 0 01-3.067-2.34 1 1 0 00-.865-.499z" />
    </svg>
  );

  const helpCenterIcon = (
    <svg
      className="w-6 h-6 text-gray-500"
      aria-describedby="help-description"
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <desc id="help-description">Ir al centro de ayuda</desc>
      <path
        fillRule="evenodd"
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM10.489 8.921C10.197 9.146 10 9.475 10 10H8c0-1.132.475-2.052 1.269-2.664C10.032 6.75 11.016 6.5 12 6.5c.984 0 1.968.249 2.731.836C15.525 7.948 16 8.868 16 10c0 .764-.223 1.428-.663 1.955-.428.51-.995.815-1.555 1-.392.13-.556.296-.636.42-.089.139-.146.336-.146.625h-2c0-.54.105-1.15.465-1.708.367-.57.938-.987 1.69-1.236.334-.11.533-.247.648-.384.101-.122.197-.313.197-.672 0-.525-.197-.854-.489-1.079C13.19 8.673 12.673 8.5 12 8.5c-.673 0-1.189.173-1.511.421zM11 16.5a.5.5 0 011-.5h1a.5.5 0 011 .5v1a.5.5 0 01-1 .5h-1a.5.5 0 01-1-.5v-1z"
        clipRule="evenodd"
      />
    </svg>
  );

  const shareFeedbackIcon = (
    <svg
      className="w-6 h-6 text-gray-500"
      aria-hidden="true"
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <desc>Compartir comentarios</desc>
      <path d="M10.56 6.146a.5.5 0 00-.706 0l-.708.708a.5.5 0 000 .707L13.586 12l-4.44 4.44a.5.5 0 000 .706l.708.708a.5.5 0 00.707 0l5.146-5.147a1 1 0 000-1.414l-5.146-5.147z" />
    </svg>
  );

  return (
    <div
      id="app-layer-universal-profile-content"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 "
      aria-hidden="false"
      tabIndex="-1"
    >
      <section
        className="bg-white w-full max-w-3xl mx-4 rounded shadow-lg"
        tabIndex="-1"
        role="dialog"
        aria-label="Ayuda y comentarios"
      >
        {/* Focus Trap */}
        <div tabIndex="0" aria-hidden="true"></div>

        {/* Toolbar */}
        <div
          id="universal-profile-content-tolbar"
          className="flex items-center justify-between p-4 border-b border-gray-200"
          style={{ "--egds-toolbar-page-margin": "var(--spacing__2x)" }}
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
          <section className="flex-grow text-center">
            <h1 className="text-xl font-bold">Ayuda y comentarios</h1>
          </section>
          <div className="w-10"></div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto">
          <div id="help-content">
            <div
              role="main"
              className="space-y-6 p-6 bg-white rounded-lg shadow"
            >
              <div className="grid gap-6">
                {/* Intro Text */}
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-gray-700">
                    ¿Tienes dudas o comentarios? Queremos conocerlos.
                  </p>
                  <div className="grid gap-4 max-w-md">
                    {/* Usando el componente ActionCard */}
                    <ActionCard
                      icon={chatIcon}
                      title="Abrir chat"
                      onClick={handleChatOpen}
                      ariaLabel="Abrir chat"
                    />

                    <ActionCard
                      icon={helpCenterIcon}
                      title="Ir al centro de ayuda"
                      href="https://service.hotels.com/es-cr/"
                      target="_blank"
                      ariaLabel="Ir al centro de ayuda, se abre en una nueva pestaña"
                    />

                    <ActionCard
                      icon={shareFeedbackIcon}
                      title="Compartir comentarios"
                      href="https://www.directword.io/survey/domain=www.hoteles.com/locale=es-cr?duaid=86a79fdf-bb37-4b8d-a6b7-fcaffe143f38&pagename=%2Faccount%2Fhelp&visitortype=logged+in+user&eid=971579529&tuid=1160826091&egUserId=iam%3Aauth%3Auserid%3Aeg%3A67cf6e065fb00f48a88166d2&url=www.hoteles.com%2Faccount%2Fhelp"
                      target="_blank"
                      ariaLabel="Compartir comentarios, se abre en una nueva pestaña"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div id="universal-profile-virtual-agent"></div>
          </div>
        </div>

        {/* Focus Trap */}
        <div tabIndex="0" aria-hidden="true"></div>
      </section>
    </div>
  );
};

export default HelpFeedbackSheet;
