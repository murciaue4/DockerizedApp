import { useRef, useEffect, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

const PlaceAutocompleteClassic = ({ onPlaceSelect }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      const place = placeAutocomplete.getPlace();
      if (place.geometry) {
        onPlaceSelect(place);
      } else {
        alert('Por favor, selecciona un lugar válido de la lista.');
      }
    });
  }, [onPlaceSelect, placeAutocomplete]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const place = placeAutocomplete.getPlace();
      if (place && place.geometry) {
        onPlaceSelect(place);
      } else {
        const firstPrediction = document.querySelector('.pac-item');
        if (firstPrediction) {
          firstPrediction.click();
        } else {
          alert('Ese lugar no existe. Por favor, selecciona un lugar válido de la lista.');
        }
      }
    }
  };

  return (
    <div className="autocomplete-container flex justify-center w-full h-full rounded-full">
      <input
        id="autocomplete-input"
        ref={inputRef}
        className="w-full h-full px-4 text-lg outline-none rounded-full"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default PlaceAutocompleteClassic;