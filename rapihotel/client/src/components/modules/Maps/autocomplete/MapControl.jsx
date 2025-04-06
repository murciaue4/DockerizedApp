
import { ControlPosition, MapControl } from '@vis.gl/react-google-maps';
import  PlaceAutocompleteClassic  from './AutocompleteClassic';


const CustomMapControl = ({
  controlPosition,
  selectedAutocompleteMode,
  onPlaceSelect
}) => {
  const { id } = selectedAutocompleteMode;

  return (
    <MapControl position={controlPosition}>
      <div className="autocomplete-control w-screen max-w-[600px] h-12 mt-16  px-3  rounded-full  ">
        {id === 'classic' && (
          <PlaceAutocompleteClassic onPlaceSelect={onPlaceSelect} />
        )}

      </div>
    </MapControl>
  );
};

export default CustomMapControl;