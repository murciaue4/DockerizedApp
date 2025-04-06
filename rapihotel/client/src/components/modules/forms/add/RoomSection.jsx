import { useState, useEffect, useContext } from 'react';
import Alerta from '../../alerts/AlertStandard';
import { loginContext } from '../../../../context/loginContext';

const RoomSection = ({ setHabitaciones, hab }) => {
  const {roomTypes, } = useContext(loginContext);
  // Estado para almacenar las habitaciones agregadas
  const [rooms, setRooms] = useState(hab || []);
  const [showAlert, setShowAlert] = useState(false);
const handleHideAlert = () => {
  setShowAlert(false)
}
const handShowAlert = () => {
  setShowAlert(true)
}


  // Actualizar el estado del padre con las habitaciones mediante un useEffect para que se actualice cada vez que se agregue una habitación
  useEffect(() => {
    console.log('rooms', rooms);
    setHabitaciones(rooms);
  }, [rooms]);

  // Estado para almacenar los datos de una nueva habitación
  const [newRoom, setNewRoom] = useState({
    type: "",
    quantity: "",
    price: "",
    available: 0,
  });

  // Estado para almacenar errores
  const [err, setErr] = useState(null);
 

  // Tipos de habitaciones disponibles
 

  // Manejador de cambios en los inputs del formulario de nueva habitación
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleSetAllAvailable = (e) => {
    if (e.target.checked) {
      setNewRoom({ ...newRoom, available: newRoom.quantity });
    } else {
      setNewRoom({ ...newRoom, available: 0 });
    }
  };

  // Función para validar los inputs
  const validateInputs = (room) => {
    
    
    // Validación para campos vacíos
    if (!room.type || room.quantity === "" || room.price === "" || room.available === "") {
      setErr({
        AlertTitle: 'Campos incompletos',
        AlertString: 'Por favor, completa todos los campos antes de añadir una habitación.',
        AlertType: 'warning',
        onClose: handleHideAlert
      });
      handShowAlert();
      return false;
    }
  
    // Validación para cantidad de habitaciones
    if (Number(room.quantity) === 0) {
      setErr({
        AlertTitle: 'Añade tus habitaciones!',
        AlertString: 'La cantidad no puede ser 0.',
        AlertType: 'warning',
        onClose: handleHideAlert
      });
      handShowAlert();
      return false;
    }
  
    // Validación para precio de habitaciones
    if (Number(room.price) === 0) {
      setErr({
        AlertTitle: 'Precio inválido',
        AlertString: 'El precio no puede ser 0. Por favor, establece un precio válido.',
        AlertType: 'warning',
        onClose: handleHideAlert
      });
      handShowAlert();
      return false;
    }
  
    // Validación para cantidad disponible mayor a la cantidad total
    if (Number(room.available) > Number(room.quantity)) {
      setErr({
        AlertTitle: 'Añade tus habitaciones!',
        AlertString: 'La cantidad disponible NO puede ser mayor que la cantidad total de habitaciones.',
        AlertType: 'warning',
        onClose: handleHideAlert
      });
      handShowAlert();
      return false;
    }
  
    // Validación para números negativos
    if (Number(room.quantity) < 0 || Number(room.price) < 0 || Number(room.available) < 0) {
      setErr({
        AlertTitle: 'Valores negativos',
        AlertString: 'Los valores de cantidad, precio y disponibles no pueden ser negativos.',
        AlertType: 'warning',
        onClose: handleHideAlert
      });
      handShowAlert();
      return false;
    }
  
    setErr(null);
    return true;
  };
  

  // Función para agregar una nueva habitación a la lista
  const addRoom = (e) => {
    e.preventDefault();
    setNewRoom({ ...newRoom, name: roomTypes[Number(newRoom.type)]?.name });

    if (validateInputs(newRoom)) {
      setRooms([...rooms, { ...newRoom }]);
      setNewRoom({ type: "", quantity: "", price: "", available: 0 });
      window.scrollTo(0, 0); // Desplazar al inicio de la página
    } 
    return;
  };

  // Calcular el total de habitaciones agregadas
 

  // Filtrar los tipos de habitaciones disponibles que aún no han sido agregados
  const availableRoomTypes = roomTypes?.filter(
    (roomType) => !rooms?.some((room) => Number(room.type) === Number(roomType.id))
  );

  return (
    <section className="flex flex-row justify-center w-full shadow-border-blur rounded-3xl overflow-hidden bg-white">

      {/* Formulario para agregar nuevas habitaciones */}

      <div className="flex flex-col items-end rounded-xl  text-center w-full max-w-7xl ">
        
        <div className="w-full p-2   md:flex md:space-x-2 ">
          <h2 className="font-bold text-lg mb-4 w-full text-secondary">
            Habitaciones que ofrece tu propiedad
          </h2>

          {/* Selector de tipo de habitación */}
          <div className="w-full mb-3">
            <label className="block text-left mb-1 font-medium text-gray-700">
              Tipo de habitación
            </label>
            <select
              className="border-2 border-primary h-10 px-2 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="type"
              value={newRoom.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecciona el tipo</option>
              {availableRoomTypes.map((roomType) => (
                <option key={roomType.name} value={roomType.id}>
                  {roomType.room_description}
                </option>
              ))}
            </select>
          </div>

          {/* Input de cantidad */}
          <div className="flex flex-row justify-between w-full ">
            <div className="w-full mr-1">
              <label className="block text-left mb-1 font-medium text-gray-700">
                Cantidad
              </label>
              <input
                className="border-2 border-primary h-10 px-2 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                name="quantity"
                placeholder="Cantidad"
                value={newRoom.quantity}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Input de precio */}
            <div className="w-full ml-1">
              <label className="block text-left mb-1 font-medium text-gray-700">
                Precio
              </label>
              <input
                className="border-2 border-primary h-10 px-2 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                name="price"
                placeholder="Precio"
                value={newRoom.price}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Input de disponibles */}
          <div className="w-full mb-3">
            <label className="block text-left mb-1 font-medium text-gray-700">
              Disponibles
            </label>
            <div className="flex items-center w-full">
              <input
                className="border-2 border-primary h-10 px-2 rounded-md w-1/2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                name="available"
                placeholder="Disponibles"
                value={newRoom.available}
                onChange={handleInputChange}
                required
              />
              <label className="text-sm ml-2 flex items-center">
                <input
                  type="checkbox"
                  onChange={handleSetAllAvailable}
                  name="setAllAvailable"
                  className="mr-1"
                />
                Todas
              </label>
            </div>
          </div>
        </div>

        {/* Botón para agregar habitación */}
        <button
          onClick={addRoom}
          className="bg-background text-accent h-12 text-xl font-semibold py-1 px-6 rounded-b-xl w-full transition duration-200 md:w-auto md:rounded-t-xl md:mr-6 md:mb-5"
        >
          Añadir
        </button>
        {showAlert && <Alerta {...err} />}
      </div>
    </section>
  );
};

export default RoomSection;
