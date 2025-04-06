import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginContext } from "../../../../context/loginContext";
import addImageIcon from "../../../../static/addImageIconWhite.svg";

const FormHotel03 = ({ formData: formDataGlobal }) => {
  const [err, setErr] = useState(null);
  const { token, user, URLStatic } = useContext(loginContext);
  const [images, setImages] = useState([]); // Almacena los archivos y las vistas previas
  const navigate = useNavigate();

  const handleChangeImage = (e) => {
    const newFiles = Array.from(e.target.files);
    const newImages = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prevImages) => {
      // Revocar la URL para liberar memoria
      URL.revokeObjectURL(prevImages[index].preview);
      return prevImages.filter((_, i) => i !== index);
    });
  };

  const sendImage = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      setErr("Debes seleccionar al menos una imagen.");
      return;
    }

    const formData = new FormData();
    images.forEach(({ file }) => formData.append("image", file));

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      };

      const response = await axios.post(
        `${URLStatic}/user/upload/${formDataGlobal.id}/${user.user_id}`,
        formData,
        config
      );

      console.log("Response:", response);
      setImages([]); // Limpiar las imágenes después de enviarlas
      navigate("/home"); // Redirigir a la página de inicio
    } catch (error) {
      console.error("Error:", error);
      setErr(error.response?.data?.message || "Error al enviar las imágenes.");
    }
  };

  return (
    <div className="h-full w-full grid place-content-center bg-white min-h-screen ">
      <img src="https://img-aw-hoteles.s3.us-east-2.amazonaws.com/1stock-photo-woman-s-hand-holda-plate-of-instant-buckwheat-with-a-mountain-as-a-backdrop-the-concept-of-1028923954.jpg" alt="imagen" />
      <div className="w-full min-h-screen border border-green-400">
        <h1 className="text-4xl text-center mb-2 font-extrabold">
          <span className="text-blue-400">Imágenes </span>de tu propiedad
          <span className="text-blue-400">...</span>
        </h1>
        <form
          onSubmit={sendImage}
          className="flex flex-col justify-around items-center h-auto w-full"
        >
          <div className="flex flex-col justify-between items-center w-full mb-5 h-auto">
            <div className="flex flex-wrap justify-center mt-4 mb-4">
              {images.map(({ preview }, index) => (
                <div key={index} className="relative m-2">
                  <img
                    src={preview}
                    alt={`preview ${index + 1}`}
                    className="h-32 w-32 object-cover rounded-lg shadow-md"
                  />
                  <button
                    className="absolute top-0 right-0 bg-white m-1 text-alert font-semibold border bg-opacity-70 border-alert  rounded-full h-7 w-7 text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      removeImage(index);
                    }}
                    aria-label={`Eliminar imagen ${index + 1}`}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <div className="w-full flex justify-center mb-10">
              <label className="bg-secondary text-white text-center py-4 px-4 rounded-lg">
                <input
                  className="hidden"
                  type="file"
                  name="image"
                  onChange={handleChangeImage}
                  multiple
                />
                <img className="w-10 h-10" src={addImageIcon} alt="" />
              </label>
            </div>

            <div className="w-full flex justify-center">
             <div className="w-full flex flex-col items-center">
             <button
                className={`border-2 max-w-[500px] mb-5 flex justify-center items-center rounded-xl w-11/12 h-12 text-white font-semibold ${
                  images.length > 0
                    ? "bg-primary"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                type="submit"
                disabled={images.length === 0}
              >
                Continuar
              </button>
              <span className="mt-4 text-center">
              <b>*</b> Recuerda publicar imágenes de buena calidad y que
              correspondan al inmueble que estás publicando.
            </span>
             </div>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormHotel03;
