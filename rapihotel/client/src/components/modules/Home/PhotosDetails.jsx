import React, { useEffect, useState } from "react";
import arrowBackIcon from "../../../static/Arrow-Back-Icon.svg";
import arrowNextIcon from "../../../static/Arrow-Next-Icon.svg";
import SliderPhotos from "../images/Slider";
import ButtonImagesLength from "../images/BuutonImagesLength";
const PhotosDetails = ({imagesHotel} ) => {

 


  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    setImages(imagesHotel);
   
  }, []);

  const nextSlide = () => {
    
    setCurrentIndex((prevIndex) =>
      prevIndex === images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full h-full flex flex-row justify-between relative">
      {/* //boton con elnumero de fotos */}
      <ButtonImagesLength imagesHotel={imagesHotel} onClick={ (params) => {
        setShowSlider(true);
      }}/>

      {showSlider && (
        <SliderPhotos
          images={imagesHotel}
          initialIndex={currentIndex}
          onClose={() => setShowSlider(false)}
        />
      )}

      <button
        className={`w-8 h-8 flex justify-center items-center absolute left-4 top-1/2  bg-black bg-opacity-50 rounded-3xl ${
          showSlider ? "hidden" : "" }`}
        onClick={(event) => {
          event.stopPropagation();
          prevSlide();
        }}
      >
        <img
          className="h-8 w-8 rounded-full p-1 opacity-50 hover:opacity-100"
          src={arrowBackIcon}
          alt=""
        />
      </button>


      <div className="w-full max-h-[700px]  object-fill  ">
 
        {images?.length > 0 && (
          <img
            onClick={() => setShowSlider(true)}
            className="object-cover object-center w-full h-full"
            src={`${images[currentIndex].url}`}
            alt={`Imagen ${currentIndex + 1}`}
          />
        )}
      </div>


      <button
        className={`w-8 h-8 flex justify-center items-center absolute right-4 top-1/2  bg-black bg-opacity-50 rounded-3xl ${
          showSlider ? "hidden" : ""}`}
        onClick={(event) => {
          event.stopPropagation();
          nextSlide();
        }}
      >
        <img
          className="h-8 w-8 rounded-full p-1 opacity-50 hover:opacity-100" 
          src={arrowNextIcon}
          alt=""
        />
      </button>
    </div>
  );
};

export default PhotosDetails;
