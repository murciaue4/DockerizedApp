import { geoLocationContext } from "./geoLocationContext";
import { useEffect, useState } from "react";
import { getUserLocation, getOperatingSystem } from "../helpers";
import PropTypes from "prop-types";

const GeoLocationContextProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(true);
  const [userLocation, setuserLocation] = useState(null);
  const [userOS, setUserOS] = useState(null)
  const [defaultCenter, setDefaultCenter] = useState();

  const mainLocations = [
    {
      name: "alto mancacias",
      choords: {
        lat: 4.076022,
        lng: -72.026789,
      },
      direction: "KM 6+ 500 via Puerto Gaitán-Rubiales",

    },
    {
      name: "alto neblinas",
      choords: {
        lat: 4.315368,
        lng: -72.030425,
      },
      direction: "KM 6+ 500 via Puerto Gaitán-Rubiales",
    },
    {
      name: "buenos aires (rubialito)",
      choords: {
        lat: 3.7875757421679035,
        lng: -71.38192771437281,
      },
      direction: "KM 6+ 500 via Puerto Gaitán-Rubiales",
    },
    {
      name: "centro poblado planas",
      choords: {
        lat: 4.183884,
        lng: -71.323433,
      },
      direction: "KM 6+ 500 via Puerto Gaitán-Rubiales",
    },
    {
      name: "eds rubiales",
      choords: {
        lat: 3.794881,
        lng: -71.449500,
      },
      direction: "KM 6+ 500 via Puerto Gaitán-Rubiales",
    },
    {
      name: "el oasis (puerto triunfo)",
      choords: {
        lat: 3.775363981158301,
        lng: -71.65874505711278,
      },
      direction: "KM 132  via Puerto Gaitán-Rubiales",
    },
    {
      name: "el porvenir (caserio)",
      choords: {
        lat: 3.763696,
        lng: -71.362796,
      },
      direction: "KM 160 + 500 via Puerto Gaitán-Rubiales",
    },
    {
      name: "jaguar",
      choords: {
        lat: 4.264482,
        lng: -72.032191,
      },
      direction: "KM 12 + 500 via Puerto Gaitán-Rubiales",
    },
    {
      name: "la cristalina",
      choords: {
        lat: 4.263119,
        lng: -71.633294,
      },
      direction: "KM 6+ 500 via Puerto Gaitán-Rubiales",
    },
    {
      name: "la vírgen",
      choords: {
        lat: 3.769039,
        lng: -71.795495,
      },
      direction: "KM 110  via Puerto Gaitán-Rubiales",
    },
    {
      name: "puerto gaitán",
      choords: {
        lat: 4.314318,
        lng: -72.081962,
      },
      direction: "Puerto Gaitán, Meta, Colombia",
    },
    {
      name: "puerto huevo",
      choords: {
        lat: 3.879415,
        lng: -71.989233,
      },
      direction: "KM 75  via Puerto Gaitán-Rubiales",
    },
    {
      name: "santa helena",
      choords: {
        lat: 3.900004652719744,
        lng: -71.49067531960965,
      },
      direction: "KM 6+ 500 via Puerto Gaitán-Rubiales",
    },
  ];

  const getUserCurrentLocation = async () => {
    try {
      const latLng = await getUserLocation();
      setuserLocation({
        geometry: {
          location: {
            lat: () => {
              return latLng[0];
            },
            lng: () => {
              return latLng[1];
            },
          },
        },
      });
    } catch (error) {
      console.error("Error obteniendo la ubicación del usuario:", error);
    } finally {
      setTimeout(() => {
        setisLoading(false);
      }, 2000);
      
    }
  };

  useEffect(() => {
    getUserCurrentLocation();
    setUserOS(getOperatingSystem());
  }, []);

  return (
    <geoLocationContext.Provider
      value={{
        isLoading,
        userLocation,
        userOS,
        mainLocations,
      }}
    >
      {children}
    </geoLocationContext.Provider>
  );
};

GeoLocationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GeoLocationContextProvider;
