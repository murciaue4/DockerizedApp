
import styles from "./AlertStandard.module.css"; // Archivo CSS para animaciones

const Alert = ({ AlertTitle, AlertString, AlertType, onClose }) => {
  let bgColor;

  // Determinar el color de fondo según el tipo de alerta
  switch (AlertType) {
    case "success":
      bgColor = "bg-green-400";
      break;
    case "error":
      bgColor = "bg-red-400";
      break;
    case "warning":
      bgColor = "bg-yellow-400";
      break;
    default:
      bgColor = "bg-gray-400";
      break;
  }

  return (
    <div
      className={`${styles.alertEnter} fixed top-0 inset-x-0 flex items-center justify-center z-50`}
    >
      <div
        className={`${bgColor} relative max-w-md w-full p-4 m-2 h-auto min-h-20 rounded-xl shadow-lg flex items-start text-white `}
      >
        {/* Mensaje de alerta */}
        <div className="w-full">
          <p className="text-xl text-center mb-2 font-semibold w-full">
            {AlertTitle}
          </p>
          <p>{AlertString}</p>
        </div>
        {/* Botón para cerrar */}
        <button
          className="ml-4 text-white text-xl font-bold "
          onClick={() => onClose()}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default Alert;
