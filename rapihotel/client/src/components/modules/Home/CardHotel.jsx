import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from "../../../static/iconFovorite.svg";
import arrowToggleIcon from "../../../static/arrowToggle.svg";
import locationIcon from "../../../static/locationIcon.svg";
import isFavoriteIcon from "../../../static/iconFavorite2.svg";
import { loginContext } from "../../../context/loginContext";
import ServicesMiniSectionCardHotel from "../Hoteles/ServicesMiniSectionCardHotel";
import {
  acortarTexto,
  getRateColor,
  capitalizeWords,
} from "../../../helpers/index";
import RateIndicator from "../Hoteles/RateIndicator";
import { Chip } from "@heroui/react";
import AlertLogUp from "../alerts/AlertLogUp";


const HotelCard = ({ hotel }) => {
  const [haveDiscount, setHaveDiscount] = useState(false);



  const {
    id,
    name,
    descripcion,
    avg_rating,
    total_ratings,
    images,
    location,
    type,
    services,
    rooms,
  } = hotel;

  const {
    isLogin,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    showAlertLogUp,
    handleSetFavouriteClick,
    handleSetShowAlert,
    filters,
  } = useContext(loginContext);
  //complicandome la vida xd
 
  useEffect(() => {
    let rrrooommmsss = rooms.map((room) => room.discount);
    let res = rrrooommmsss.filter((acc, curr) => acc > curr, 0);
    console.log("res", res[0]);
    setHaveDiscount(res[0]);
  }, [hotel]);
  //
  return (
    <li
      className={`flex border border-borderr flex-col items-center justify-center bg-background shadow-border-blur  mb-6 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-100  cursor-pointer`}
    >
      <Link
        to={`/hoteles/${id}`}
        onClick={() => {
          handleSetShowAlert(false);
          scrollTo(0, 0);
        }}
        className="w-full h-full"
      >
        <div
          className={`font-sans w-full max-w-screen-lg  h-auto sm:h-72  flex max-xs:flex-col rounded-xl"
             `}
        >
          <div className="w-2/6  max-h-full max-xs:w-full relative ">
            <div className="absolute top-0 left-0  flex flex-col items-start justify-start p-2 space-y-1">
              {haveDiscount  && (
                <Chip color="danger"><span className="hidden sm:inline">Hsta</span> <span>{`${haveDiscount+'%' + ' ' + 'OFF'}`}</span></Chip>
              )}
            </div>
            <button className="w-full h-full">
              <img
                className="w-full h-full object-cover aspect-video rounded-bl-md rounded-tl-md"
                src={`${images[0]?.url}`}
                alt={`${name} - Imagen`}
              />
            </button>
          </div>
          <div className="p-0 w-4/6 flex flex-col sm:flex-row justify-center sm:justify-around  max-sm:w-full">
            <div className="py-1 px-3 md:p-4  h-full w-full sm:w-1/2">
              <section className="m-0 flex justify-between cursor-pointer">
                <h1 className="m-0 font-bold text-text-primary text-lg">
                  {capitalizeWords(name)}
                </h1>
                <div onClick={handleSetFavouriteClick}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      !isLogin && handleSetShowAlert(true)
                       
                     
                      e.preventDefault(); // Previene la navegación del Link
                      isLogin && isFavorite(id)
                        ? removeFromFavorites(id)
                        : addToFavorites(id);
                    }}
                  >
                    <img
                      src={
                        isLogin && isFavorite(id)
                          ? isFavoriteIcon
                          : FavoriteIcon
                      }
                      alt="<3"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </section>
              <section className="pb-2 font-semibold m-0 flex justify-between cursor-pointer">
                <h4 className="text-accent font-semibold">
                  {capitalizeWords(type)}
                </h4>
              </section>
              <section className="pb-5 m-0 flex justify-between cursor-pointer">
                <h3 className="text-text-secondary text-sm">
                  {capitalizeWords(location.sector)}
                </h3>
                <img src={locationIcon} alt="*" className="w-4 h-4 mr-1" />
              </section>

              <section className="pb-5 m-0 flex justify-between cursor-pointer">
                <p className="text-sm text-text-secondary">
                  {acortarTexto(descripcion, 100, true)}
                </p>
              </section>
              <section className="hidden pb-2 m-0 sm:flex justify-between cursor-pointer hover:bg-background">
                <button className="text-text-secondary">Ver mas</button>
                <img
                  src={arrowToggleIcon}
                  alt="*"
                  className={`w-4 h-4 mr-1`}
                />
              </section>
            </div>

            <div className="flex flex-row items-end max-md:space-x-2 sm:flex-col justify-between py-2 px-3 w-full sm:w-1/2 h-full bg-background sm:bg-background">
              {/* seccion de calificacion*/}
              <div className="flex flex-col-reverse sm:flex-col justify-between sm:mb-2 bg-background rounded-xl h-full w-full">
                <RateIndicator
                  avg_rating={avg_rating}
                  total_ratings={total_ratings}
                />
                <div className="w-full h-full flex flex-col justify-center items-center bg-background rounded-xl p-1">
                  <ServicesMiniSectionCardHotel hotel={hotel} />
                </div>
              </div>
              {/* seccion BOTON  */}
              <div className="flex flex-col w-full justify-start items-center bg-background rounded-xl h-auto">
                <button className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-xl sm:rounded-r-xl w-full h-10 flex flex-col justify-center align-end">
                  {`Habitaciones`}
                </button>

                <span className="text-primary text-center text-sm">{`${hotel.availableRooms} disponibles`}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      {showAlertLogUp && (
        <AlertLogUp
          onClose={() => handleSetShowAlert(false)}
        />
      )}
     
    </li>
  );
};

export default HotelCard;
