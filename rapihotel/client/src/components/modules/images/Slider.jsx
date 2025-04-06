import React, { useState } from "react";
import arrowBackIcon from "../../../static/Arrow-Back-Icon.svg";
import arrowNextIcon from "../../../static/Arrow-Next-Icon.svg";

const FullScreenPhotos = ({ images, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="fixed  min-h-[320px] w-full inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center rounded-md">
      <button
        className="h-10 w-10 absolute top-4 right-4 text-white text-5xl font-bold hover:text-gray-300"
        onClick={onClose}
      >
        &times;
      </button>
      {images.length > 0 && (
        <img
          className="object-contain w-full h-full max-h-screen max-w-screen "
          src={images[currentIndex].url}
          alt={`Imagen ${currentIndex + 1}`}
        />
      )}
      <button
        className="absolute left-4 top-1/2 bg-black bg-opacity-50 rounded-3xl p-1 hover:opacity-100"
        onClick={prevSlide}
      >
        <img className="h-6 w-6 opacity-50 hover:opacity-100" src={arrowBackIcon} alt="Previous" />
      </button>
      <button
        className="absolute right-4 top-1/2 bg-black bg-opacity-50 rounded-3xl p-1 hover:opacity-100"
        onClick={nextSlide}
      >
        <img className="h-6 w-6 opacity-50 hover:opacity-100" src={arrowNextIcon} alt="Next" />
      </button>
    </div>
  );
};

export default FullScreenPhotos;
