import { useState, useEffect } from "react";
import locationIcon from "../../../../static/LocationIconWhite.svg";
import searchIconw from "../../../../static/searchIconW.svg";
import searchLocationIcon from "../../../../static/searchLocationIconWhite.svg";
import AutocompleteClassic from "../../Maps/autocomplete/AutocompleteClassic";
import Mapa from "../../Maps/ModuleMap";
import StaticMap from "../../Maps/StaticMap";

import Alert from "../../alerts/AlertStandard";

const LocationsHotelForm = ({onClose, next, handleChangeForms, userLocation, formData}) => {

const [capturedChoords, setCapturedChoords] = useState(null);
const [selectedPlace, setSelectedPlace] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
 

useEffect(() => {
    if (formData.choords) {
      setCapturedChoords(formData.choords);
    }
  }, []);
  
  
  const handleShowAlert = (bol) => {
    setShowAlert(bol || false);
    
  };

  console.log(capturedChoords);
  return (
    <div className=" flex flex-col items-center w-full  h-full py-16 bg-white ">
      <h1 className="text-4xl text-center font-bold mb-6">
        ¿<span className="text-secondary">Dónde</span> está ubicada tu
        propiedad?
      </h1>
      <span className="text-lg text-primary font-normal mb-16 text-center w-11/12 max-w-[600px]">
        Indica la ubicación exacta de tu propiedad para que clientes puedan
        encontrarte de forma rápida y precisa.
      </span>

      <div className=" h-auto  w-11/12 max-w-[500px] mb-8 flex justify-between rounded-lg bg-secondary">
        <img className="w-1/12 h-5 mx-2 my-auto " src={searchIconw} alt="" />
        {/* <input
          type="search"
          placeholder="Ej: Caserio El Porvenir, Rubiales"
          className=" border-r-2 w-full  outline-none text-xl"
        /> */}
        <div className="w-10/12 h-12 bg-white">
          <AutocompleteClassic onPlaceSelect={setSelectedPlace} />
        </div>

        <img
          onClick={() => {
            setSelectedPlace(userLocation);
          }}
          className="w-1/12 h-5 mx-3 my-auto"
          src={searchLocationIcon}
          alt=""
          title="Encontrar mi ubicacion"
        />
      </div>
      {selectedPlace ? (
        <div className="h-screen w-full flex justify-center">
          <Mapa
            defaultCenter={{
              lat: selectedPlace.geometry.location.lat(),
              lng: selectedPlace.geometry.location.lng(),
            }}
            capturedChoords={setCapturedChoords}
            onPlaceSelected={setSelectedPlace}
          ></Mapa>
        </div>
      ): capturedChoords && (
        <div className="w-full h-52 flex justify-center my-12 overflow-hidden">
          <StaticMap
            choords={capturedChoords}
            className="w-full h-full rounded-lg"
          />
        </div>
      )}
      
      <span className=" text-xs text-center w-11/12 max-w-[600px]">
        {" "}
        Para aprovechar al máximo tu experiencia, te recomendamos{" "}
        <strong>activar la función de ubicación en tu dispositivo</strong>. Esto
        nos ayudará a brindarte servicios personalizados y optimizados para tu
        área local. No te preocupes, tu privacidad es nuestra prioridad, y la
        información de ubicación se utiliza únicamente para mejorar tu
        experiencia y la de tus clientes en nuestro sitio.
      </span>
      <div className="w-full flex justify-center">
        <button
          className={`border-2 max-w-[500px] mt-12 flex justify-center items-center rounded-xl w-11/12 h-12 ${
            capturedChoords ? "bg-primary" : "bg-blue-200"
          } text-white font-semibold`}
          onClick={() => {
            console.log('click');
           
            if (!capturedChoords) {
              handleShowAlert(true);
              return;
            } else {
              handleChangeForms({ choords: capturedChoords });
              next(true);
              onClose(false);
              
            }
          }}
        >
          Siguiente
        </button>
      </div>
      {showAlert && <Alert AlertTitle={'Confirma tu Ubicación! '} AlertString={"Elige un lugar en el mapa y haz click en el boton [Seleccionar esta ubicación] para capturar tus coordenadas. "} AlertType={'warning'} onClose={handleShowAlert} />}
    </div>
  );
};

export default LocationsHotelForm;
