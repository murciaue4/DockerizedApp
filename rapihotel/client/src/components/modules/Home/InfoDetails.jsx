import { useContext } from "react";
import { loginContext } from "../../../context/loginContext";
import StaticMap from "../Maps/StaticMap";
import { capitalizeWords } from "../../../helpers";

const InfoDetails = ({ hotel }) => {
  const { showMapContainer, handleShowMapContainer } = useContext(loginContext);
  const allServices = hotel.services;


  const horariosDeAtencion = allServices.some(
    (servicio) => servicio.id === 1
  );


  return (
    <div className="flex justify-center w-full  h-auto">
      <div className="w-full h-full">
       
        <section className="DESCRIPCION  w-full h-full p-3 flex flex-col items-center">
          <span className="text-primary font-semibold">{capitalizeWords(hotel.type)}</span>
          <h1 className=" text-center text-4xl font-bold mb-12 text-accent">{capitalizeWords(hotel.name)}</h1>
          <div>
            <p className="text-text-primary">{hotel.descripcion}</p>
          </div>
        </section>

        <section className=" flex flex-col w-full p-3">
          <h1 className="text-xl font-bold text-primary ">
            Servicios principales
          </h1>
          <div className="flex flex-row flex-wrap mt-4 w-auto border-b pb-8">
            {allServices.slice(0, 6).map((servicio, index) => (
              <div
                key={index}
                className="flex items-center w-auto h-auto m-1 rounded-xl bg-backgroundAlt bg-opacity-60 border border-secondary border-opacity-50"
              >
                {/* Agrega un ícono por defecto si no hay ícono específico en los datos */}
                {/* <img
                  className="h-5 mr-2 my-0 "
                  src={servicio.icon || airIcon}
                  alt={servicio.name}
                /> */}
                <span className="w-auto px-1 text-secondary">
                  {servicio.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="UBICACION w-full p-3">
          <h1 className="text-xl font-bold text-primary mb-2">Ubicación</h1>
          <div className="bloque-mmapa w-full border-b pb-8">
            <div
              className="mapContainer w-full h-60 bg-emerald-100"
             
            >
              <StaticMap 
                onClose={() => handleShowMapContainer(false )}
                choords={{
                  lat: Number(hotel.location.lat),
                  lng: Number(hotel.location.lng),
                }}
                name={hotel.name}
                
                
              />
            </div>
          </div>
        </section>

        <section className="HORARIOS-Y-CONTACTO p-3 ">
          <div className="flex flex-col mb-6 text-text-secondary">
            <span>
              {`${hotel.location.directions}, ${hotel.location.barrio}, ${hotel.location.sector}, ${hotel.location.city}, ${hotel.location.country}. `}
            </span>
            <span>{`${hotel.location.indications}`}</span>
          </div>
          <div className="flex flex-col mb-6">
            <strong className="mb-2 text-primary">Horarios de atención</strong>
            <span className="text-text-secondary">Llegada: 15:00 Salida: 12:00</span>
          </div>
        </section>
      </div>
    </div>
    // Avenida El Malecón Carrera 1 No. 5 - 82, Bocagrande,
    // 130015, Cartagena, Colombia Teléfono: +57 56657527 | Fax: +57
    // 56657559 | Página web oficial del hotel
  );
};

export default InfoDetails;
