import React, { useContext } from "react";
import { loginContext } from "../../../context/loginContext";


const FilterChips = () => {
  // Asumimos que en el contexto global tienes: filters y setFilters
  const { filters, setFilters } = useContext(loginContext);

  // Función para remover un filtro. Si es array, elimina el item especificado, de lo contrario, lo resetea.
  const handleRemoveFilter = (key, valueToRemove = null) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      // Si el valor es un array, elimina el item que coincida, o si no se especifica, limpia el array.
      if (Array.isArray(newFilters[key])) {
        if (valueToRemove !== null) {
          newFilters[key] = newFilters[key].filter((item) => item !== valueToRemove);
        } else {
          newFilters[key] = [];
        }
      } else {
        // Para valores no-array, simplemente lo resetea (por ejemplo, a cadena vacía)
        newFilters[key] = "";
      }
      return newFilters;
    });
  };

  // Recorremos el objeto de filtros y renderizamos solo los valores no vacíos
  const renderedChips = Object.entries(filters).flatMap(([key, value]) => {
    // Si el valor es un array y tiene elementos, renderiza cada uno
    if (Array.isArray(value)) {
      return value.map((item, index) => {
        if (!item) return []; // Si el item es vacío, lo omitimos
        return (
          <div key={`${key}-${index}`} className="chip bg-accent bg-opacity-80 text-text-primary rounded-full px-3 flex items-center space-x-2 m-2 text-sm border border-accent">
            <span>{item}</span>
            <button
              onClick={() => handleRemoveFilter(key, item)}
              className="text-xl font-bold text-primary p-0"
            >
             &times;
            </button>
          </div>
        );
      });
    } else {
      // Para valores no array, si no están vacíos, se renderiza el chip
      if (!value) return [];
      return (
        <div key={key} className="chip bg-accent bg-opacity-80 text-text-primary rounded-full px-3 flex items-center space-x-2 m-2 text-sm border border-accent">
          <span>{value}</span>
          <button
            onClick={() => handleRemoveFilter(key)}
            className="text-xl font-bold text-primary"
          >
            &times;
          </button>
        </div>
      );
    }
  });

  return (
    <div className="filter-chips-container flex flex-wrap  ">
      {renderedChips.length > 0 ? renderedChips : <p className="h-full w-full text-sm text-secondary">Ningun filtro seleccionado</p>}
    </div>
  );
};

export default FilterChips;
