import React, { useState, useContext, useEffect } from "react";
import { geoLocationContext } from "../../../../context/geoLocationContext";
import { capitalizeWords } from "../../../../helpers";

function Modal({ onClose, setLocations, locations }) {
  const { mainLocations } = useContext(geoLocationContext);
  const [selectedLocations, setSelectedLocations] = useState("");

  // Synchronize the state with the prop `locations`
  useEffect(() => {
    setSelectedLocations(locations || "");
  }, [locations]);

  const handleLocationClick = (location) => {
    const locationName = capitalizeWords(location);
    setLocations(locationName);
    setSelectedLocations(locationName);
    onClose(); // Close the modal after selecting the location

    console.log("Ubicación seleccionada:", locationName);
  };
  console.log("selectedLocations", selectedLocations);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-background w-full max-w-md rounded-xl shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Sector</h2>
        </div>

        {/* Modal Content */}
        <div className="p-4">
          <div
            className={`border w-full h-full flex flex-col gap-2 rounded-xl p-1 bg-secondary ${
              selectedLocations === "" ? "bg-opacity-30" : "bg-opacity-90"
            }`}
          >
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-text-primary"
            >
              ¿Adónde quieres ir?
            </label>
            <div className="relative rounded-md w-full h-full flex items-center">
              <input
                type="text"
                id="destination"
                aria-label="¿Adónde quieres ir?"
                placeholder="Puerto Gaitán, Meta, Colombia"
                value={selectedLocations}
                onChange={(e) => setSelectedLocations(e.target.value)}
                className="block w-full text-primary text-lg font-bold rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 p-2"
              />
              <button className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="w-5 h-5 text-primary"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12a10 10 0 1 1 20 0 10 10 0 1 1-20 0zm13.59 5L17 15.59 13.41 12 17 8.41 15.59 7 12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="mt-4 max-h-64 overflow-y-auto">
            <ul>
              {mainLocations?.map((item, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLocationClick(item.name)}
                >
                  <strong>{capitalizeWords(item.name)}</strong>
                  {item.direction && (
                    <div className="text-sm text-gray-500">
                      {item.direction}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
