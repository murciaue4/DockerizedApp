import { useContext } from "react";
import markerBackgroundIcon from "../../../static/marker-bgd-03.svg";
import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { geoLocationContext } from "../../../context/geoLocationContext";
import Loading from "../alerts/Loading";
import { REACT_APP_GOOGLE_MAPS_MAPID } from "../../../../env";
import { loginContext } from "../../../context/loginContext";


const StaticMap = ({ onClose, choords, name='' }) => {
  const mapId = REACT_APP_GOOGLE_MAPS_MAPID;
  const { isLoading, } = useContext(geoLocationContext);
  const {handleShowMapContainer} = useContext(loginContext);

  return (
    <div className=" h-full w-full rounded z-0" onClick={
       (e) => {
        e.stopPropagation()
        window.scrollTo(0, 0)
        handleShowMapContainer(true, name)
        
      }
    } >
     

      {!isLoading ? (
        <Map
          defaultCenter={choords}
          defaultZoom={16}
          gestureHandling="none" // Desactiva cualquier interacción
          disableDefaultUI={true} // Oculta controles por defecto
          mapId={mapId}
          zoomControl={true}
          
        >
          <AdvancedMarker position={choords}>
            <div className="relative h-12 w-12 flex justify-center items-center">
              <img className="w-12 h-12" src={markerBackgroundIcon} alt="Marker" />
              <span className="absolute flex justify-center items-center mb-2 text-[22px] z-10 text-white font-bold">
                H!
              </span>
            </div>
          </AdvancedMarker>
        </Map>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default StaticMap;
