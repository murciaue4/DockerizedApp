import React from "react";

const ActionCard = ({
  icon,
  title,
  onClick,
  ariaLabel = title,
  chevronIcon,
}) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow relative">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="flex-grow">
          <div className="font-medium text-gray-800">{title}</div>
        </div>
        <div className="flex items-center">
          {chevronIcon || (
            <svg
              className="w-6 h-6 text-gray-500"
              aria-hidden="true"
              role="img"
              viewBox="0 0 24 24"
            >
              <desc>chevron</desc>
              <path d="M10.56 6.146a.5.5 0 00-.706 0l-.708.708a.5.5 0 000 .707L13.586 12l-4.44 4.44a.5.5 0 000 .706l.708.708a.5.5 0 00.707 0l5.146-5.147a1 1 0 000-1.414l-5.146-5.147z" />
            </svg>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={onClick}
        className="absolute inset-0"
        aria-label={ariaLabel}
      ></button>
    </div>
  );
};

export default ActionCard;
