import React from "react";
import arrowBackIcon from "../../../static/arrowIconBlack.svg";


const ButtonBack = ({ onClick, zIndex='z-10' }) => {
  return (
    <button
      className={`${zIndex} w-9 h-9 flex justify-center items-center absolute left-4 top-4 opacity-80  bg-white rounded-full`}
      onClick={onClick}
    >
      <img
        className="h-9 w-9 border rounded-full shadow-lg p-1"
        src={arrowBackIcon}
        alt=""
      />
    </button>
  );
};

export default ButtonBack;
