import { useContext, useEffect, useState } from "react";
import { loginContext } from "../../../context/loginContext";
import StaticMap from "../Maps/StaticMap";
import { capitalizeFirstLetterOfText, capitalizeWords } from "../../../helpers";
import RateIndicator from "./RateIndicator";
import ServicesMiniSection from "./ServicesMiniSection";
import MapModal from "../Maps/MapModal";
import ServicesModal from "./ServicesModal";


import {
  getRateColor,
  getRateColorText,
  getRateText,
} from "../../../helpers/UIHelpers";

import arrowNextIcon from "../../../static/aroowNextIconSecondary.svg";
import adressIcon from "../../../static/adressIconBlack.svg";

const HotelInfo = ({ hotel }) => {
  const { showMapContainer, handleShowMapContainer, servicesIcons } =
    useContext(loginContext);

  const [showMap, setShowMap] = useState(false);
  const handleShowMap = () => {
    setShowMap(!showMap);
  };
  const [showServicesModal, setShowServicesModal] = useState(false);
  const handleShowServicesModal = () => {
    setShowServicesModal(!showServicesModal);
  };

  // console.log("hotelInfo", servicesIcons);

  const horariosDeAtencion = hotel.services.some(
    (servicio) => servicio.id === 1
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const images = document.querySelectorAll("img");
    const loadedImagesRef = new Set();

    const handleImageLoad = (event) => {
      loadedImagesRef.add(event.target);
      if (loadedImagesRef.size === images.length) {
       
          setIsLoading(false);// Espera 1 segundo antes de cambiar el estado
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        handleImageLoad({ target: img });
      } else {
        img.addEventListener("load", handleImageLoad);
        img.addEventListener("error", handleImageLoad);
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageLoad);
      });
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-backgroung z-50">
        <div className="text-xl font-bold text-text-primary">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full  h-auto pt-2 ">
      <div className="w-full h-full">
        <section className="BLOQUE-TITTLE  w-full h-full p-3 flex flex-col items-center">
          {/* title */}
          <div className=" mb-4 w-full  ">
            <h2 className="w-full  text-3xl font-semibold  text-text-primary">
              {capitalizeFirstLetterOfText(hotel.type)}{" "}
              {capitalizeWords(hotel.name)}
            </h2>
            <span className="text-xl font-bold text-text-secondary">
              {capitalizeWords(hotel?.location?.sector)}
            </span>
          </div>

          {/* calificacion */}
          <div className="flex h-full w-full items-start space-x-2 mb-2 ">
            <div className="flex flex-row items-center h-full  w-auto mr-1">
              <RateIndicator
              direction="flex-col"
                avg_rating={hotel.avg_rating}
                total_ratings={hotel.total_ratings}
              />
            </div>

            <div className="w-full h-full flex items-center justify-start ">
              <span
                className={`w-auto h-full font-bold text-2xl  text-text-secondary`}
              >
                {getRateText(hotel.avg_rating, hotel.total_ratings)}
              </span>
            </div>
          </div>
          <div
            className="w-full text-secondary flex items-center mb-2 mt-2 cursor-pointer text-sm  "
           
          >
            <div className="flex items-center hover:border-b-2 border-secondary">
              <span className=" font-semibold mr-2 ">
                Ver todas las opiniones
              </span>
              <img src={arrowNextIcon} className="w-3 h-3 " alt="" />
            </div>
          </div>
        </section>

        <section className=" flex flex-col lg:flex-row w-full  p-3">
          {/* bloque descripcion y servicios */}
          <section className="BLOQUE-DESC-SERV w-full h-auto  lg:p-4  mb-10">
            {/* descripcion */}
            <div className="sm:w-4/6 md:max-w-4/6 lg:w-full">
              <h3 className="mb-4 font-semibold text-xl text-text-secondary p-1">
                Acerca de esta propiedad
              </h3>
              <p className="text-text-secondary text-sm">{hotel.descripcion}</p>
            </div>

            {/* servicios */}
            <div className="flex flex-row flex-wrap mt-6 w-auto py-1 ">
              <ServicesMiniSection hotel={hotel} />
            </div>

            <div
              className="w-full text-secondary flex items-center mb-2 mt-2 cursor-pointer text-sm  "
              onClick={handleShowServicesModal}
            >
              <div className="flex items-center hover:border-b-2 border-secondary" >
                <span className=" font-semibold mr-2 ">
                  Ver más informacion del estapropiedad
                </span>
                <img src={arrowNextIcon} className="w-3 h-3 " alt="" />
              </div>
            </div>
            {showServicesModal && (
              <ServicesModal onClose={handleShowServicesModal} hotel={hotel} />
            )}            
          </section>

          {/* bloque mapa y direcciones */}
          <section className="BLOQUE-UBICA-DIRECC w-full h-auto sm:flex sm:pt-2 lg:flex-col lg:px-4  ">
            {/* mapa */}
            <div className="MAPA w-full sm:rounded-none  overflow-hidden md:w-1/2 lg:w-full ">
              <span className="mb-4 font-semibold text-xl text-text-secondary p-1">
                Ubicacion
              </span>
              <div className="bloque-mmapa w-full border border-borderAlt rounded-2xl"> 
                <div className="mapContainer w-full h-60 bg-emerald-300 rounded-t-2xl m-0 ">
                  {showMap && (
                    <MapModal
                      hotel={hotel}
                      onClose={() => handleShowMap()}
                    />
                  )}
                  {/* <StaticMap
                    onClose={() => handleShowMapContainer(false)}
                    choords={{
                      lat: Number(hotel.location.lat),
                      lng: Number(hotel.location.lng),
                    }}
                    name={hotel.name}
                  /> */}
                  
                </div>
                <div
                  className={`w-full h-9 rounded-b-2xl flex flex-row justify-center items-center cursor-pointer border border-borderr`}
                  onClick={() => handleShowMap()}
                >
                  <span
                    className={`w-full text-center mx-2 text-secondary font-semibold  `}
                  >
                    Ver en el mapa
                  </span>
                </div>
              </div>
            </div>

            {/* direcciones horarios y contacto */}
            <div className="DIRECCIONES p-4  mt-4 md:w-1/2 text-text-primary text-sm sm:text-xs  lg:w-full">
              <section className="flex flex-col mt-2  ">
                <div className="flex items-start mb-4">
                  <img src={adressIcon} alt="ic" className=" w-6 h-6 mr-2" />
                  <span className="">
                    <span>{`${capitalizeFirstLetterOfText(
                      hotel?.location?.directions
                    )}, `}</span>
                    <span>{`${capitalizeFirstLetterOfText(
                      hotel?.location?.barrio
                    )}, `}</span>
                    <span>{`${capitalizeFirstLetterOfText(
                      hotel?.location?.sector
                    )}, `}</span>
                    <span>{`${capitalizeFirstLetterOfText(
                      hotel?.location?.city
                    )}, `}</span>
                    <span>{`${capitalizeFirstLetterOfText(
                      hotel?.location?.country
                    )}`}</span>
                    {`. `}
                  </span>
                </div>
                <div className="flex items-start">
                  <img src={adressIcon} alt="ic" className=" w-6 h-6 mr-2" />
                  <span>{`${hotel.location.indications}`}</span>
                </div>
              </section>
              <section className="flex flex-col mt-2 " id="contacto">
                <strong className="mb-1 text-text-secondary">
                  Horarios de atención
                </strong>
                <span className="text-text-secondary text-sm">
                  {horariosDeAtencion ? (
                    <span>
                      Este hotel cuenta con horarios de atención con estencion
                      las 24 horas del día
                    </span>
                  ) : (
                    ""
                  )}{" "}
                </span>
                <strong className="mb-1 mt-4 text-text-secondary">
                  Check-in / Check-out
                </strong>
                <span className="text-text-secondary text-sm flex flex-col">
                  <span>Horario de check-in: 15:00-cualquier hora del día</span>
                  <span>Check-out exprés</span>
                </span>
              </section>
            </div>
          </section>
        </section>
      </div>
     
    </div>
    // Avenida El Malecón Carrera 1 No. 5 - 82, Bocagrande,
    // 130015, Cartagena, Colombia Teléfono: +57 56657527 | Fax: +57
    // 56657559 | Página web oficial del hotel
  );
};

export default HotelInfo;
