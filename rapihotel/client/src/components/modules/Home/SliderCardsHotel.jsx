import React, { useState, useEffect, useContext } from "react";
import CardHotel from "./CardHotelMini";
import SkeletonCardHotel from "./SkeletonCardHotel";
import stringSimilarity from "string-similarity";
import { normalize } from "../../../helpers/index";
import { loginContext } from "../../../context/loginContext";

const HotelList = (hotel) => {
  // Contexto para obtener el estado de la ventana
  const { allHotels, isLoadingHotels } = useContext(loginContext);

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

  useEffect;

  // Filtrado de hoteles según los criterios definidos
  const filteredHotels = allHotels
    ? allHotels.filter((hotel) => {
        // Filtro por precio
        const priceCriteria =
          (filters.minPrice
            ? hotel.minPrice >= Number(filters.minPrice)
            : true) &&
          (filters.maxPrice
            ? hotel.maxPrice <= Number(filters.maxPrice)
            : true);

        // Filtro por servicios
        const serviceCriteria =
          filters.services && filters.services.length
            ? filters.services.every((service) =>
                hotel.services.some(
                  (hotelService) => hotelService.name === service
                )
              )
            : true;

        // Filtro por tipo
        const typeCriteria =
          filters.type && filters.type.length
            ? filters.type.includes(hotel.type)
            : true;

        // Filtros por capacidad
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

        // Filtro por ubicación (usando similitud de strings)
        const similarityThreshold = 0.4;
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

        // Filtro por término de búsqueda (en el nombre)
        const searchTermCriteria = filters.searchTerm
          ? hotel.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
          : true;

        // Filtro por rating
        const ratingCriteria = filters.rating
          ? Number(hotel.avg_rating) >= Number(filters.rating)
          : true;

        return (
          priceCriteria &&
          serviceCriteria &&
          typeCriteria &&
          capacityCriteria &&
          capacityCriteria2 &&
          capacityCriteria3 &&
          locationCriteria &&
          searchTermCriteria &&
          ratingCriteria
        );
      })
    : [];

  // Actualiza el ancho de la ventana para posibles ajustes responsivos
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className=" w-full h-auto py-4 flex flex-col card max-lg:bg-black max-lg:bg-opacity-90 bg-backgroundAlt bg-opacity-70 lg:rounded-2xl relative">
      {/* sombra lado izquierdo */}
      <div
        className="absolute top-0 left-0  w-[25px] lg:w-[40px] h-full opacity-90 lg:rounded-2xl z-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, black 10%, transparent 100%)",
        }}
      ></div>

      <div
        className="absolute top-0 right-0 w-[25px] lg:w-[40px] h-full opacity-90 lg:rounded-2xl z-40"
        style={{
          backgroundImage:
            "linear-gradient(to left, black 10%, transparent 100%)",
        }}
      ></div>

      <div className="p-2 text-text-alt flex flex-col justify-center items-center mb-10">
        <div className="text-4xl text-center max-sm:text-text-alt font-semibold my-2">
          Buscabas algo más?
        </div>
        <span className="text-accent">Encuentra opciones similares con el mejor precio del lugar</span>
      </div>
      <ol className="w-full flex flex-row space-x-3 px-7 overflow-x-auto ">
        {isLoadingHotels ? (
          <SkeletonCardHotel />
        ) : filteredHotels.length === 0 ? (
          <div className="w-full flex justify-center items-center">
            <strong className="text-2xl text-accent">No hay resultados</strong>
          </div>
        ) : (
          filteredHotels.map((hotel) => (
            <div key={hotel.id} className=" ">
              <li className="flex-shrink-0 h-auto p-2">
                <CardHotel hotel={hotel} />
              </li>
            </div>
          ))
        )}
      </ol>
    </div>
  );
};

export default HotelList;
