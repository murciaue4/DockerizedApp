import { useState, useContext, useEffect } from "react";
import stringSimilarity from "string-similarity";
import { useDateFormatter } from "@react-aria/i18n";
import { loginContext } from "../../../context/loginContext";
import { geoLocationContext } from "../../../context/geoLocationContext";
import CardHotel from "./CardHotel";
import SkeletonCardHotel from "./SkeletonCardHotel";

import locationIcon from "../../../static/locationIcon.svg";
import sortTypeIcon from "../../../static/sort-Vertival-Icon.svg";

import editIcon from "../../../static/editIcon-black.svg";
import Map from "../Maps/DirectoryMaps";
import ListIcon from "../../../static/sort-Vertival-Icon.svg";

import FilterChips from "./FilterChips";
import SearchBooking from "../forms/Booking/SearchBooking";
import { capitalizeWords, normalize } from "../../../helpers";
import { reservationsContext } from "../../../context/reservationsContext";
import { Slider } from "@heroui/react";


const Home = () => {
  const {
    isLoadingHotels,
    allHotels,
    showMapContainer,
    handleShowMapContainer,
    filters,
    setFilters,
  } = useContext(loginContext);
  const { newReservationData } = useContext(reservationsContext);
  const formatter = useDateFormatter({ dateStyle: "long" });
  const { userLocation, mainLocations } = useContext(geoLocationContext);
  const [showAllFilters, setshowAllFilters] = useState(false);
  const [showSortBy, setShowSortBy] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [toogleSearchBooking, setToogleSearchBooking] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const [selectedHotelSearch, setSelectedHotelSearch] = useState(null);

  //FILTROS
  console.log("mainLocations", mainLocations);
  //SORTBY
  const [sortBy, setSortBy] = useState("default");
  const [sortTypeAsc, setSortTypeAsc] = useState(false);

  //MANEJADOR DE ESTADOS DE TOGGLES

  //MANEJADOR DE BOTON DE FILTROS
  const handleShowAllFilters = () => {
    window.scrollTo(0, 0);
    setShowSortBy(false);
    setshowAllFilters(!showAllFilters);
  };

  const handleShowSortBy = () => {
    setshowAllFilters(false);
    setShowSortBy(!showSortBy);
  };

  // MANEJADOR  DE FILTROS - para actualizar el estado que guarda los terminos de busqueda
  const handleFilterChange = (filter, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: value,
    }));
    setSelectedHotelSearch(filteredHotels);
  };

  //MANEJADOR DE ORDENAMIENTO SORTBY
  const handleSortType = () => {
    setSortTypeAsc(!sortTypeAsc);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const sortedHotels = () => {
    let sorted = [...filteredHotels];
    if (sortBy === "price") {
      sorted.sort((a, b) =>
        sortTypeAsc ? a.avgPrice - b.avgPrice : b.avgPrice - a.avgPrice
      );
    } else if (sortBy === "capacity") {
      sorted.sort((a, b) =>
        sortTypeAsc
          ? a.rooms.length - b.rooms.length
          : b.rooms.length - a.rooms.length
      );
    } else if (sortBy === "rating") {
      sorted.sort((a, b) =>
        sortTypeAsc ? a.avg_rating - b.avg_rating : b.avg_rating - a.avg_rating
      );
    } else if (sortBy === "default") {
      sorted = filteredHotels;
    }

    return sorted;
  };

  //stos manejadores son para resetear la busqueda de cada filtro, para usar un boton de limpiar los criterios de busqueda en cada seccion
  const handleResetFilterPrice = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      minPrice: "",
      maxPrice: "",
    }));
  };

  const handleResetFiltros = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      services: [],
      rating: "",
    }));
  };

  const handleResetFilterType = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      type: [],
    }));
  };

  const handleResetFilterCapacity = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      minCapacity: "",
      maxCapacity: "",
    }));
  };

  const handleResetFilterLocation = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      location: [],
    }));
  };

  const handleResetSortChange = (event) => {
    setSortBy("default");
    setSortTypeAsc(false);
  };

  //FILTRADO de ltodos los hoteles
  const filteredHotels = allHotels
    ? allHotels.filter((hotel) => {
        // Fitros por servicios

        const priceCriteria =
          (filters.minPrice
            ? hotel.minPrice >= Number(filters.minPrice)
            : true) &&
          (filters.maxPrice
            ? hotel.maxPrice <= Number(filters.maxPrice)
            : true);

        const serviceCriteria = filters.services.length
          ? filters.services.every((service) =>
              hotel.services.some(
                (hotelService) => hotelService.name === service
              )
            )
          : true;
        // Filtro por tipo
        const typeCriteria = filters.type.length
          ? filters.type.includes(hotel.type)
          : true;

        // Filtro por capacidad
        const capacityCriteria =
          filters.minCapacity && !filters.maxCapacity
            ? hotel.capacity >= filters.minCapacity
            : true;
        const capacityCriteria2 =
          filters.maxCapacity && !filters.minCapacity
            ? hotel.capacity <= filters.maxCapacity
            : true;
        const capacityCriteria3 =
          filters.minCapacity && filters.maxCapacity
            ? hotel.capacity >= filters.minCapacity &&
              hotel.capacity <= filters.maxCapacity
            : true;

        // Filtro por ubicación (ciudad, sector, etc.)

        const similarityThreshold = 0.4; // Valor entre 0 y 1

        const locationCriteria =
          filters.location && filters.location.length
            ? filters.location.some((filterValue) => {
                const normalizedFilter = normalize(filterValue);
                const normalizedSector = normalize(hotel.location.sector);
                const similarity = stringSimilarity.compareTwoStrings(
                  normalizedSector,
                  normalizedFilter
                );
                return similarity >= similarityThreshold;
              })
            : true;

        // Filtro por término de búsqueda
        const searchTermCriteria = filters.searchTerm
          ? hotel.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
          : true;

        const ratingCriteria = filters.rating
          ? Number(hotel.avg_rating) >= Number(filters.rating)
          : true;

        return (
          serviceCriteria &&
          typeCriteria &&
          capacityCriteria &&
          capacityCriteria2 &&
          capacityCriteria3 &&
          locationCriteria &&
          searchTermCriteria &&
          ratingCriteria &&
          priceCriteria
        );
      })
    : [];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setToogleSearchBooking(windowWidth < 575 ? false : true);
    setshowAllFilters(windowWidth < 997 ? showAllFilters : true);
    setShowFilters(windowWidth < 997 ? false : true);
  }, [windowWidth]);

  //RENDER
  return (
    <div className=" w-full h-auto flex flex-col items-center pb-20 bg-background">
      {/* BARRA DE BÚSQUEDA */}
      {(toogleSearchBooking && (
        <div className="w-11/12 flex flex-col p-2 my-6 max-w-5xl">
          <div>
            <SearchBooking />
          </div>
          <div>
            <div className="flex justify-center h-auto w-full sm:w-auto">
              <button
                id="search_button"
                type="submit"
                className="px-3 bg-backgroundAlt  font-bold rounded-3xl h-14 border-2 w-full sm:hidden"
                onClick={() => {
                  setToogleSearchBooking(false);
                  console.log("Destino:");
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )) || (
        <div className="w-full flex flex-col h-24 p-4">
          <div
            className={`flex border-2 w-full h-full overflow-hidden justify-start p-1 rounded-2xl border-gray-300 bg-background  cursor-pointer `}
            onClick={() => {
              setToogleSearchBooking(true);
              console.log("Destino:");
            }}
          >
            <div className="flex w-full h-14 overflow-hidden  justify-between items-center p-1 rounded-lg ">
              <div className="relative w-full">
                <label
                  htmlFor="datepickerr"
                  className="block font-bold text- w-full px-1  "
                >
                  {filters?.location.length > 0
                    ? filters?.location[0]
                    : "¿Adónde quieres ir?"}
                </label>
                <input
                  id="datepickerr"
                  type="text"
                  className="hidden"
                  defaultValue="4 abr - 5 abr"
                />
                <button
                  type="button"
                  aria-label={"Fechas, 4 abr - 5 abr"}
                  className="w-full px-1 py-1  rounded-md text-left text-xs "
                >
                  <div className="flex flex-row  space-x-2">
                    <p className="text-default-700 font-medium text-nowrap">
                      {formatter.format(
                        newReservationData?.["check_in"],
                        "long"
                      )}
                    </p>
                    <span>-</span>
                    <p>
                      {formatter.format(
                        newReservationData?.["check_out"],
                        "long"
                      )}
                    </p>
                  </div>
                </button>
              </div>
              <div className="h-full w-14 overflow-hidden  justify-center items-center rounded-lg ">
                <img
                  src={editIcon}
                  alt="*"
                  className={` w-4 h-4 transition-custom m-4 `}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FILTROS MOBILE */}
      <div
        className={`w-11/12 h-auto  flex justify-center rounded-xl mb-4 lg:hidden `}
      >
        <div
          className={`w-full flex justify-center ${
            showMapContainer ? " z-30  absolute top-0 px-4 mt-4 " : ""
          }`}
        >
          <div className="w-full h-full flex justify-center space-x-9 ">
            {/* BOTÓN FILTROS */}
            <div className=" w-1/2 h-full border-2 border-secondary rounded-xl hover:bg-primary hover:text-white transition-custom  ">
              <button
                onClick={() => handleShowAllFilters()}
                className="w-full h-full   "
              >
                <span
                  className={`${
                    showAllFilters
                      ? "bg-primary rounded-xl"
                      : "bg-accent2 rounded-2xl"
                  } flex w-full h-full justify-center items-center text-xl  py-1 px-3  `}
                >
                  <span
                    className={showAllFilters ? " font-bold text-2xl " : ""}
                  >
                    Filtrar
                  </span>
                </span>
              </button>
            </div>

            {/* BOTÓN ORDENAR */}
            <div className="w-1/2 h-full border-2 border-secondary rounded-xl hover:bg-primary hover:text-white transition-custom md:hidden  ">
              <button
                onClick={() => handleShowAllFilters()}
                className="w-full h-full "
              >
                <span
                  className={`${
                    showAllFilters
                      ? "bg-primary rounded-xl"
                      : "bg-accent2 rounded-2xl"
                  } flex w-full h-full justify-center items-center text-xl  py-1 px-3  `}
                >
                  <span>Ordenar</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO DE LA PÁGINA */}
      <div className="w-11/12 max-w-5xl">
        {/* ENCABEZADO Y ORDENAMIENTO */}
        <div className=" w-full  flex flex-row justify-center items-center">
          <div className="w-full flex justify-center items-center">
            <div
              className={`pageContentHead flex max-md:justify-center justify-between items-center w-full max-w-5xl mx-auto mt-2`}
            >
              {/* BOTON DE ORDENAR */}
              <button className={`w-2/6 flex justify-center border-2 border-secondary rounded-xl hover:bg-primary hover:text-white transition-custom overflow-hidden max-md:hidden`}>
                <span className="flex align-middle w-full h-9">
                  <div className="flex items-center w-full h-full ">
                    <select
                      name="sortBy"
                      id="sorting-selector"
                      className={` text-base font-light h-full text-center w-full bg-background text-text-secondary ${!sortBy != 'default'? '': 'rounded-l-xl'}  focus:outline-none focus:ring-0 focus:ring-primary border-transparent appearance-none`}
                      value={sortBy}
                      onChange={handleSortChange}
                      style={{ backgroundImage: "none" }}
                    >
                      <option value="default">
                        Ordenar resultados por :
                      </option>
                      <option value="price">Ordenado por precio</option>
                      <option value="rating">Ordenado por puntuacion</option>
                      <option value="capacity">Ordenado por capacidad</option>
                    </select>
                    <div className={`${sortBy === "default" ? "hidden" : ""}`}>
                      <img
                        onClick={handleSortType}
                        title={`${
                          sortTypeAsc
                            ? "Cambiar a orden Descendente"
                            : "Cambiar a orden Ascendente"
                        }`}
                        src={sortTypeIcon}
                        className="h-9 w-9 cursor-pointer"
                        alt=""
                      />
                    </div>
                  </div>
                </span>
              </button>

              {/* CANTIDAD DE HOTELES ENCONTRADOS */}
              <div className={`flex md:block lg:flex text-sm`}>
                <p className="mr-2">Encontramos </p>
                <strong className="mr-2 ">{` ${filteredHotels.length}`}</strong>{" "}
                <span>resultados</span>
              </div>

              {/* BOTON DE MAPA */}

              <button
                className={`max-md:w-40 w-2/6 max-md:fixed   max-md:bottom-6 max-md:justify-center max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 shadow-md rounded-md max-md:rounded-full  ${
                  showMapContainer ? "hidden" : ""
                }`}
              >
                <div
                  className={`bg-sky-500 shadow-border-blur  border-white   h-14 p-1 rounded-lg max-md:rounded-full`}
                >
                  <div
                    className={`  w-full h-full flex justify-center items-center bg-cover rounded-md max-md:rounded-full `}
                    style={{
                      backgroundImage:
                        "url(../../../../src/static/city-map-with-navigation-icons-vector.jpg)",
                    }}
                  >
                    <span
                      className={` flex justify-center items-center   h-8 w-30 px-4 text-center rounded-2xl bg-background  font-bold bg`}
                      onClick={() => {
                        handleShowMapContainer(true);
                      }}
                    >
                      <img src={locationIcon} alt="" className="h-4 mr-2 text-text-primary" />
                      Ver mapa
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* CONTENIDO DE HOTELES */}

        {showMapContainer ? (
          <div className="fixed top-0 left-0 z-20 h-screen w-screen flex flex-col justify-center items-center rounded-lg">
            <div className="h-full w-full sticky border-2 border-primary  overflow-hidden">
              <Map
                onClose={() => {
                  handleShowMapContainer(false);
                }}
                selectedHotelSearching={selectedHotelSearch}
                hotels={filteredHotels}
                userLocation={userLocation}
              />
              <div>
                <button
                  onClick={() => {
                    handleShowMapContainer(false);
                  }}
                  className="flex flex-row justify-center items-center bg-secondary  text-lg font-semibold p-2 border-4 border-white  max-md:w-40 w-2/6 fixed  bottom-6  left-1/2 transform -translate-x-1/2 shadow-md rounded-full "
                >
                  <img src={ListIcon} className="w-8 h-8 mx-2" />
                  <span className="h-full">Ver Lista</span>
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className=" contenedor-de-cards w-full py-5 lg:space-x-4 flex flex-row justify-center bg-background">
          {true && (
            <div
              className={`rounded-xl w-full h-full max-w-[350px] ${
                !showAllFilters ? "hidden " : "max-lg:w-0"
              } ${
                showAllFilters && windowWidth < 997
                  ? "w-[1px] border-none bg-transparent"
                  : ""
              } lg:flex flex-col justify-center items-center  bg-backgroundAlt `}
            >
              {!showAllFilters ? null : (
                <div className="w-full h-full flex flex-col items-center justify-start bg-black bg-opacity-70 fixed overflow-y-scroll scrollbar-hide top-0 left-0 z-40 lg:text-text-primary  text-start  text-sm lg:bg-background lg:z-0 lg:relative ">
                  <div
                    className={` lg:w-full w-96 h-auto  lg:relative  bg-background lg:bg-backgroundAlt  text-medium flex flex-col rounded-2xl lg:rounded-2xl p-4 `}
                  >
                    {/* atras */}
                    <span
                      className="w-full cursor-pointer lg:hidden "
                      onClick={() => handleShowAllFilters()}
                    >
                      <p className="text-xl text-end text-accent font-bold mx-6  my-4 ">
                        {" "}
                        Atras
                      </p>
                    </span>
                    {/* filter Chips */}
                    <div className="w-full max-w-5xl  h-auto flex flex-col items-center justify-center text-start  pb-8  text-medium rounded-2xl min-h-44 bg-backgroundAlt lg:bg-background ">
                      <FilterChips />
                    </div>
                    {/* ORDENAR */}
                    <span className="w-full md:hidden ">
                      <p className="text-xl  font-bold mx-6  my-4 text-start">
                        {" "}
                        Ordenar
                      </p>
                    </span>

                    <div className="md:hidden  w-full h-auto my-3 rounded-lg overflow-hidden text-primary lg:text-text-secondary bg-background p-4">
                      <div className="w-10/12 mb-12">
                        <div className="flex flex-col justify-between">
                          <div>
                            <label>
                              <input
                                className="h-5 w-5 my-2 mr-2 "
                                type="checkbox"
                                name="default"
                                value="default"
                                checked={sortBy === "default"}
                                onChange={handleSortChange}
                              />
                              Ninguno
                            </label>
                          </div>
                          <div>
                            <label>
                              <input
                                className="h-5 w-5 my-2 mr-2"
                                type="checkbox"
                                name="price"
                                value="price"
                                checked={sortBy === "price"}
                                onChange={handleSortChange}
                              />
                              Precio
                            </label>
                          </div>

                          <div>
                            <label>
                              <input
                                className="h-5 w-5 my-2 mr-2"
                                type="checkbox"
                                name="rating"
                                value="rating"
                                checked={sortBy === "rating"}
                                onChange={handleSortChange}
                              />
                              Puntuación
                            </label>
                          </div>
                          <div>
                            <label>
                              <input
                                className="h-5 w-5 my-2 mr-2"
                                type="checkbox"
                                name="capacity"
                                value="capacity"
                                checked={sortBy === "capacity"}
                                onChange={handleSortChange}
                              />
                              Capacidad
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className=" w-full mb-4 ">
                        <div className="w-full h-20 text-center flex flex-col items-center ">
                          <button
                            onClick={handleSortType}
                            className="bg-accent  rounded-lg  text-sm py-3 w-10/12 px-4 mx-3"
                          >{`${
                            sortTypeAsc ? "Descendente" : "Ascendente"
                          }`}</button>
                        </div>

                        <section className="w-full h-full flex justify-around ">
                          <button
                            onClick={() => {
                              handleResetSortChange();
                            }}
                            className=" w-1/3 h-10    cursor-pointer rounded-lg text-medium font-bold hover:text-primary hover:bg-background hover:border-2 hover:border-primary max-lg:bg-primary max-lg:text-white text-accent"
                          >
                            Limpiar
                          </button>

                          <button
                            onClick={handleShowSortBy}
                            className="w-1/3 h-10 bg-background border-2 border-primary   cursor-pointer rounded-lg text-medium font-bold hover:bg-primary hover:text-white"
                          >
                            Ordenar
                          </button>
                        </section>
                      </div>
                    </div>

                    <h2
                      className=" text-start mx-6 my-5 font-bold  text-xl"
                      onClick={() => handleShowAllFilters()}
                    >
                      Filtros
                    </h2>

                    <div className=" w-full h-auto flex flex-col items-center justify-center text-startshadow-sm rounded-md ">
                      {/*PRECIOS*/}
                      <div className=" w-full h-auto my-3 rounded-lg overflow-hidden text-primary lg:text-text-primary bg-background border-2 border-secondary lg:border-none">
                        {
                          <div className=" z-10 top-0 w-full flex flex-col text-start  shadow-sm rounded-2xl ">
                            <div className="flex flex-col px-6 py-3 w-full ">
                              <strong className="mb-10 text-xl text-center text-text-secondary lg:text-primary">
                                Define el rango de precios
                              </strong>
                              <label
                                htmlFor="priceMin"
                                className="flex flex-row space-x-3 w-full"
                              >
                                <section className="flex flex-row justify-between w-full">
                                  <span className="text-center mt-2 mb-4 font-semibold">
                                    {Number(filters.minPrice).toLocaleString(
                                      "es-CL",
                                      {
                                        style: "currency", // Aplica formato de moneda
                                        currency: "COP",
                                        maximumFractionDigits: 0,
                                      }
                                    )}
                                  </span>
                                  <strong className="text-center mt-2 mb-4 font-semibold ">
                                    -
                                  </strong>
                                  <span className="text-center mt-2 mb-4 font-semibold ">
                                    {Number(filters.maxPrice).toLocaleString(
                                      "es-CL",
                                      {
                                        style: "currency", // Aplica formato de moneda
                                        currency: "COP",
                                        maximumFractionDigits: 0,
                                      }
                                    )}
                                  </span>
                                </section>
                              </label>

                              <label
                                htmlFor="priceMax"
                                className="flex flex-col w-full text-md"
                              >
                                <Slider
                                  aria-label="Rango de precios"
                                  classNames={{
                                    base: "max-w-md",

                                    filler:
                                      "bg-gradient-to-r from-secondary-400 to-primary",
                                  }}
                                  formatOptions={{
                                    style: "currency",
                                    currency: "COP",
                                  }}
                                  value={[filters.minPrice, filters.maxPrice]}
                                  maxValue={500000}
                                  minValue={0}
                                  step={50}
                                  onChange={(value) => {
                                    handleFilterChange("maxPrice", value[1]);
                                    handleFilterChange("minPrice", value[0]);
                                  }}
                                />
                                <span className="text-center mt-2 mb-4 font-semibold"></span>
                              </label>
                              <div className="text-center text-xs mt-4 ">
                                * Los precios no incluyen cargos ni impuestos.
                              </div>
                            </div>
                            <div className=" py-2 mb-6 lg:hidden">
                              <section className="flex justify-around">
                                <button
                                  onClick={handleResetFilterPrice}
                                  className=" w-1/3 h-10    cursor-pointer rounded-lg text-medium font-bold hover:text-primary hover:bg-background hover:border-2 hover:border-primary max-lg:bg-primary max-lg:text-white text-accent"
                                >
                                  Desmarcar
                                </button>

                                <button className="hidden w-1/3 h-10 bg-primary cursor-pointer rounded-lg text-medium font-bold hover:bg-secondary">
                                  Aceptar
                                </button>
                              </section>
                            </div>
                          </div>
                        }
                      </div>

                      {/* FILTROS POPULARES */}
                      <div className="w-full h-auto my-3 rounded-lg overflow-hidden text-primary lg:text-text-primary bg-background border-2 border-secondary lg:border-none">
                        {
                          <div className="z-10 top-16 w-full  p-3 flex flex-col text-start   shadow-sm rounded-xl">
                            <section className="w-full flex flex-col items-center my-6">
                              <strong className="mb-10 text-xl text-center text-text-secondary lg:text-primary">
                                Puntuacion mínima del sitio
                              </strong>
                              <span className="text-center mt-2 mb-4 font-semibold text-secondary">
                                {filters.rating}
                              </span>
                              <section className="flex w-full justify-around">
                                <Slider
                                  aria-label="Puntuacion minima del sitio"
                                  classNames={{
                                    base: "max-w-md",

                                    filler:
                                      "bg-gradient-to-r from-secondary-400 to-primary",
                                  }}
                                  maxValue={10}
                                  minValue={0}
                                  step={0.2}
                                  value={[filters.rating]}
                                  onChange={(value) => {
                                    handleFilterChange("rating", value[0]);
                                  }}
                                  formatOptions={{
                                    style: "decimal",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  }}
                                  valueLabelDisplay="off"
                                />
                              </section>
                            </section>

                            <strong className="mb-10 text-start lg:text-primary">
                              Filtros populares
                            </strong>
                            <section className={` h-auto mb-10 flex flex-col `}>
                              <label>
                                <input
                                  type="checkbox"
                                  className="h-5 w-5 mr-2 my-2"
                                  checked={filters.services.includes(
                                    "Wi-Fi gratuito"
                                  )}
                                  onChange={(e) =>
                                    setFilters((prevFilters) => ({
                                      ...prevFilters,
                                      services: e.target.checked
                                        ? [
                                            ...prevFilters.services,
                                            "Wi-Fi gratuito",
                                          ]
                                        : prevFilters.services.filter(
                                            (service) =>
                                              service !== "Wi-Fi gratuito"
                                          ),
                                    }))
                                  }
                                />
                                Wifi
                              </label>

                              <label>
                                <input
                                  type="checkbox"
                                  className="h-5 w-5 mr-2 my-2"
                                  checked={filters.services.includes(
                                    "Restaurante"
                                  )}
                                  onChange={(e) =>
                                    setFilters((prevFilters) => ({
                                      ...prevFilters,
                                      services: e.target.checked
                                        ? [
                                            ...prevFilters.services,
                                            "Restaurante",
                                          ]
                                        : prevFilters.services.filter(
                                            (service) =>
                                              service !== "Restaurante"
                                          ),
                                    }))
                                  }
                                />
                                Restaurante
                              </label>

                              <label>
                                <input
                                  type="checkbox"
                                  className="h-5 w-5 mr-2 my-2"
                                  checked={filters.services.includes(
                                    "Lavanderia y tintoreria"
                                  )}
                                  onChange={(e) =>
                                    setFilters((prevFilters) => ({
                                      ...prevFilters,
                                      services: e.target.checked
                                        ? [
                                            ...prevFilters.services,
                                            "Lavanderia y tintoreria",
                                          ]
                                        : prevFilters.services.filter(
                                            (service) =>
                                              service !==
                                              "Lavanderia y tintoreria"
                                          ),
                                    }))
                                  }
                                />
                                Lavanderia
                              </label>

                              <label>
                                <input
                                  type="checkbox"
                                  className="h-5 w-5 mr-2 my-2"
                                  checked={filters.services.includes(
                                    "Aire acondicionado/calefacción"
                                  )}
                                  onChange={(e) =>
                                    setFilters((prevFilters) => ({
                                      ...prevFilters,
                                      services: e.target.checked
                                        ? [
                                            ...prevFilters.services,
                                            "Aire acondicionado/calefacción",
                                          ]
                                        : prevFilters.services.filter(
                                            (service) =>
                                              service !==
                                              "Aire acondicionado/calefacción"
                                          ),
                                    }))
                                  }
                                />
                                Aire acondicionado
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  className="h-5 w-5 mr-2 my-2"
                                  checked={filters.services.includes(
                                    "Parqueadero"
                                  )}
                                  onChange={(e) =>
                                    setFilters((prevFilters) => ({
                                      ...prevFilters,
                                      services: e.target.checked
                                        ? [
                                            ...prevFilters.services,
                                            "Parqueadero",
                                          ]
                                        : prevFilters.services.filter(
                                            (service) =>
                                              service !== "Parqueadero"
                                          ),
                                    }))
                                  }
                                />
                                Parqueadero
                              </label>
                            </section>
                            <div className=" py-2 ">
                              <section className="flex justify-around mb-6">
                                <button
                                  onClick={handleResetFiltros}
                                  className=" w-1/3 h-10    cursor-pointer rounded-lg text-medium font-bold hover:text-primary hover:bg-background hover:border-2 hover:border-primary max-lg:bg-primary max-lg:text-white text-accent"
                                >
                                  Desmarcar
                                </button>

                                <button className="hidden w-1/3 h-10 bg-primary cursor-pointer rounded-lg text-medium font-bold hover:bg-secondary">
                                  Aceptar
                                </button>
                              </section>
                            </div>
                          </div>
                        }
                      </div>

                      {/* TIPO DE PROPIEDAD*/}
                      <div className=" w-full h-auto my-3 rounded-lg overflow-hidden text-primary lg:text-text-primary bg-background border-2 border-secondary lg:border-none">
                        {
                          <div className=" z-10">
                            <div className="top-2 w-full  p-3 flex flex-col shadow-sm rounded-md ">
                              <strong className="mb-10 text-xl text-center text-text-secondary lg:text-primary">
                                Tipos de propiedades
                              </strong>
                              <div className={` mb-4 flex flex-col`}>
                                <label>
                                  <input
                                    className="cursor-pointer h-5 w-5 mr-2 my-2"
                                    type="checkbox"
                                    name="type"
                                    value=""
                                    checked={filters.type.length === 0}
                                    onChange={() =>
                                      setFilters((prevFilters) => ({
                                        ...prevFilters,
                                        type: [],
                                      }))
                                    }
                                  />
                                  Todos
                                </label>
                                <label>
                                  <input
                                    className="cursor-pointer h-5 w-5 mr-2 my-2"
                                    type="checkbox"
                                    name="type"
                                    value="hotel"
                                    checked={filters.type.includes("hotel")}
                                    onChange={(e) =>
                                      setFilters((prevFilters) => ({
                                        ...prevFilters,
                                        type: e.target.checked
                                          ? [...prevFilters.type, "hotel"]
                                          : prevFilters.type.filter(
                                              (type) => type !== "hotel"
                                            ),
                                      }))
                                    }
                                  />
                                  Hotel
                                </label>
                                <label>
                                  <input
                                    className="cursor-pointer h-5 w-5 mr-2 my-2"
                                    type="checkbox"
                                    name="type"
                                    value="casa"
                                    checked={filters.type.includes("casa")}
                                    onChange={(e) =>
                                      setFilters((prevFilters) => ({
                                        ...prevFilters,
                                        type: e.target.checked
                                          ? [...prevFilters.type, "casa"]
                                          : prevFilters.type.filter(
                                              (type) => type !== "casa"
                                            ),
                                      }))
                                    }
                                  />
                                  Casa
                                </label>
                                <label>
                                  <input
                                    className="cursor-pointer h-5 w-5 mr-2 my-2"
                                    type="checkbox"
                                    name="type"
                                    value="apartamento"
                                    checked={filters.type.includes(
                                      "apartamento"
                                    )}
                                    onChange={(e) =>
                                      setFilters((prevFilters) => ({
                                        ...prevFilters,
                                        type: e.target.checked
                                          ? [...prevFilters.type, "apartamento"]
                                          : prevFilters.type.filter(
                                              (type) => type !== "apartamento"
                                            ),
                                      }))
                                    }
                                  />
                                  Apartamento
                                </label>
                                <label>
                                  <input
                                    className="cursor-pointer h-5 w-5 mr-2 my-2"
                                    type="checkbox"
                                    name="type"
                                    value="campamento"
                                    checked={filters.type.includes(
                                      "campamento"
                                    )}
                                    onChange={(e) =>
                                      setFilters((prevFilters) => ({
                                        ...prevFilters,
                                        type: e.target.checked
                                          ? [...prevFilters.type, "campamento"]
                                          : prevFilters.type.filter(
                                              (type) => type !== "campamento"
                                            ),
                                      }))
                                    }
                                  />
                                  Campamento
                                </label>
                                <label>
                                  <input
                                    className="cursor-pointer h-5 w-5 mr-2 my-2"
                                    type="checkbox"
                                    name="type"
                                    value="hostal"
                                    checked={filters.type.includes("hostal")}
                                    onChange={(e) =>
                                      setFilters((prevFilters) => ({
                                        ...prevFilters,
                                        type: e.target.checked
                                          ? [...prevFilters.type, "hostal"]
                                          : prevFilters.type.filter(
                                              (type) => type !== "hostal"
                                            ),
                                      }))
                                    }
                                  />
                                  Hostal
                                </label>
                                <label>
                                  <input
                                    className="cursor-pointer h-5 w-5 mr-2 my-2"
                                    type="checkbox"
                                    name="type"
                                    value="motel"
                                    checked={filters.type.includes("motel")}
                                    onChange={(e) =>
                                      setFilters((prevFilters) => ({
                                        ...prevFilters,
                                        type: e.target.checked
                                          ? [...prevFilters.type, "motel"]
                                          : prevFilters.type.filter(
                                              (type) => type !== "motel"
                                            ),
                                      }))
                                    }
                                  />
                                  Motel
                                </label>
                              </div>
                              <div className=" py-2">
                                <section className="flex justify-around mb-6">
                                  <button
                                    onClick={handleResetFilterType}
                                    className=" w-1/3 h-10    cursor-pointer rounded-lg text-medium font-bold hover:text-primary hover:bg-background hover:border-2 hover:border-primary max-lg:bg-primary max-lg:text-white text-accent"
                                  >
                                    Desmarcar
                                  </button>

                                  <button className="hidden w-1/3 h-10 bg-primary cursor-pointer rounded-lg text-medium font-bold hover:bg-secondary">
                                    Aceptar
                                  </button>
                                </section>
                              </div>
                            </div>
                          </div>
                        }
                      </div>

                      {/* CAPACIDAD */}
                      <div className="w-full h-auto my-3 rounded-lg overflow-hidden text-primary lg:text-text-primary bg-background border-2 border-secondary lg:border-none">
                        {
                          <div className=" z-10  w-full flex flex-col text-start  shadow-sm rounded-md">
                            <div className="flex flex-col px-6 py-3 w-full">
                              <strong className="mb-10 text-xl text-center text-text-secondary lg:text-primary">
                                Elige la capacidad del hotel
                              </strong>
                              <span className="text-center mt-2 mb-4 font-semibold flex justify-center space-x-2">
                                <span> {Number(filters.minCapacity)}</span>
                                <span>-</span>
                                <span>{Number(filters.maxCapacity)}</span>
                              </span>
                              <label
                                htmlFor="priceMax"
                                className="flex flex-col w-full text-md"
                              >
                                <Slider
                                  aria-label="Rango de capacidad"
                                  classNames={{
                                    base: "max-w-md",

                                    filler:
                                      "bg-gradient-to-r from-secondary-400 to-primary",
                                  }}
                                  value={[
                                    filters.minCapacity || 1,
                                    filters.maxCapacity || 100,
                                  ]}
                                  maxValue={100}
                                  minValue={1}
                                  step={1}
                                  onChange={(value) => {
                                    handleFilterChange("minCapacity", value[0]);
                                    handleFilterChange("maxCapacity", value[1]);
                                  }}
                                />
                              </label>

                              <div className=" font-light text-xs mt-4 mb-10 text-secondary text-center">
                                * La capacidad se refiere a la cantidad de
                                habitaciones.
                              </div>
                            </div>
                            <div className="  py-2">
                              <section className="flex justify-around mb-6">
                                <button
                                  onClick={handleResetFilterCapacity}
                                  className=" w-1/3 h-10    cursor-pointer rounded-lg text-medium font-bold hover:text-primary hover:bg-background hover:border-2 hover:border-primary max-lg:bg-primary max-lg:text-white text-accent"
                                >
                                  Desmarcar
                                </button>

                                <button className="hidden w-1/3 h-10 bg-primary cursor-pointer rounded-lg text-medium font-bold hover:bg-secondary">
                                  Aceptar
                                </button>
                              </section>
                            </div>
                          </div>
                        }
                      </div>

                      {/* UBUCACION */}
                      <div className="w-full h-auto my-3 rounded-lg overflow-hidden text-primary lg:text-text-primary bg-background border-2 border-secondary lg:border-none">
                        {
                          <div className=" w-full">
                            <div className="  w-full  p-3 flex flex-col text-start shadow-sm rounded-md ">
                              <strong className="mb-10 text-xl text-center text-text-secondary lg:text-primary">
                                Ubicaciones
                              </strong>
                              <div className={`mb-10 flex flex-col`}>
                                <select
                                  className="cursor-pointer h-10 w-full rounded-lg border border-none p-2 bg-backgroundAlt text-text-secondary"
                                  value={filters.location[0] || ""}
                                  onChange={(e) => {
                                    const selectedLocation = e.target.value;
                                    setFilters((prevFilters) => ({
                                      ...prevFilters,
                                      location: selectedLocation
                                        ? [selectedLocation]
                                        : [],
                                    }));
                                  }}
                                >
                                  <option value="">
                                    Selecciona una ubicación
                                  </option>
                                  {mainLocations.map((location) => (
                                    <option
                                      key={location.id}
                                      value={location.name}
                                    >
                                      {capitalizeWords(location.name)}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="  py-2">
                                <section className="flex justify-around mb-6">
                                  <button
                                    onClick={handleResetFilterLocation}
                                    className=" w-1/3 h-10    cursor-pointer rounded-lg text-medium font-bold hover:text-primary hover:bg-background hover:border-2 hover:border-primary max-lg:bg-primary max-lg:text-white text-accent"
                                  >
                                    Desmarcar
                                  </button>

                                  <button className="hidden w-1/3 h-10 bg-primary cursor-pointer rounded-lg text-medium font-bold hover:bg-secondary">
                                    Aceptar
                                  </button>
                                </section>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    </div>

                    {/*BOTONES */}
                    <div className=" z-10 z- w-full h-14">
                      <section className="flex justify-around h-full w-full ">
                        <button
                          onClick={() => {
                            handleResetFilterPrice();
                            handleResetFilterType();
                            handleResetFiltros();
                            handleResetFilterLocation();
                            handleResetFilterCapacity();
                          }}
                          className=" w-1/3 h-10 border-2 border-borderr    cursor-pointer rounded-lg text-medium font-bold hover:text-primary hover:bg-background hover:border-2 hover:border-primary max-lg:bg-primary max-lg:text-white text-accent"
                        >
                          Limpiar todo
                        </button>

                        <button
                          onClick={() => {
                            window.scrollTo(0, 0);
                            setshowAllFilters(false);
                          }}
                          className="lg:hidden w-1/3 h-10 bg-white text-primary border-2 border-primary lg:border-none cursor-pointer rounded-lg text-medium font-bold hover:bg-primary hover:text-white"
                        >
                          Aplicar
                        </button>
                      </section>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <ol className="w-full flex flex-col justify-start  ">
            {" "}
            {isLoadingHotels ? (
              <SkeletonCardHotel />
            ) : // si sortedHotels esta vacio, mostrar mensaje de no hay resultados
            sortedHotels().length === 0 ? (
              <div className="w-full flex justify-center items-center">
                <strong className="text-2xl">No hay resultados</strong>
              </div>
            ) : (
              sortedHotels().map((el) => <CardHotel hotel={el} key={el.id} />)
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Home;
/*


*/
