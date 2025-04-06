import { useContext, useEffect, useState } from "react";
import { loginContext } from "../../../context/loginContext";
import iconx from "../../../static/IconServices/Admisión-de-mascotas.svg"; // Ícono por defecto

const ServiceList = ({ hotel }) => {
  const { servicesIcons } = useContext(loginContext);
  const [iconsMap, setIconsMap] = useState({});

  useEffect(() => {
    const loadIcons = async () => {
      if (!hotel || !hotel.services) return;

      const promises = hotel.services.map(async (service) => {
        const iconData = servicesIcons.find((icon) => icon.id === service.id);
        let iconFileName =
          iconData && iconData.nombre && iconData.nombre !== "empty.svg"
            ? iconData.nombre
            : "defaultIcon.svg";

        if (!iconFileName.endsWith(".svg")) {
          iconFileName += ".svg";
        }

        try {
          // Resuelve la ruta del archivo utilizando new URL
          const iconUrl = new URL(
            `../../../static/IconServices/${iconFileName}`,
            import.meta.url
          ).href;
          return { id: service.id, url: iconUrl };
        } catch (error) {
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

    loadIcons();
  }, [hotel, servicesIcons]);

  // Definir los IDs especiales
  const specialServiceIds = [2, 3, 28, 25, 26, 27, 29, 30, 31, 32];
  // Filtrar los servicios que cumplan la condición
  const specialServices =
    hotel?.services?.filter((service) =>
      specialServiceIds.includes(service.id)
    ) || [];

  // Si no se encontró ninguno, no se renderiza nada
  if (specialServices.length === 0) return null;

  return (
    <div className="flex w-full flex-col space-y-2 py-2">
      {specialServices.slice(0,3).map((service) => {
        const iconUrl = iconsMap[service.id] || iconx;
        return (
          <div key={service.id} className="flex items-center w-full h-full ">
            <img
              src={iconUrl}
              alt={service.name}
              className="w-4 h-4 mr-1"
            />
            <span className="text-xs text-text-secondary font-bold  sm:font-normal sm:text-text-primary">
              {service.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceList;
