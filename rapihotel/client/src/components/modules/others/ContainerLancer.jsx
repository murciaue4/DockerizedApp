import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import DefaultIcon from "../../../static/IconServices/defaultIcon.svg";

const CodeLauncher = ({
  title = "Mostrar Código",
  subTitle = "Default Subtitle",
  children = null,
  borderColor = "border-gray-400",
  bg = "bg-white",
  textColor = "text-text-primary",
  urlIcon = DefaultIcon,
  justify = "justify-center",
  space = 4,
  onToggle,
  className = "",
}) => {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = useCallback(() => {
    setShowContent((prev) => {
      const newValue = !prev;
      if (onToggle && typeof onToggle === "function") {
        onToggle(newValue);
      }
      return newValue;
    });
  }, [onToggle]);

  // Soporte de accesibilidad para teclado: permite activar con Enter o Space
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleContent();
    }
  };

  return (
    <div className={`relative ${className} w-full`}>
      {/* Vista del lanzador cuando el contenido está oculto */}
      {!showContent && (
        <div
          className={`overflow-hidden flex flex-row items-center w-full max-w-screen-sm h-14 border-2 rounded-xl ${borderColor} ${bg} cursor-pointer`}
          onClick={toggleContent}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-expanded={showContent}
        >
          <div className="flex justify-center items-center h-full w-14 overflow-hidden">
            <img src={urlIcon} alt="Icon" className="object-cover max-h-6" />
          </div>
          <div className={`h-full w-full flex flex-row ${justify} items-center space-x-${space}`}>
            <div className="flex flex-col items-center">
              <span className={`block text-sm font-bold ${textColor}`}>
                {title}
              </span>
              <button
                type="button"
                aria-roledescription="expand to change the number of guests"
                data-stid="open-room-picker"
                aria-label={subTitle}
                className="w-full text-nowrap py-1 rounded-md text-left text-xs"
              >
                {subTitle}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Contenido mostrado al hacer clic */}
      {showContent && (
        <div className="mt-2 relative">
          <div className=" py-4 rounded-lg border">
            <button
              className=" flex justify-center items-center w-8 h-8 rounded-full mx-4 bg-red-500 text-white font-bold"
              onClick={toggleContent}
            >
            X
            </button>
            {children || <p>Este es el contenido</p>}
          </div>
        </div>
      )}
    </div>
  );
};

CodeLauncher.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  children: PropTypes.node,
  borderColor: PropTypes.string,
  bg: PropTypes.string,
  textColor: PropTypes.string,
  urlIcon: PropTypes.string,
  justify: PropTypes.string,
  space: PropTypes.number,
  onToggle: PropTypes.func,
  className: PropTypes.string,
};

export default React.memo(CodeLauncher);
