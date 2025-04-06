import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { loginContext } from "../../../context/loginContext";
import rotateICon from "../../../static/rotateIcon-16.svg";
import zoomInIcon from "../../../static/zoomIn-18.svg";
import zoomOutICon from "../../../static/zoomOut-17.svg";
import Alert from "../alerts/AlertStandard";

const ProfilePictureModal = ({ isOpen, onClose, onUpload }) => {
  const {
    token,
    user,
    imageChanged,
    setImageChanged,
    URLStatic,
    imgUser, // Imagen previa desde el contexto
  } = useContext(loginContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Ref para el input file oculto
  const fileInputRef = useRef(null);
   
  // Actualiza la vista previa si ya existe una imagen
  useEffect(() => {
    if (imgUser) {
      setImagePreview(imgUser);
    }
  }, [imgUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setUploadError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleRotate = () => setRotationAngle((prev) => prev + 90);
  const handleZoomIn = () => setZoomLevel((prev) => prev + 0.1);
  const handleZoomOut = () =>
    setZoomLevel((prev) => (prev > 0.2 ? prev - 0.1 : prev));

  const handleClear = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setRotationAngle(0);
    setZoomLevel(1);
    setUploadError("");
  };

  const sendImage = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      setUploadError("Por favor, seleccione una imagen antes de guardar.");
      return;
    }
    setIsUploading(true);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      };

      const response = await axios.post(
        `${URLStatic}/user/post_imguser/${user.user_id}`,
        formData,
        config
      );
      console.log("Respuesta de carga de imagen:", response);
      onUpload(selectedImage);
      // Actualiza el estado global para reflejar el cambio sin recargar la página
      setImageChanged(!imageChanged);
      onClose();
    } catch (error) {
      console.error("Error en la carga de la imagen:", error);
      setUploadError("Error al cargar la imagen. Inténtelo de nuevo.");
    } finally {
      setIsUploading(false);
    }
  };

  // Función para disparar el click en el input file oculto
  const handleCustomFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Función para cerrar la alerta
  const closeAlert = () => {
    setUploadError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300">
      {uploadError && (
        <Alert
          AlertTitle="Error"
          AlertString={uploadError}
          AlertType="error"
          onClose={closeAlert}
        />
      )}
      <div className="relative bg-white rounded-xl shadow-2xl p-8 w-96">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl transition"
        >
          &times;
        </button>
        <h2 className="text-center text-2xl font-bold mb-6">
          Editar Imagen de Perfil
        </h2>
        {imagePreview && (
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-60 h-60 rounded-full overflow-hidden border border-gray-200">
              <img
                src={imagePreview}
                alt="Vista previa"
                style={{
                  transform: `rotate(${rotationAngle}deg) scale(${zoomLevel})`,
                }}
                className="w-full h-full object-cover transition-transform duration-300"
              />
            </div>
            <div className="flex mt-4 space-x-4">
              <button type="button" onClick={handleRotate}>
                <img src={rotateICon} alt="Rotar" className="w-6 h-6" />
              </button>
              <button type="button" onClick={handleZoomIn}>
                <img src={zoomInIcon} alt="Zoom In" className="w-6 h-6" />
              </button>
              <button type="button" onClick={handleZoomOut}>
                <img src={zoomOutICon} alt="Zoom Out" className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
        <form onSubmit={sendImage} className="flex flex-col items-center">
          {/* Input file oculto */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          {/* Botón personalizado */}
          <div className="mb-6 w-full">
            <button
              type="button"
              onClick={handleCustomFileClick}
              className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition"
            >
              Seleccionar imagen
            </button>
          </div>
          <div className="flex w-full">
            <button
              type="button"
              onClick={handleClear}
              className="flex-1 py-2 border border-blue-500 rounded-l hover:bg-blue-50 transition"
            >
              Limpiar
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className={`flex-1 py-2 ${
                isUploading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white rounded-r transition`}
            >
              {isUploading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProfilePictureModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
};

export default ProfilePictureModal;

