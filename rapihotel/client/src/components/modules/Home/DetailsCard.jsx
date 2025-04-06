import React, { useState } from "react";
import shareIcon from "../../../static/share-icon.svg";
import shareIconWhite from "../../../static/shareIconWhite.svg";
import InfoDetails from "./InfoDetails";
import PhotosDetails from "./PhotosDetails";
import ComentsDetails from "./ComentsDetails";
import PricesDetails from "./PriceDetails";

const DetailCard = ({ onClose, hotel, currentSection }) => {
  const [showInfo, setShowInfo] = useState(currentSection==='' && true || false);
  const [showPhotos, setShowPhotos] = useState( currentSection==='photos' && true || false);
  const [showComments, setShowComments] = useState(currentSection==='comments' && true || false);
  const [showPrices, setShowPrices] = useState(currentSection==='prices' && true || false);






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



  return (
    <div className={`z-10 flex justify-center w-full max-w-screen-lg h-auto mb-40 rounded-b-2xl border border-primary shadow-border-blur bg-indigo-100 `}>
      <div className={`w-full `}>
        <section className="Nav-Details h-14 bg-primary flex justify-between items-center font-bold text-white text-sm">
          <div className=" h-full w-36 hidden sm:grid content-center ">
            <button className="px-3 flex items-center  text-accent ">
              <img className="  h-4 w-4 mr-2 " src={shareIcon} alt="" />
              <p className="">Compartir</p>
            </button>
          </div>
          <div className="h-full w-full  flex justify-evenly items-center">
            <button
              onClick={handleShowInfo}
              className={` w-full  ${
                showInfo ? "border-b-4 border-b-accent text-accent " : ""
              } px-2 h-full  hover:border-b-4 border-b-accent hover:text-accent`}
            >
              Info
            </button>
            <button
              onClick={handleShowPhotos}
              className={` w-full ${
                showPhotos ? "border-b-4 border-b-accent text-accent " : ""
              } px-2 h-full  hover:border-b-4 border-b-accent hover:text-accent`}
            >
              Fotos 
            </button>
            <button
              onClick={handleShowComments}
              className={`w-full  ${
                showComments ? "border-b-4 border-b-accent text-accent " : ""
              } px-2 h-full  hover:border-b-4 border-b-accent hover:text-accent`}
            >
              Comentarios
            </button>
            <button
              onClick={handleShowPrices}
              className={` w-full ${
                showPrices ? "border-b-4 border-b-accent text-accent " : ""
              } px-2 h-full  hover:border-b-4 border-b-accent hover:text-accent`}
            >
              Habitaciones
            </button>
          </div>
          <div className=" h-full w-32 hidden sm:grid content-center">
            <button
              onClick={() => {
                onClose();
              }}
            >
             <span className="text-accent">Cerrar</span>
            </button>
          </div>
        </section>
        <section className="Details-container bg-background h-auto w-full border border-t-stone-700">
          <div className="my-14 px-1">
            {!showInfo ? null : <InfoDetails hotel={hotel} />}
            {!showPhotos ? null : <PhotosDetails imagesHotel={hotel.images} />}
            {!showComments ? null : <ComentsDetails hotel={hotel} />}
            {!showPrices ? null : <PricesDetails hotel={hotel} />}
          </div>
        </section>
        <section className="footer-details h-14 bg-primary flex justify-between items-center font-bold text-text-secondary  px-3 rounded-b-2xl">
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
  );
};

export default DetailCard;
