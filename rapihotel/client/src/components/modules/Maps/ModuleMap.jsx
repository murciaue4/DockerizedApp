import { useContext, useEffect, useRef, useState } from "react";
import markerBackgroundIcon from "../../../static/marker-bgd-03.svg";
import centerMapIconWhite from "../../../static/searchLocationIconWhite.svg";
import {
  Map,
  AdvancedMarker,
  InfoWindow,
  MapControl,
  ControlPosition,
  useMap,
} from "@vis.gl/react-google-maps";
import { geoLocationContext } from "../../../context/geoLocationContext";
import Loading from "../alerts/Loading";
import { REACT_APP_GOOGLE_MAPS_MAPID } from "../../../../env";

const Maps = ({ onClose, defaultCenter, capturedChoords, onPlaceSelected }) => {
  const mapId = REACT_APP_GOOGLE_MAPS_MAPID;
  const map = useMap();
  const { isLoading, userLocation, mainLocations } =
    useContext(geoLocationContext);
  const [open, setOpen] = useState(false);
  const [myCenter, setMyCenter] = useState(defaultCenter);
  const choordsRef = useRef(null);

  useEffect(() => {
    if (!map) return;
    setMyCenter(defaultCenter);
    map.setCenter(defaultCenter);
  }, [map, defaultCenter]);

  if (isLoading) {
    return <Loading />;
  }

  const handleSetMainLocations = (e) => {
    const selectedLocation = e.target.value;
    const location = mainLocations.find((loc) => loc.name === selectedLocation);
    if (location) {
      map.setCenter(location.choords);
      setMyCenter(location.choords);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };

  const handleMapClick = (event) => {
    if (!event.detail?.latLng) return;
    console.log(event.detail);
    const clickedLat = event.detail.latLng.lat;
    const clickedLng = event.detail.latLng.lng;
    setMyCenter({ lat: clickedLat, lng: clickedLng });
    setOpen(false);
  };

  const handleMarkerDragEnd = (event) => {
    if (!event.latLng) return;
    const draggedLat = event.latLng.lat();
    const draggedLng = event.latLng.lng();
    console.log({lat: draggedLat, lng: draggedLng});
    setMyCenter({ lat: draggedLat, lng: draggedLng });
  };

  return (
    <div className="h-[500px] w-full  rounded bg-white mb-10">
      <Map
        onClick={handleMapClick}
        defaultZoom={16}
        defaultCenter={myCenter}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        keyboardShortcuts={false}
        mapId={mapId}
      >
        <AdvancedMarker
          position={myCenter}
          draggable={true}
          onClick={() => setOpen(true)}
          onDragEnd={handleMarkerDragEnd}
        >
          <div className="relative h-12 w-12 flex justify-center items-center">
            <img
              className="w-12 h-12"
              src={markerBackgroundIcon}
              alt="Marker Background"
            />
            <span className="absolute flex justify-center items-center mb-2 text-[22px] z-10 text-white font-bold">
              H!
            </span>
          </div>
        </AdvancedMarker>
        {open && (
          <InfoWindow position={myCenter} onCloseClick={() => setOpen(false)}>
            <div>
              <p
                ref={choordsRef}
                onClick={() => copyToClipboard(JSON.stringify(myCenter))}
                className="text-md cursor-pointer"
                title="Click to copy coordinates"
              ></p>
              <p className="mt-2 text-sm">
                Puedes ver esta ubicación en Google Maps:
              </p>
              <div className="mt-2">
                {/* Enlace para abrir en el navegador */}
                <a
                  href={`https://www.google.com/maps?q=${myCenter.lat},${myCenter.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  Ver en Google Maps (Navegador)
                </a>
              </div>
              <div className="mt-2">
                {/* Enlace para abrir en la app de Google Maps */}
                <a
                  href={`https://maps.google.com/?q=${myCenter.lat},${myCenter.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  Ver en Google Maps (App)
                </a>
              </div>
              <div className="mt-4">
                {/* Enlace para obtener direcciones hacia la ubicación */}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${myCenter.lat},${myCenter.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  Como llegar?
                </a>
              </div>
            </div>
          </InfoWindow>
        )}

        <MapControl position={ControlPosition.TOP_CENTER}>
          <div className="h-auto w-auto mt-3 text-base shadow-xl">
            <select
              name="mainLocations"
              id="locationsMain"
              className="h-10 border rounded-md px-2 text-center"
              onChange={handleSetMainLocations}
              aria-label="Select main location"
            >
              <option value="">Sitios principales</option>
              {mainLocations.map((location, index) => (
                <option key={index} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </MapControl>

        <MapControl position={ControlPosition.BOTTOM_CENTER}>
          <div className="h-20 w-auto">
            <button
              onClick={() => {
                capturedChoords(myCenter);
                onPlaceSelected(null);
              }}
              className="h-12 w-auto px-4 rounded-lg text-lg bg-secondary text-white border border-white shadow-lg flex justify-center items-center"
              aria-label="Get Coordinates"
            >
              Seleccionar esta ubicación
            </button>
          </div>
        </MapControl>

        <MapControl position={ControlPosition.TOP_RIGHT}>
          <div className="h-20 w-20 mt-3">
            <button
              onClick={() => {
                setMyCenter({
                  lat: userLocation.geometry.location.lat(),
                  lng: userLocation.geometry.location.lng(),
                });
                map.setCenter({
                  lat: userLocation.geometry.location.lat(),
                  lng: userLocation.geometry.location.lng(),
                });
              }}
              className="h-10 w-10 rounded-full bg-secondary border-2 border-white flex justify-center items-center"
              aria-label="Center map on marker"
            >
              <img
                className="w-7 h-7"
                src={centerMapIconWhite}
                alt="Center Map Icon"
              />
            </button>
          </div>
        </MapControl>
      </Map>
    </div>
  );
};

export default Maps;

// https://www.google.com/maps?q=37.99443363624487,-122.34955027699318
// {"lat":37.99443363624487,"lng":-122.34955027699318}
