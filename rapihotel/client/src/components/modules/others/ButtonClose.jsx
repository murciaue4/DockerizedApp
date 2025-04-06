import React from "react";
import closeIcon from "../../../static/close-Icon.svg";

const ButtonClose = ({ onClose }) => {
  return (
    <div className="flex justify-center items-center w-5 h-5 my-5 ml-5">
      <button onClick={onClose}>
        <img src={closeIcon} alt="" />
      </button>
    </div>
  );
};

export default ButtonClose;
