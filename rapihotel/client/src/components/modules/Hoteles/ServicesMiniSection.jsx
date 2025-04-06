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
          // Usa new URL para resolver la ruta del archivo
          const iconUrl = new URL(`../../../static/IconServices/${iconFileName}`, import.meta.url).href;
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

  const services = hotel?.services?.slice(0, 6) || [];
  const firstColumn = services.slice(0, 3);
  const secondColumn = services.slice(3, 6);

  return (
    <div className="flex w-full">
      {[firstColumn, secondColumn].map((column, index) => (
        <div key={index} className="w-1/2 flex flex-col space-y-4">
          {column.map((service) => {
            const iconUrl = iconsMap[service.id] || iconx;
            return (
              <div key={service.id} className="flex items-center">
                <img src={iconUrl} alt={service.name} className="w-5 h-5 sm:w-7 sm:h-7 mr-1" />
                <span className="text-xs text-text-secondary font-bold sm:text-sm sm:font-normal sm:text-text-primary">
                  {service.name}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
