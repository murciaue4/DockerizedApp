import React, { useEffect, useState, useContext } from "react";
import { loginContext } from "../../../context/loginContext";
import favoriteIconLight from "../../../static/iconFavorite3.svg";
import favoriteIconBold from "../../../static/iconFavorite2.svg";
import shareIcon from "../../../static/share-icon.svg";
import shareIconWhite from "../../../static/shareIconWhite.svg";
import arrowBackIcon from "../../../static/Arrow-Back-Icon.svg";
import HotelInfo from "../Hoteles/HotelInfo";
import HotelPhotoVisor from "../Hoteles/HotelPhotoVisor";
import HotelComments from "../Hoteles/HotelComments";
import SliderCardsHotel from "../Home/SliderCardsHotel";
import ButtonBack from "../others/ButtonBack";
import SearchBooking from "../forms/Booking/SearchBooking";
import HotelPrices from "./HotelPrices";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Hotel = ({ onClose, allHotels, currentSection = "" }) => {
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
  const { id } = useParams();
  const hotel = allHotels?.find((hotel) => hotel.id === Number(id));

  console.log("allllllllll", id);
  const [showInfo, setShowInfo] = useState((hotel && true) || false);
  const [showPhotos, setShowPhotos] = useState(
    (currentSection === "photos" && true) || false
  );
  const [showComments, setShowComments] = useState(
    (currentSection === "comments" && true) || false
  );
  const [showPrices, setShowPrices] = useState(
    (currentSection === "prices" && true) || false
  );

  useEffect(() => {
    if (hotel) {
      setShowInfo(true);
      setShowPhotos(false);
      setShowComments(false);
      setShowPrices(false);
    }
  }, [hotel]);

  const handleShowInfo = () => {
    setShowInfo(true);
    setShowPhotos(false);
    setShowComments(false);
    setShowPrices(false);
  };

  const handleShowPhotos = () => {
    setShowPhotos(true);
    setShowInfo(false);
    setShowComments(false);
    setShowPrices(false);
  };

  const handleShowComments = () => {
    setShowComments(true);
    setShowInfo(false);
    setShowPhotos(false);
    setShowPrices(false);
  };

  const handleShowPrices = () => {
    setShowPrices(true);
    setShowInfo(false);
    setShowPhotos(false);
    setShowComments(false);
  };

  const handleShowCurrentSection = (section) => {
    setLocalCurrentSection(section);
  };

  return (
    <div
      className={`z-10 flex justify-center w-full   h-auto  bg-background relative sm:px-6`}
    >
      {/* botton atras */}
      <Link to="/hoteles" className="sm:hidden flex">
        {" "}
        <ButtonBack />
      </Link>

      <div className="w-full h-full  max-w-screen-lg  ">
        <div className="w-full">
          {/* searchBooking form */}
          <div className="hidden sm:flex w-full my-5">
            <SearchBooking />
          </div>
          {/* //boton para agregar a mismfavoritos y atras */}
          <div className="w-full flex justify-between items-center">
            <div className="hidden sm:flex justify-start items-center ">
              <div className="bg-primary w-6 h-6 z-10 m-2 border flex justify-center items-center rounded-full">
                {" "}
                <img
                  src={arrowBackIcon}
                  alt=""
                  className="w-4 h-4 m-2 flex justify-center items-center"
                />
              </div>
              <Link to="/hoteles" className="flex">
                <span className="text-sm font-semibold text-secondary hover:underline ">
                  Ver otras propiedades
                </span>
              </Link>
            </div>
            <div className=" w-8 h-8 z-10 m-2 sm:p-2 border absolute right-0 top-2 sm:top-0 sm:relative sm:flex justify-center items-center sm:space-x-1 rounded-full bg-white bg-opacity-90 sm:w-auto  ">
              <span className="text-sm hidden sm:flex">Guardar</span>
              <button
                className="flex items-center justify-center  text-accent w-8 h-8 "
                onClick={() =>
                  isLogin && isFavorite(hotel.id)
                    ? removeFromFavorites(hotel.id)
                    : addToFavorites(hotel.id)
                }
              >
                <img
                  className={`w-6 h-6  ${
                    isLogin && isFavorite(hotel?.id) ? "m-1" : "m-1"
                  }`}
                  src={
                    isLogin && isFavorite(hotel?.id)
                      ? favoriteIconBold
                      : favoriteIconLight
                  }
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>

        <div className={`w-full relative`}>
          {/* fotos */}
          {showInfo || showPhotos || showComments || showPrices ? (
            <div className="flex justify-center w-full h-auto">
              <HotelPhotoVisor images={hotel?.images} />
            </div>
          ) : null}

          {/* barra horizontal */}
          <section className="Nav-Details h-12 bg-background flex justify-between items-center font-bold text-text-secondary text-sm border-b">
            <div className="h-full w-16  md:w-40  hidden xs:grid content-center  text-text-secondary hover:border-b-2 border-b-secondary hover:text-white hover:bg-secondary ">
              <button className="px-3 flex items-center ">
                <img className="  h-4 w-4 mr-2 " src={shareIcon} alt="" />
                <p className="hidden md:block">Compartir</p>
              </button>
            </div>

            <div className="h-full w-full  flex justify-evenly items-center">
              <a href="#info" className="w-full h-full">
                <button
                  onClick={handleShowInfo}
                  className={` w-full  ${
                    showInfo
                      ? "border-b-2 border-b-secondary text-secondary "
                      : ""
                  } px-2 h-full  hover:border-b-2 border-b-secondary hover:text-secondary`}
                >
                  Info
                </button>
              </a>
              <a href="#pricess" className="w-full h-full">
                <button
                  // onClick={handleShowPrices}
                  className={` w-full ${
                    showPrices
                      ? "border-b-2 border-b-secondary text-secondary "
                      : ""
                  } px-2 h-full  hover:border-b-2 border-b-secondary hover:text-secondary`}
                >
                  Habitaciones
                </button>
              </a>
              <a href="#comments" className="w-full h-full">
                <button
                  // onClick={handleShowComments}
                  className={`w-full  ${
                    showComments
                      ? "border-b-2 border-b-secondary text-secondary "
                      : ""
                  } px-2 h-full  hover:border-b-2 border-b-secondary hover:text-secondary`}
                >
                  Comentarios
                </button>
              </a>
            </div>
            <div className=" h-full w-32 hidden xs:grid content-center hover:border-b-2 border-b-secondary hover:text-white hover:bg-secondary">
              <button
                onClick={() => {
                  onClose();
                }}
              >
                <span className=" hover:text-white">Cerrar</span>
              </button>
            </div>
          </section>
          {/* seccion actual */}
          <section className="Details-container bg-background h-auto min-h-screen w-full display-flex flex-col items-center justify-center space-y-24">
            <div className={`w-full h-auto  `} id="info">
              {!showInfo ? null : <HotelInfo hotel={hotel} />}
            </div>

            <div id="pricess">
              {showInfo ? <HotelPrices hotel={hotel} /> : null}
            </div>
           
            <div id="comments">
              {showInfo ? <HotelComments hotel={hotel} /> : null}
            </div>
          </section>

          <section className="footer-details h-14 bg-primary flex justify-between items-center font-bold text-text-secondary  px-3 ">
            <div>
              <button className=" flex items-center  text-white ">
                <img className="h-4 w-4 mr-2" src={shareIconWhite} alt="" />
                Compartir{" "}
              </button>
            </div>
            <div>
              <button
                className=" text-alert bg-white h-7 w-16 rounded-md"
                onClick={() => {
                  onClose();
                }}
              >
                Cerrar
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
