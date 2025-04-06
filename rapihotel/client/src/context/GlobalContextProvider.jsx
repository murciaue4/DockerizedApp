import { loginContext } from "./loginContext.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { staticHotels, staticRoomTypes, staticImgUser, staticServices, staticServicesIcons } from "../context/StaticData.js"; // Ajusta la ruta

const GlobalContextProvider = ({ children }) => {
  const URLStatic = "http://localhost:3333";
  const useStaticData = false; // Puedes definir esta variable en .env

  // Estados
  const [allHotels, setAllHotels] = useState(null);
  const [isLoadingHotels, setIsLoadingHotels] = useState(true);
  const [roomTypes, setRoomTypes] = useState([]);
  const [imgUser, setImgUser] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [showAlertLogUp, setShowAlertLogUp] = useState(false);
  const [showMapContainer, setShowMapContainer] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: "",
    minPrice: "",
    maxPrice: "",
    services: [],
    type: [],
    minCapacity: "",
    maxCapacity: "",
    location: [],
    rating: "",
  });
  const [servicesList, setServicesList] = useState([]);
  const [servicesIcons, setServicesIcons] = useState([]);
  const [customShooter, setCustomShooter] = useState(false);

  const handleCustomShooter = (bol) => {
    setCustomShooter(bol || !customShooter);
  };

  const handleShowMapContainer = (bol, searchTerm) => {
    if (searchTerm) {
      console.log("searchTerm contextoGlobal", searchTerm);
      setFilters((prevFilters) => ({
        ...prevFilters,
        searchTerm: searchTerm,
      }));
    }
    setShowMapContainer(bol);
    window.scrollTo(0, 0);
  };

  const localTokenExtractor = () => {
    const localTk = window.localStorage.getItem("sessionLogin");
    return localTk ? "Bearer " + localTk.split('"')[1] : null;
  };

  const getLocalSession = () => !!window.localStorage.getItem("sessionLogin");

  const getLocalSessionUser = () => {
    const user = window.localStorage.getItem("sessionLoginUser");
    return user ? JSON.parse(user) : null;
  };

  // Estados de sesión
  const [isLogin, setIsLogin] = useState(getLocalSession);
  const [user, setUser] = useState(getLocalSessionUser);
  const [token, setToken] = useState(localTokenExtractor);
  const [favourites, setFavourites] = useState([]);

  // Funciones de favoritos
  const addToFavorites = (hotelId) => {
    setFavourites((prevFavourites) => [...prevFavourites, hotelId]);
  };

  const removeFromFavorites = (hotelId) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((id) => id !== hotelId)
    );
  };

  const isFavorite = (hotelId) => favourites.includes(hotelId);

  const closeSession = () => {
    window.localStorage.removeItem("sessionLogin");
    window.localStorage.removeItem("sessionLoginUser");
    setIsLogin(getLocalSession);
    window.location.reload();
  };

 // Cargar datos estáticos en local storage si useStaticData está habilitado
  useEffect(() => {
    if (useStaticData) {
      window.localStorage.setItem("sessionLogin", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJfaWQiOjE2LCJ1c2VybmFtZSI6ImdlcnNvbjEyMyIsImVtYWlsIjoiZ2RtcDkyQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkU0haMllxbXEuVjJPdllBNlRjTmkzdXg4N3FQbUxVWDREdnpkVWJQU1JqdDNjY3BseHVTb2EiLCJ0ZW1wX3Rva2VuIjpudWxsLCJpc192ZXJpZnkiOjEsImlhdCI6MTc0MTI2MzA2OX0.R1SVzTtdfXzxAlqKVAaOs3y0vjruXfpiYnskdo6TCPk");
      window.localStorage.setItem("sessionLoginUser", JSON.stringify({ id: 10, user_id: 16, username: "gerson123", email: "gdmp92@hotmail.com", is_verify: 1 }));
      window.localStorage.setItem("favorites_10", JSON.stringify([19, 27, 20, 21]));
    }
  }, [useStaticData]);

  // Obtener tipos de habitaciones servicios e iconos de servicios
  useEffect(() => {
    const getRoomTypes = async () => {
      if (useStaticData) {
        setRoomTypes(staticRoomTypes);
      } else {
        try {
          const response = await axios.get(`${URLStatic}/user/gettypes/room_types`);
          
          setRoomTypes(response.data.body);
        } catch (error) {
          console.log("Error fetching room types, usando datos estáticos:", error);
          setRoomTypes(staticRoomTypes);
        }
      }
    };
    const getServices = async () => {
      if (useStaticData) {
        setServicesList(staticServices);
      } else {
        try {
          const response = await axios.get(`${URLStatic}/user/gettypes/services`);
        
          setServicesList(response.data.body);
        } catch (error) {
          console.log("Error fetching services, usando datos estáticos:", error);
          setServicesList(staticServices);
        }
      }
    };
    const getServicesIcons = async () => {
      if (useStaticData) {
        setServicesIcons(staticServicesIcons);
      } else {
        try {
          setServicesIcons(staticServicesIcons);
        } catch (error) {
          console.log("Error fetching services, usando datos estáticos:", error);
          setServicesIcons(staticServicesIcons);
        }
      }
    }
    getServicesIcons();
    getServices();
    getRoomTypes();
  }, [useStaticData]);

  // Obtener hoteles
  useEffect(() => {
    const getData = async () => {
      if (useStaticData) {
        setAllHotels(staticHotels);
        setIsLoadingHotels(false);
      } else {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        };
        try {
          const res = await axios.get(`${URLStatic}/user/hoteles`, config);
        
          setAllHotels(res.data.body);
          setIsLoadingHotels(false);
        } catch (error) {
          console.error("Error fetching hotels data, usando datos estáticos:", error);
          setAllHotels(staticHotels);
          setIsLoadingHotels(false);
        }
      }
    };
    getData();
  }, [token, customShooter, useStaticData]);

  // Obtener imagen de perfil
  useEffect(() => {
    const getProfileImgUser = async () => {
      if (user) {
        const id = user.user_id;
        if (useStaticData) {
          setImgUser(staticImgUser); // Ajusta esta URL según tus datos estáticos
          setImageChanged(true);
        } else {
          try {
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            };
            const response = await axios.get(`${URLStatic}/user/img_user/${id}`, config);
           
            setImgUser(response.data.body.url);
            setImageChanged(true);
          } catch (error) {
            console.error("Error fetching user image:", error);
          }
        }
      } else {
        setImgUser(null);
      }
    };
    getProfileImgUser();
  }, [user, token, imageChanged, useStaticData]);

  // Manejo de favoritos
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const uniqueStorageKey = `favorites_${user.id}`;
        const storedFavorites = window.localStorage.getItem(uniqueStorageKey);
        if (JSON.parse(storedFavorites)?.length > 0) {
          setFavourites(JSON.parse(storedFavorites));
        }
      }
    };
    fetchFavorites();
  }, [user]);

  useEffect(() => {
    if (user) {
      const uniqueStorageKey = `favorites_${user.id}`;
      localStorage.setItem(uniqueStorageKey, JSON.stringify(favourites));
    }
  }, [favourites, user]);

  const navigate = useNavigate();

  const handleFavouritesClick = () => {
    if (isLogin) {
      navigate("/favorites");
    } else {
      setShowAlertLogUp(true);
    }
  };

  const handleSetFavouriteClick = (e) => {
    e.stopPropagation();
    if (!isLogin) {
      setShowAlertLogUp(true);
    }
  };

  



  return (
    <loginContext.Provider
      value={{
        URLStatic,
        isLogin,
        setIsLogin,
        token,
        setToken,
        user,
        closeSession,
        imgUser,
        imageChanged,
        setImageChanged,
        favourites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        showAlertLogUp,
        setShowAlertLogUp,
        handleFavouritesClick,
        handleSetShowAlert: () => setShowAlertLogUp(!showAlertLogUp),
        handleSetFavouriteClick,
        allHotels,
        setAllHotels,
        isLoadingHotels,
        setIsLoadingHotels,
        showMapContainer,
        handleShowMapContainer,
        filters,
        setFilters,
        customShooter,
        handleCustomShooter,
        roomTypes,
        servicesList,
        servicesIcons,
      }}
    >
      {children}
    </loginContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalContextProvider;
