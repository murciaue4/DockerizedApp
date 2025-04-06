import { useEffect, useState, useRef, useCallback, useContext } from "react";
import MarkerIcon from "../../../../static/markerIconClusterer.svg";
import availableKeysIcon from "../../../../static/availableKeysIcon.svg";

import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import ImgSlider from "../../Home/PhotosDetails";
import { loginContext } from "../../../../context/loginContext";

export const PoiMarkers = (props) => {
  const { handleShowMapContainer } = useContext(loginContext);
  const map = useMap();
  const [markers, setMarkers] = useState({});
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const clusterer = useRef(null);
  const markerRefs = useRef({});

  const handleClick = useCallback((e) => {
    if (!map || !e.latLng) return;
    const poi = props.pois.find(
      (poi) =>
        poi.location.lat === e.latLng.lat() &&
        poi.location.lng === e.latLng.lng()
    );
    if (poi) {
      setSelectedMarker(poi.id);
      setFlipped(false); // reinicia el flip para cada marcador nuevo
      map.panTo(e.latLng);
      map.panBy(0, -300);
    }
  }, [map, props.pois]);

  // Inicializa el MarkerClusterer
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  // Actualiza los marcadores en el clusterer
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markerRefs.current));
  }, [markers]);

  useEffect(() => {
    const newMarkers = {};
    props?.pois?.forEach((poi) => {
      if (markerRefs.current[poi.key]) {
        newMarkers[poi.key] = markerRefs.current[poi.key];
      }
    });
    setMarkers(newMarkers);
  }, [props.pois]);

  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;
    if (marker) {
      markerRefs.current[key] = marker;
    } else {
      delete markerRefs.current[key];
    }
  };

  function getRateColor(promedio, totalRates) {
    if (totalRates === 0) return "bg-gray-300";
    if (promedio >= 9.0) return "bg-green-500";
    if (promedio >= 8.0) return "bg-green-400";
    if (promedio >= 7.0) return "bg-lime-400";
    if (promedio >= 6.0) return "bg-yellow-400";
    if (promedio >= 5.0) return "bg-orange-500";
    return "bg-red-500";
  }

  return (
    <div className="relative">
      {props?.pois?.map((poi) => (
        <AdvancedMarker
          key={poi.id}
          zIndex={poi.id === selectedMarker ? 1 : 0}
          position={{ lat: poi.location.lat, lng: poi.location.lng }}
          ref={(marker) => setMarkerRef(marker, poi.key)}
          clickable={true}
          gmpClickable={true}
          onClick={handleClick}
        >
          <div>
            <img src={MarkerIcon} className="h-20" alt="Marker Icon" />
          </div>

          {selectedMarker === poi.id && (
            // Se fija una altura para evitar colapso y se agrega overflow-hidden
            <div className="[perspective:1000px] absolute bottom-12 left-1/2 transform -translate-x-1/2 w-[380px] h-[520px]  ">
              <div
                className={`relative transition duration-500 [transform-style:preserve-3d] bg-white ${
                  flipped ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                {/* Cara frontal */}
                <div className="absolute inset-0 [backface-visibility:hidden] bg-white text-primary px-2 pb-10 shadow-border-blur rounded-3xl border-b border-alert min-h-[520px]">
                  <div className="flex flex-row justify-between items-center my-4">
                    <div>
                      <h1 className="text-2xl text-primary font-bold">
                        {String(poi.key).charAt(0).toUpperCase() +
                          String(poi.key).slice(1)}
                      </h1>
                      <h2 className="text-xl">
                        {String(poi.type).toUpperCase()}
                      </h2>
                    </div>
                    <button
                      className="border-2 border-primary mx-2 px-2 rounded-xl bg-alert text-primary text-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMarker(null);
                      }}
                    >
                      Cerrar
                    </button>
                  </div>
                  <div className="w-full h-52 overflow-hidden rounded-md">
                    <ImgSlider imagesHotel={poi.images} />
                  </div>
                  <div className="features h-auto pt-2 w-full text-base">
                    <div className="address">
                      {poi.address || "Sin dirección"}
                    </div>
                    <section className="flex flex-row justify-center items-center w-full h-11 border my-3 rounded-lg overflow-hidden bg-background font-bold">
                      <div
                        className={`w-1/2 h-full flex justify-center items-center ${getRateColor(
                          poi.avg_rating,
                          poi.total_ratings
                        )} text-white`}
                      >
                        <div className="h-full flex flex-col justify-center items-center">
                          <span className="text-2xl">
                            {Number(poi.avg_rating) <= 0
                              ? "Sin calificar"
                              : Number(poi.avg_rating).toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row justify-center w-1/2 h-full bg-primary text-white">
                        <div className="flex flex-row justify-center items-center">
                          <img
                            src={availableKeysIcon}
                            className="h-7 w-7 mr-4 transform -rotate-12"
                            alt="Available Keys"
                          />
                          <span className="text-2xl">
                            {poi.available || "Sin servicios"}
                          </span>
                        </div>
                      </div>
                    </section>
                    <section>
                      <div
                        className="rounded-md text-center py-2 border-2 border-primary font-semibold text-xl cursor-pointer"
                        onClick={() => {
                          handleShowMapContainer(false, poi.key);
                          console.log("Ver precios");
                        }}
                      >
                        Ver precios
                      </div>
                    </section>
                  </div>
                  <button
                    className="mt-4 bg-primary text-white px-4 py-2 rounded-xl w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFlipped(true);
                    }}
                  >
                    Más información
                  </button>
                </div>
                {/* Cara trasera con background diferente para notar el flip */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gray-200 text-primary px-2 pb-10 shadow-border-blur rounded-3xl border-b border-alert min-h-[520px]">
                  <div className="flex flex-row justify-between items-center my-4">
                    <div>
                      <h1 className="text-2xl text-primary font-bold">
                        Detalles Adicionales
                      </h1>
                    </div>
                    <button
                      className="border-2 border-primary mx-2 px-2 rounded-xl bg-alert text-primary text-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMarker(null);
                      }}
                    >
                      Cerrar
                    </button>
                  </div>
                  <div className="features h-auto pt-2 w-full text-base">
                    <div className="address">
                      {poi.address || "Sin dirección"}
                    </div>
                    <p className="mt-2">
                      {poi.description || "Sin descripción adicional"}
                    </p>
                  </div>
                  <button
                    className="mt-4 bg-alert text-primary px-4 py-2 rounded-xl w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFlipped(false);
                    }}
                  >
                    Volver
                  </button>
                </div>
              </div>
            </div>
          )}
        </AdvancedMarker>
      ))}
    </div>
  );
};

export default PoiMarkers;
