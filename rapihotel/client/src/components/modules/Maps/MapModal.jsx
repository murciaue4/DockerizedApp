import { useContext, useEffect, useRef, useState } from "react";
import markerBackgroundIcon from "../../../static/marker-bgd-03.svg";
import centerMapIcon from "../../../static/centerLocatio.svg";
import { Map, MapControl, useMap } from "@vis.gl/react-google-maps";
import { geoLocationContext } from "../../../context/geoLocationContext";
import Loading from "../alerts/Loading";
import { REACT_APP_GOOGLE_MAPS_MAPID } from "../../../../env";
import MapHandler from "./autocomplete/MapHandler";
import { PoiMarkers } from "./customs/PoiMarkers";
import ButtonClose from "../others/ButtonClose";

const MapModal = ({ onClose, hotel }) => {
  const mapId = REACT_APP_GOOGLE_MAPS_MAPID;
  const map = useMap();
  const { isLoading, userLocation, mainLocations, defaultCenter } =
    useContext(geoLocationContext);
 
  console.log("userLocation", hotel);
 

  const pois = [hotel].map((item) => ({
        id: item.id,
        key: item.name,
        type: item.type,
        location: {
          lat: parseFloat(item.location.lat),
          lng: parseFloat(item.location.lng),
        },
        address: `${
          String(item.location.sector).charAt(0).toUpperCase() +
            String(item.location.sector).slice(1) || "Sin dirección"
        }, ${item.location.city || "Sin ciudad"},  ${
          item.location.country || "Sin país"
        }`,
        capacity: item.capacity || 0,
        available: item.rooms?.reduce((acc, room) => acc + room.available, 0) || 0,
        images: item.images,
        avg_rating: item.avg_rating || 0,
        total_ratings: item.total_ratings || 0,
        description: item.descripcion || "Sin descripción",
      }))
    
  console.log("pois en mapModal", pois);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="h-full  w-full max-w-screen-md sm:max-h-[700px] sm:mx-8 z-50  bg-backgroundAlt mb-10 rounded-2xl overflow-hidden  ">
        <div>
            <ButtonClose onClose={onClose} />
        </div>
        <Map
          mapId={mapId}
          disableDefaultUI={true}
          defaultZoom={17}
          defaultCenter={
            defaultCenter || {
              lat: parseFloat(hotel?.location?.lat),
              lng: parseFloat(hotel?.location?.lng),
        
            }
          }
          // onCameraChanged={ (ev) =>
          //   console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
          // }
          options={{
            scaleControl: false,
            keyboardShortcuts: false,
          }}
          gestureHandling={"greedy"}
        >
          <PoiMarkers pois={pois} />
        </Map>
      </div>
    </div>
  );
};

export default MapModal;
