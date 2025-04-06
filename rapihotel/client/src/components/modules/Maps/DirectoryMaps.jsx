import { useContext, useEffect, useRef, useState } from "react";
import markerBackgroundIcon from "../../../static/marker-bgd-03.svg";
import centerMapIcon from "../../../static/centerLocatio.svg";
import { Map, MapControl, useMap } from "@vis.gl/react-google-maps";
import { geoLocationContext } from "../../../context/geoLocationContext";
import Loading from "../alerts/Loading";
import { REACT_APP_GOOGLE_MAPS_MAPID } from "../../../../env";
import MapHandler from "./autocomplete/MapHandler";
import { PoiMarkers } from "./customs/PoiMarkers";
import { use } from "react";

const Maps = ({ onClose, hotels, selectedHotelSearching, setFilters }) => {
  console.log(hotels[0]);
  const mapId = REACT_APP_GOOGLE_MAPS_MAPID;
  const map = useMap();
  const { isLoading, userLocation, mainLocations, defaultCenter } =
    useContext(geoLocationContext);
  const [open, setOpen] = useState(false);
console.log('userLocation', userLocation);
  useEffect(() => {
    if (!map) return;
    if (map) {
      if (!selectedHotelSearching) {
        map.setZoom(15);
      }

      if (selectedHotelSearching) {
        map.setCenter({
          lat: parseFloat(selectedHotelSearching[0]?.location?.lat, 10),
          lng: parseFloat(selectedHotelSearching[0]?.location?.lng, 10),
        });
        map.setZoom(19);
        // setMyLocation({
        //   lat: parseFloat(selectedHotelSearching.location.lat, 10),
        //   lng: parseFloat(selectedHotelSearching.location.lng, 10),
        // });
      }
    }
  }, [selectedHotelSearching]);

  // // // const [myCenter, setMyCenter] = useState(defaultCenter);
  // // // const choordsRef = useRef(null);
  // // // const [selectedPlace, setSelectedPlace] = useState(null);

  // // // useEffect(() => {
  // // //   if (!map) return;
  // // //   setMyCenter(defaultCenter);
  // // //   map.setCenter(defaultCenter);
  // // // }, [map, defaultCenter]);

  // // // if (isLoading) {
  // // //   return <Loading />;
  // // // }

  // // // const handleSetMainLocations = (e) => {
  // // //   const selectedLocation = e.target.value;
  // // //   if (!selectedLocation) return;

  // // //   const location = mainLocations.find(loc => loc.name === selectedLocation);
  // // //   if (location) {
  // // //     map.setCenter(location.choords);
  // // //     setMyCenter(location.choords);
  // // //   }
  // // // };

  // // // const handleMapClick = (event) => {
  // // //   const clickedLat = event.detail.latLng.lat();
  // // //   const clickedLng = event.detail.latLng.lng();
  // // //   setMyLocation({ lat: clickedLat, lng: clickedLng });
  // // //   setMyCenter({ lat: clickedLat, lng: clickedLng });
  // // // };

  // // // const handleMarkerDragEnd = (event) => {
  // // //   const lat = event.latLng.lat();
  // // //   const lng = event.latLng.lng();
  // // //   setMyCenter({ lat, lng });
  // // // };

  // // // const handleInfoWindowClick = () => {
  // // //   if (choordsRef.current) {
  // // //     const tempInput = document.createElement("input");
  // // //     tempInput.value = JSON.stringify(myLocation);
  // // //     document.body.appendChild(tempInput);
  // // //     tempInput.select();
  // // //     document.execCommand("copy");
  // // //     document.body.removeChild(tempInput);
  // // //   }
  // // // };

  // // const renderMainLocationsSelect = () => (
  // //   <select
  // //     name="mainLocations"
  // //     id="locationsMain"
  // //     className="h-10 border rounded-md px-2 text-center"
  // //     onChange={handleSetMainLocations}
  // //   >
  // //     <option value="">Sitios principales</option>
  // //     {mainLocations.map(location => (
  // //       <option key={location.name} value={location.name}>
  // //         {location.name}
  // //       </option>
  // //     ))}
  // //   </select>
  // // );

  // const renderMapControlButton = (onClick, icon, additionalClasses = "") => (
  //   <button
  //     onClick={onClick}
  //     className={`h-10 w-10 rounded-full border border-gray-600 flex justify-center items-center ${additionalClasses}`}
  //   >
  //     <img className="w-7 h-7" src={icon} alt="" />
  //   </button>
  // );
  const pois = hotels.map((item) => ({
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
  }));
  console.log(pois);

  return (
    <div className="h-full min-h-screen w-full z-30  bg-black mb-10  ">
      <Map
        mapId={mapId}
        disableDefaultUI={true}
        defaultZoom={16}
        defaultCenter={
          defaultCenter || {
            lat: userLocation?.geometry.location.lat(),
            lng: userLocation?.geometry.location.lng(),
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
  );
};

export default Maps;
