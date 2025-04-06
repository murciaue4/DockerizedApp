
import hotelSvg from "../../../../static/hotel-svg.svg";
import houselSvg from "../../../../static/house-svg.svg";
const selectTypeOfPropertyRender = ({onClose, next}) => {
  return (
    <>
      <div className="w-full h-auto bg-gray-100 p-5 pb-12">
        <span className="w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl text-center mb-5 font-extrabold text-gray-800">
           <span className="text-secondary">Registra</span> tu propiedad
          </h1>
          <p className="text-lg text-center">
            Haz que más personas se conviertan en tus
            huéspedes. Únete a la red de anunciantes más grande de tu región y
            comienza a crecer.
          </p>
        </span>
        <section className="w-full flex flex-wrap justify-center items-center mt-10">
          <div
            className="w-60 md:h-72 rounded-lg p-5 bg-white flex flex-col justify-center items-center border shadow-lg md:mr-5 mb-5 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => {
              onClose(false);
              next(true);
            }}
          >
            <img src={hotelSvg} className="h-28 mb-3" alt="" />
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">Alojamiento</h2>
              <p className="text-sm text-gray-500">Hotel, motel o campamentos</p>
            </div>
          </div>
          <div className="w-60 md:h-72 rounded-lg p-5 bg-white flex flex-col justify-center items-center border shadow-lg md:ml-5 cursor-pointer hover:scale-105 transition-transform">
            <img src={houselSvg} className="h-28 mb-3" alt="" />
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">Arriendos</h2>
              <p className="text-sm text-gray-500">Habitaciones, apartamentos, casas</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
  
};

export default selectTypeOfPropertyRender;