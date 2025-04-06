import { useEffect, useState } from "react";
import {
  Map,
  AdvancedMarker,
  MapControl,
  ControlPosition,
  useMap,
} from "@vis.gl/react-google-maps";
import { REACT_APP_GOOGLE_MAPS_MAPID } from "../../../../env";

const HotelLocationMap = ({ defaultCenter, onLocationSelected }) => {
  const map = useMap();
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  // Cuando el mapa esté listo, lo centra en la posición por defecto
  useEffect(() => {
    if (map) {
      map.setCenter(defaultCenter);
    }
  }, [map, defaultCenter]);

  // Actualiza la posición del marcador al terminar de arrastrar
  const handleMarkerDragEnd = (event) => {
    if (!event.latLng) return;
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setMarkerPosition({ lat: newLat, lng: newLng });
  };

  return (
    <div className="h-[400px] w-full rounded bg-white">
      <Map
        defaultZoom={16}
        defaultCenter={defaultCenter}
        gestureHandling="greedy"
        disableDefaultUI={true}
        keyboardShortcuts={false}
        mapId={REACT_APP_GOOGLE_MAPS_MAPID}
      >
        <AdvancedMarker
          position={markerPosition}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
        >
          {/* Puedes reemplazar la imagen o el estilo por el que prefieras */}
          <div className="relative h-10 w-10 flex justify-center items-center">
            <img
              className="w-10 h-10"
              src="/ruta/a/tu/marker-icon.svg"
              alt="Marcador de ubicación"
            />
          </div>
        </AdvancedMarker>

        <MapControl position={ControlPosition.BOTTOM_CENTER}>
          <div className="mt-3">
            <button
              onClick={() => onLocationSelected(markerPosition)}
              className="px-4 py-2 rounded bg-secondary text-white shadow"
            >
              Seleccionar esta ubicación
            </button>
          </div>
        </MapControl>
      </Map>
    </div>
  );
};

export default HotelLocationMap;
