import React from "react";
import PhotoVisor from "../images/PhotoVisor";

const HotelPhotoVisor = ({ images }) => {
  if (!images || images.length === 0) return null;

  //recargar si imagenes cambia
  React.useEffect(() => {
    const handleResize = () => {
      // Aquí puedes manejar el cambio de tamaño si es necesario
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  return (
    <div className=" h-auto">
      {/* Vista en pantallas menores a sm: solo la imagen grande */}
      <div className="sm:hidden w-full h-full flex justify-center items-center relative ">
        <PhotoVisor imagesHotel={images}/>
      </div>

      {/* Vista en pantallas sm (≥sm hasta md): imagen grande a la izquierda y 2 imágenes pequeñas a la derecha */}
      <div className="hidden sm:flex lg:hidden gap-2">
        {/* Imagen grande */}
        <div className="w-2/3">
          <img
            src={images[0].url}
            alt="Imagen principal"
            className="w-full h-full object-cover aspect-video "
          />
        </div>
        {/* Contenedor de las dos imágenes pequeñas */}
        <div className="w-1/3 flex flex-col gap-2">
          {images[1] && (
            <img
              src={images[1].url}
              alt="Imagen secundaria 1"
              className="w-full h-full object-cover aspect-video "
            />
          )}
          {images[2] && (
            <img
              src={images[2].url}
              alt="Imagen secundaria 2"
              className="w-full h-full object-cover aspect-video "
            />
          )}
        </div>
      </div>

      {/* Vista en pantallas md en adelante: imagen grande a la izquierda y 4 imágenes pequeñas en grilla */}
      <div className="hidden lg:flex gap-2">
        {/* Imagen grande */}
        <div className="w-1/2">
          <img
            src={images[0].url}
            alt="Imagen principal"
            className="w-full h-full object-cover aspect-video "
          />
        </div>
        {/* Grilla para las 4 imágenes pequeñas */}
        <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-2">
          {images[1] && (
            <img
              src={images[1].url}
              alt="Imagen secundaria 1"
              className="w-full h-full object-cover aspect-video "
            />
          )}
          {images[2] && (
            <img
              src={images[2].url}
              alt="Imagen secundaria 2"
              className="w-full h-full object-cover aspect-video "
            />
          )}
          {images[3] && (
            <img
              src={images[3].url}
              alt="Imagen secundaria 3"
              className="w-full h-full object-cover aspect-video "
            />
          )}
          {images[4] && (
            <img
              src={images[4].url}
              alt="Imagen secundaria 4"
              className="w-full h-full object-cover aspect-video "
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelPhotoVisor;
