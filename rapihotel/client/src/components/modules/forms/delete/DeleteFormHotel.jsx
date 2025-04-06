import React, { useState } from "react";

const DeleteHotelSection = ({ onDelete, onClose }) => {
  const [confirmationText, setConfirmationText] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = () => {
    if (!isChecked) {
      setError("Debes aceptar que se borrará permanentemente.");
      return;
    }
    if (confirmationText.trim().toLowerCase() !== "eliminar permanentemente") {
      setError("Debes escribir 'eliminar permanentemente' para confirmar.");
      return;
    }
    onDelete();
  };

  return (
    <section className="w-full h-auto bg-gradient-to-r  from-red-500  to-primary  p-6 flex flex-col justify-center items-center rounded-2xl shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-4">Eliminar Hotel</h3>
      <p className="text-white mb-6 text-center text-xl">
        Para eliminar el hotel, escribe{" "}
        <span className="font-bold italic">eliminar permanentemente</span> en el
        campo de confirmación y acepta que se borrará permanentemente.
      </p>
      <input
        type="text"
        value={confirmationText}
        onChange={(e) => {
          setConfirmationText(e.target.value);
          setError("");
        }}
        className="p-3  rounded-xl w-full max-w-md mb-4 bg-white/80 placeholder:italic text-gray-800 focus:outline-none focus:ring-2 focus:ring-text-secondary"
        placeholder="eliminar permanentemente"
      />
      <label className="w-full max-w-md flex items-center p-2 mb-8">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(e.target.checked);
            setError("");
          }}
          className="mr-2"
        />
        <span className="text-white font-medium">
          Acepto que se borrará permanentemente
        </span>
      </label>
      {error && <span className="text-sm text-white mb-4">{error}</span>}
      <div className="cluster-buttons w-full flex justify-center items-center space-x-10  mb-20 ">
        <button
          onClick={() => onClose(false)}
          className="w-1/2 min-w-[170px] px-4 py-2 bg-white text-red-600 font-bold rounded-sm transition hover:bg-red-100"
        >
          Cancelar
        </button>
        <button
          onClick={handleDelete}
          disabled={
            !(
              isChecked &&
              confirmationText.trim().toLowerCase() ===
                "eliminar permanentemente"
            )
          }
          className="w-1/2 min-w-[170px] px-4 py-2 bg-red-600 text-white rounded-sm disabled:opacity-50 transition hover:bg-red-500"
        >
          Eliminar Hotel
        </button>
      </div>
    </section>
  );
};

export default DeleteHotelSection;
