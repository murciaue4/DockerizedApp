import React, { useState } from "react";
import DefaultIcon from "../../../static/IconServices/defaultIcon.svg";

const ModalContainer = ({
    borderColor = "border-gray-400",
  children = null,
  title = "Default Title",
  subTitle = "Default Subtitle",
  bg = "bg-white",
  textColor = "text-text-primary",
  urlIcon = DefaultIcon,
  justify = "justify-start",
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleSetShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div
      className={`overflow-hidden flex flex-row items-center ${justify}  w-full max-w-screen-sm h-14 border-2 rounded-xl ${borderColor} ${bg}`}
      onClick={handleSetShowModal}
    >
      {/* Background Overlay */}
      {/* Icon Section */}
      <div className={`h-full w-full flex flex-row ${justify} items-center space-x-4 0`}>
        <div className="flex justify-center items-center h-full w-14 overflow-hidden  ">
          <img src={urlIcon} alt="Icon" className="object-cover max-h-6" />
        </div>
        {/* Title and Subtitle Section */}
        <div className="flex justify-center items-center h-full w-auto overflow-hidden  ">
          <div className="">
            <label
              htmlFor="input-qglfwvy"
              className={`block text-sm font-bold ${textColor} w-full`}
            >
              {title}
            </label>
            <input
              id="input-qglfwvy"
              type="text"
              className="hidden"
              defaultValue="1 persona, 1 habitación"
            />
            <button
              type="button"
              aria-roledescription="expand to change the number of guests"
              data-stid="open-room-picker"
              aria-label="Guests, 2 people, 1 room"
              className="w-auto text-nowrap py-1 rounded-md text-left text-xs"
            >
              {subTitle}
            </button>
          </div>
        </div>
      </div>
      {/* Modal Content */}
      {showModal && (
        <div
          className="absolute inset-0 z-50 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center "
          onClick={(e) => {
            e.stopPropagation();
            handleSetShowModal();
          }}
        >
          <div
            className="bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {children ? children : <p>Este es el contenido del modal.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalContainer;
