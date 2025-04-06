import { useContext, useEffect, useState } from "react";
import { loginContext } from "../../../context/loginContext";
import closeIcon from "../../../static/close-Icon.svg";
import iconx from "../../../static/IconServices/Admisión-de-mascotas.svg"; // Ícono por defecto

const ServicesModal = ({ hotel, onClose }) => {
  const { servicesIcons } = useContext(loginContext);
  const [showServices, setShowServices] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  // Mapa de íconos cargados dinámicamente para cada servicio (por id)
  const [iconsMap, setIconsMap] = useState({});

  // Obtener categorías únicas de los servicios del hotel
  const uniqueCategories = [
    ...new Set(hotel?.services?.map((service) => service.category)),
  ];

  // Función asíncrona para cargar dinámicamente el ícono correspondiente a un servicio
  const loadIcons = async () => {
    if (!hotel || !hotel.services) return;
    // Usamos Promise.all para cargar en paralelo
    const promises = hotel.services.map(async (service) => {
      // Buscar el dato del ícono según el id del servicio
      const iconData = servicesIcons.find((icon) => icon.id === service.id);
      // Usar el nombre del ícono si existe y no es "empty.svg"; de lo contrario, default
      let iconFileName =
        iconData && iconData.nombre && iconData.nombre !== "empty.svg"
          ? iconData.nombre
          : "defaultIcon.svg";

      // Asegurarse de que incluya la extensión .svg
      if (!iconFileName.endsWith(".svg")) {
        iconFileName += ".svg";
      }

      try {
        // Resuelve la ruta del archivo utilizando new URL y import.meta.url
        const iconUrl = new URL(
          `../../../static/IconServices/${iconFileName}`,
          import.meta.url
        ).href;
        return { id: service.id, url: iconUrl };
      } catch (error) {
        // En caso de error se usa el ícono por defecto importado de forma estática
        return { id: service.id, url: iconx };
      }
    });
    const resultsArray = await Promise.all(promises);
    const results = {};
    resultsArray.forEach((result) => {
      results[result.id] = result.url;
    });
    setIconsMap(results);
  };

  useEffect(() => {
    loadIcons();
    // Se vuelve a cargar si cambia el hotel o la información de los íconos
  }, [hotel, servicesIcons]);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-full max-w-3xl h-[640px] rounded-3xl p-1 bg-background">
        {/* Botón para cerrar el modal */}
        <div className="flex justify-center items-center w-5 h-5 my-5 ml-5">
          <button onClick={onClose}>
            <img src={closeIcon} alt="Cerrar modal" />
          </button>
        </div>
        <div className="w-full max-w-3xl h-[570px] overflow-y-scroll">
          <section className="flex justify-around items-center mb-10">
            <div
              className={`w-1/2 h-12 flex justify-center items-center font-semibold text-sm hover:text-secondary border-b hover:border-b-2 hover:border-b-primary cursor-pointer ${
                showServices
                  ? "text-secondary border-b-2 border-b-primary"
                  : "text-text-secondary"
              }`}
              onClick={() => {
                setShowServices(true);
                setShowInfo(false);
              }}
            >
              <span>Servicios</span>
            </div>
            <div
              className={`w-1/2 h-12 flex justify-center items-center font-semibold text-sm hover:text-secondary border-b hover:border-b-2 hover:border-b-primary cursor-pointer ${
                showInfo
                  ? "text-secondary border-b-2 border-b-primary"
                  : "text-text-secondary"
              }`}
              onClick={() => {
                setShowServices(false);
                setShowInfo(true);
              }}
            >
              <span>Información</span>
            </div>
          </section>

          {showServices && (
            <div className="w-full mt-4 px-4">
              {uniqueCategories.map((category) => (
                <fieldset
                  key={category}
                  className="mb-12 border border-border p-2 rounded-xl"
                >
                  <legend className="text-lg font-bold text-text-secondary">
                    {category}
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {hotel?.services
                      ?.filter((service) => service.category === category)
                      .map((service) => {
                        // Usamos el icono que se cargó en iconsMap, basado en el id del servicio
                        const iconUrl = iconsMap[service.id] || iconx;
                        return (
                          <label
                            key={service.id}
                            className="flex items-center space-x-3 cursor-pointer font-semibold"
                          >
                            <img
                              src={iconUrl}
                              alt={service.name}
                              className="w-4 h-4"
                            />
                            <span className="text-sm m-0 text-text-secondary font-medium">
                              {service.name}
                            </span>
                          </label>
                        );
                      })}
                  </div>
                </fieldset>
              ))}
            </div>
          )}

          {showInfo && (
            <div className="w-full mt-4 px-4">
              <fieldset className="mb-4 border border-border p-4 rounded-xl">
                <legend className="text-xl font-bold text-text-primary flex items-center gap-2">
                  Descripción
                </legend>
                <div className="grid grid-cols-1 gap-2">
                  <p className="text-sm m-0 text-text-secondary">
                    {hotel?.descripcion}
                  </p>
                </div>
              </fieldset>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesModal;
