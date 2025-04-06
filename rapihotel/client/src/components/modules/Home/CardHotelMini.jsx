import { useContext } from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "../../../static/iconFovorite.svg";
import arrowToggleIcon from "../../../static/arrowToggle.svg";
import locationIcon from "../../../static/locationIcon.svg";
import isFavoriteIcon from "../../../static/iconFavorite2.svg";
import { loginContext } from "../../../context/loginContext";
import ServicesMiniSectionCardHotel from "../Hoteles/ServicesMiniSectionCardHotel";
import { acortarTexto, getRateColor, capitalizeWords } from "../../../helpers/index";
import RateIndicator from "../Hoteles/RateIndicator";
import { Chip } from "@heroui/react";

const HotelCard = ({ hotel }) => {
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
    handleSetFavouriteClick,
    handleSetShowAlert,
  } = useContext(loginContext);

  // Cálculo de la habitación más barata
  // Se toma en cuenta el precio final (precio con descuento, si aplica)
  const cheapestRoom = rooms.reduce((prev, current) => {
    const prevFinal = prev.discount && prev.discount > 0 
      ? prev.price * (1 - prev.discount / 100) 
      : prev.price;
    const currentFinal = current.discount && current.discount > 0 
      ? current.price * (1 - current.discount / 100) 
      : current.price;
    return currentFinal < prevFinal ? current : prev;
  }, rooms[0]);

  const finalPrice =
    cheapestRoom.discount && cheapestRoom.discount > 0
      ? cheapestRoom.price * (1 - cheapestRoom.discount / 100)
      : cheapestRoom.price;

  return (
    <section
      className={`flex flex-col w-64 h-auto items-center justify-center bg-background shadow-none  mb-6 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-100 cursor-pointer`}
    >
      <Link
        to={`/hoteles/${id}`}
        onClick={() => {

          handleSetShowAlert(false);
          scrollTo(0, 0);
        }}
        className="w-full h-full"
      >
        <div className="font-sans w-full max-w-screen-lg h-auto flex flex-col rounded-xl">
          <div className="max-h-full w-full relative">
            <div className="absolute top-0 left-0 flex flex-col items-start justify-start p-2 space-y-1 z-10">
              {cheapestRoom.discount && cheapestRoom.discount > 0 && (
                <Chip color="danger">
                  <span className="hidden sm:inline">Hasta</span>{" "}
                  <span>{`${cheapestRoom.discount}% OFF`}</span>
                </Chip>
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

          <div className="p-0 w-full flex flex-col">
            <div className="py-1 px-3 h-full w-full">
              <section className="m-0 flex justify-between cursor-pointer">
                <h1 className="m-0 font-bold text-primary text-lg">
                  {capitalizeWords(name)}
                </h1>
                <div onClick={handleSetFavouriteClick}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
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
                      alt="Favorito"
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
                <h3 className="text-secondary">
                  {capitalizeWords(location.sector)}
                </h3>
                <img src={locationIcon} alt="Ubicación" className="w-4 h-4 mr-1" />
              </section>
              <section className="pb-5 m-0 flex justify-between cursor-pointer w-full">
                <p className="text-sm text-text-secondary">
                  {acortarTexto(descripcion, 100, true)}
                </p>
              </section>
              <section className="hidden pb-2 m-0 sm:flex justify-between cursor-pointer hover:bg-background">
                <button className="text-text-secondary">Ver más</button>
                <img src={arrowToggleIcon} alt="Ver más" className="w-4 h-4 mr-1" />
              </section>
            </div>

            <div className="flex flex-col items-end justify-between py-2 px-3 w-full h-full bg-background sm:bg-background">
              {/* Sección de calificación y servicios */}
              <div className="flex flex-col-reverse justify-between bg-background rounded-xl h-full w-full">
                <RateIndicator
                  avg_rating={avg_rating}
                  total_ratings={total_ratings}
                />
                <div className="w-full h-full flex flex-col justify-center items-center bg-background rounded-xl p-1">
                  <ServicesMiniSectionCardHotel hotel={hotel} />
                </div>
              </div>
              {/* Sección de precios más bajo */}
              <div className=" text-right w-full h-full flex flex-col justify-center items-right bg-background rounded-xl p-1">
              <span className={`text-xs  ${cheapestRoom.discount && cheapestRoom.discount > 0 ? "hidden" : ""

              }`}>Precios desde</span>
                <div
                  className={`text-2xl ${
                    cheapestRoom.discount && cheapestRoom.discount > 0
                      ? "text-red-500 line-through text-sm"
                      : "text-text-primary font-semibold"
                  }`}
                >
                    
                  ${cheapestRoom.price.toLocaleString()}
                </div>
                {cheapestRoom.discount && cheapestRoom.discount > 0 && (
                  <>
                    <div className="text-2xl font-bold text-green-500">
                    ${finalPrice > 0 ? finalPrice.toLocaleString() : ""}
                    </div>
                  </>
                )|| null}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default HotelCard;
