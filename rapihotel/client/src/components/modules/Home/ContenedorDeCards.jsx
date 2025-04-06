import { useState, useEffect } from "react";
import FilterChips from "./FilterChips"; // Asegúrate de importar tu componente
import CardHotel from "./CardHotel"; // Componente de las cards
import SkeletonCardHotel from "./SkeletonCardHotel"; // Componente para loading

// Componente Modal para filtros
function FiltersModal({
  show,
  onClose,
  handleSortChange,
  sortBy,
  sortTypeAsc,
  handleSortType,
  handleResetSortChange,
  handleResetFilterPrice,
  handleResetFilterType,
  handleResetFiltros,
  handleResetFilterLocation,
  handleResetFilterCapacity,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-secondary text-white w-full max-w-[350px] p-4 rounded-xl relative">
        {/* Botón para cerrar el modal */}
        <button onClick={onClose} className="absolute top-2 right-2 text-xl font-bold">
          X
        </button>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Filtros</h2>
          <div className="mb-4">
            <FilterChips />
          </div>

          {/* Ejemplo de filtros de ordenamiento */}
          <h3 className="text-lg font-bold mb-2">Ordenar</h3>
          <div className="flex flex-col">
            <label className="mb-2">
              <input
                className="h-5 w-5 mr-2"
                type="checkbox"
                name="default"
                value="default"
                checked={sortBy === "default"}
                onChange={handleSortChange}
              />
              Ninguno
            </label>
            <label className="mb-2">
              <input
                className="h-5 w-5 mr-2"
                type="checkbox"
                name="price"
                value="price"
                checked={sortBy === "price"}
                onChange={handleSortChange}
              />
              Precio
            </label>
            <label className="mb-2">
              <input
                className="h-5 w-5 mr-2"
                type="checkbox"
                name="rating"
                value="rating"
                checked={sortBy === "rating"}
                onChange={handleSortChange}
              />
              Puntuación
            </label>
            <label className="mb-2">
              <input
                className="h-5 w-5 mr-2"
                type="checkbox"
                name="capacity"
                value="capacity"
                checked={sortBy === "capacity"}
                onChange={handleSortChange}
              />
              Capacidad
            </label>
          </div>
          <button
            onClick={handleSortType}
            className="bg-accent rounded-lg text-sm py-2 px-4 my-4"
          >
            {sortTypeAsc ? "Descendente" : "Ascendente"}
          </button>

          <div className="flex justify-around">
            <button
              onClick={() => {
                handleResetSortChange();
                handleResetFilterPrice();
                handleResetFilterType();
                handleResetFiltros();
                handleResetFilterLocation();
                handleResetFilterCapacity();
              }}
              className="border rounded-lg px-4 py-2"
            >
              Limpiar
            </button>
            <button
              onClick={onClose}
              className="bg-primary rounded-lg px-4 py-2"
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContenedorDeCards({
  isLoadingHotels,
  sortedHotels,
  handleSortChange,
  sortBy,
  sortTypeAsc,
  handleSortType,
  handleResetSortChange,
  handleResetFilterPrice,
  handleResetFilterType,
  handleResetFiltros,
  handleResetFilterLocation,
  handleResetFilterCapacity,
}) {
  const [showModal, setShowModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Actualiza el ancho de ventana en cada resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleFiltersModal = () => setShowModal((prev) => !prev);

  return (
    <div className="contenedor-de-cards w-full py-5 lg:space-x-4 flex flex-row justify-center bg-background">
      {/* Para pantallas menores a lg se muestra botón que abre el modal */}
      {windowWidth < 1024 && (
        <div className="w-full flex justify-center mb-4">
          <button
            onClick={toggleFiltersModal}
            className="bg-primary text-white py-2 px-4 rounded-lg"
          >
            Filtros
          </button>
        </div>
      )}

      {/* Modal de filtros para pantallas xs a md */}
      {windowWidth < 1024 && (
        <FiltersModal
          show={showModal}
          onClose={toggleFiltersModal}
          handleSortChange={handleSortChange}
          sortBy={sortBy}
          sortTypeAsc={sortTypeAsc}
          handleSortType={handleSortType}
          handleResetSortChange={handleResetSortChange}
          handleResetFilterPrice={handleResetFilterPrice}
          handleResetFilterType={handleResetFilterType}
          handleResetFiltros={handleResetFiltros}
          handleResetFilterLocation={handleResetFilterLocation}
          handleResetFilterCapacity={handleResetFilterCapacity}
        />
      )}

      {/* Contenedor de filtros en línea para pantallas lg en adelante */}
      {windowWidth >= 1024 && (
        <div className="border rounded-xl w-full h-full max-w-[350px] lg:flex flex-col justify-center items-center bg-backgroundAlt">
          <div className="bg-secondary text-white w-full h-auto flex flex-col items-center justify-center text-start text-sm rounded-2xl p-2">
            <div className="w-full relative">
              <h2 className="text-xl font-bold my-4">Filtros</h2>
              <FilterChips />
            </div>
            {/* Aquí podrías agregar el resto de la interfaz de filtros similar a la versión modal */}
          </div>
        </div>
      )}

      {/* Contenedor de tarjetas de hoteles */}
      <ol className="w-full flex flex-col justify-start">
        {isLoadingHotels ? (
          <SkeletonCardHotel />
        ) : sortedHotels().length === 0 ? (
          <div className="w-full flex justify-center items-center">
            <strong className="text-2xl">No hay resultados</strong>
          </div>
        ) : (
          sortedHotels().map((el) => <CardHotel hotel={el} key={el.id} />)
        )}
      </ol>
    </div>
  );
}