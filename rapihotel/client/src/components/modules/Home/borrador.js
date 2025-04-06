// Importaciones y contexto
const { isLoadingHotels, allHotels } = useContext(loginContext);

// Estados y manejadores
const [showPrices, setShowPrices] = useState(false);
const [showFiltros, setshowFiltros] = useState(false);
const [showType, setshowType] = useState(false);
const [showCapacity, setshowCapacity] = useState(false);
const [showLocation, setshowLocation] = useState(false);
const [showAllFilters, setshowAllFilters] = useState(false);
const [showSortBy, setShowSortBy] = useState(false);
const [showMapContainer, setShowMapContainer] = useState(false);

// Estado de filtros iniciales ajustados
const [filters, setFilters] = useState({
  searchTerm: "",
  minPrice: "",
  maxPrice: "",
  services: [], // Almacena nombres de servicios seleccionados
  type: [], // Tipos seleccionados (e.g., hotel, apartamento)
  minCapacity: "",
  maxCapacity: "",
  location: "", // Buscar por ciudad, sector, etc.
});

// Estado de ordenamiento
const [sortBy, setSortBy] = useState("default");
const [sortTypeAsc, setSortTypeAsc] = useState(false);

// Manejador para cambios en filtros
const handleFilterChange = (filter, value) => {
  setFilters((prevFilters) => ({
    ...prevFilters,
    [filter]: value,
  }));
};

// Filtrado de hoteles
const filteredHotels = allHotels
  ? allHotels.filter((hotel) => {
      // Filtros por servicios
      const serviceCriteria =
        filters.services.length > 0
          ? filters.services.every((service) =>
              hotel.services.some((hotelService) => hotelService.name === service)
            )
          : true;

      // Filtro por tipo
      const typeCriteria =
        filters.type.length > 0 ? filters.type.includes(hotel.type) : true;

      // Filtro por capacidad
      const capacityCriteria =
        (filters.minCapacity ? hotel.capacity >= filters.minCapacity : true) &&
        (filters.maxCapacity ? hotel.capacity <= filters.maxCapacity : true);

      // Filtro por ubicación (ciudad, sector, etc.)
      const locationCriteria = filters.location
        ? Object.values(hotel.location)
            .join(" ")
            .toLowerCase()
            .includes(filters.location.toLowerCase())
        : true;

      // Filtro por término de búsqueda
      const searchTermCriteria = filters.searchTerm
        ? hotel.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
        : true;

      return (
        serviceCriteria &&
        typeCriteria &&
        capacityCriteria &&
        locationCriteria &&
        searchTermCriteria
      );
    })
  : [];

// Ordenar hoteles
const sortedHotels = () => {
  let sorted = [...filteredHotels];
  if (sortBy === "price") {
    sorted.sort((a, b) => (sortTypeAsc ? a.price - b.price : b.price - a.price));
  } else if (sortBy === "capacity") {
    sorted.sort((a, b) => (sortTypeAsc ? a.capacity - b.capacity : b.capacity - a.capacity));
  }
  return sorted;
};


{/* BARRA DE BÚSQUEDA */}
<div className="SearchBar h-auto w-full flex justify-center md:bg-white sticky top-0">
  <div className="h-10 shadow-md max-md:w-90 lg:w-1/3 flex items-center justify-between border bg-white rounded-full border-gray-300 pl-2 my-4">
    {/* Icono de búsqueda */}
    <img src={searchIcon} alt="Buscar" className="w-6 h-6" />

    {/* Campo de entrada */}
    <input
      type="text"
      className="flex-grow outline-none px-2 text-sm md:text-xl"
      placeholder="Buscar por nombre o descripción..."
      value={filters.searchTerm}
      onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
    />

    {/* Botón para limpiar */}
    {filters.searchTerm && (
      <button
        className="h-8 w-8 ml-2 p-1 bg-gray-200 text-gray-500 rounded-full hover:bg-red-500 hover:text-white transition-colors"
        onClick={() => handleFilterChange("searchTerm", "")}
        aria-label="Limpiar búsqueda"
      >
        <img src={dropIcon} alt="Limpiar" className="h-full w-full" />
      </button>
    )}
  </div>
</div>
//antes
 {/* BARRA DE BUSQUEDA */}
      <div className="-SearchBar h-auto w-full flex justify-center md:bg-white sticky top-0 ">
        <div className="h-10 shadow-md max-md:w-90 lg:w-1/3 flex items-center justify-between border bg-white rounded-full border-gray-300  pl-2 my-4 ">
          <img src={searchIcon} alt="" className="w-6 h-6" />

          <input
            type="text"
            className="flex flex-row justify-between outline-none px-2 text-xl"
            placeholder="Buscar por nombre..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
          />
          <button
            className=" h-full ml-2 p-2 bg-white text-white rounded-full hover:bg-blue-600"
            onClick={() => handleFilterChange("searchTerm", "")}
          >
            <img src={dropIcon} alt="" className="h-full w-full" />
          </button>
        </div>
      </div>