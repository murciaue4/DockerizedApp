import { useState, useContext } from "react";
import Alert from "../../alerts/AlertStandard";
import RoomSection from "./RoomSection";
import { func } from "prop-types";
import { loginContext } from "../../../../context/loginContext";
import { geoLocationContext } from "../../../../context/geoLocationContext";
import { capitalizeFirstLetterOfText, capitalizeWords } from "../../../../helpers";

const FormHotel01 = ({ handleChangeForms, formData, onClose, next, back }) => {
  const {mainLocations } = useContext(geoLocationContext);
  const {roomTypes} = useContext(loginContext);
  const [currentForm, setCurrentForm] = useState(1);

  const [DataForm01, setDataForm01] = useState({
    city: "Puerto Gaitan",
    country: "Colombia",
    sector: "",
    directions: "",
    barrio: "",
    indications: "",
  });
  const [DataForm02, setDataForm02] = useState({
    type: "",
    name: "",
    groupName: "",
    telefono: "",
    segundoTelefono: "",
    email: "",
  });
  const [DataForm03, setDataForm03] = useState([]);

  const handleDataForm01 = (data) => {
    setDataForm01(data);
  };
  const handleDataForm02 = (data) => {
    setDataForm02(data);
  };
  const handleDataForm03 = (data) => {
    setDataForm03(data);
  };

  // --------------------------P R I M E R A PARTE-------------------

  const FormHotelPart01 = () => {

    if (formData.location) {
      const { city, country, sector, directions, barrio, indications } = formData.location;
      DataForm01.city = "puerto gaitan";
      DataForm01.department = "meta";
      DataForm01.country = "colombia";
      DataForm01.sector = sector;
      DataForm01.directions = directions;

      if (barrio) {
        DataForm01.barrio = barrio;
      }
      DataForm01.indications = indications;
    }


    const [form01Data, setForm01Data] = useState(
      DataForm01 || {
        city: "puerto gaitan",
        country: "colombia",
        department: "meta",
        sector: "",
        directions: "",
        barrio: "",
        indications: "",
      }
    );
    const [err, setErr] = useState(null);

    const handleChangeForms01Data = (e) => {
      const { name, value, type, checked } = e.target;
      setForm01Data((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

    const validateForm01 = () => {
      if (
        !form01Data.sector ||
        !form01Data.city ||
        !form01Data.country ||
        !form01Data.indications
      ) {
        setErr({ AlertTitle : 'Completa todos los campos!', AlertString : 'Es necesario que diligencies la iformacion completa requerida en este formulario.', AlertType: 'error', onClose : setErr  });
        setTimeout(() => {
          setErr(null);
        }, 6000);
        return false;
      }
      return true;
    };

    return (
      <div className="h-full w-full grid place-content-center bg-white">
      <div className=" w-screen h-auto my-5 flex flex-col justify-center items-center rounded-xl">
        <h1 className="text-4xl text-center mb-10 mx-2 font-bold">
        <span className=" text-secondary">Unos datos mas </span>
        de tu ubicación.
        </h1>
        <br />
        <form className="flex flex-col justify-around items-center m-3 h-full w-[90%]">
        <div className="flex flex-col justify-center items-center md:w-[900px] mb-14">
          <div className="w-full flex flex-col mb-3">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Sector
          </h1>
          <span className="w-full text-justify text-xl text-secondary mb-10">
            Indica el sector al que pertenece tu propiedad o el más
            cercano a esta.
          </span>
          <select
            className={`border border-gray-400 h-12 px-2 rounded-lg w-full text-xl ${
            form01Data.sector == "" && "text-gray-500"
            }`}
            name="sector"
            value={form01Data.sector}
            onChange={handleChangeForms01Data}
            required
          >
            <option className="text-md w-full p-0" value="">
            Seleccione una ubicación
            </option>
            {mainLocations.map((location, index) => (
            <option
              key={index}
              className="text-md w-full p-0"
              value={location.name}
            >
              {capitalizeWords(location.name)}
            </option>
            ))}
            <option className="text-md w-full p-0" value="Otro">
            Otro
            </option>
          </select>
          </div>

          <div className="w-full flex flex-col mb-5">
          <input
            className="border border-gray-400 h-12 px-2 rounded-lg w-full text-xl"
            type="text"
            name="city"
            value={form01Data.city.toUpperCase()}
            onChange={handleChangeForms01Data}
            required
          />
          </div>
          <div className="w-full flex flex-col mb-5">
          <input
            className="border border-gray-400 h-12 px-2 rounded-lg w-full text-xl"
            type="text"
            name="department"
            value={form01Data.department.toUpperCase()}
            onChange={handleChangeForms01Data}
            required
          />
          </div>

          <div className="w-full flex flex-col mb-5">
          <input
            className="border border-gray-400 h-12 px-2 rounded-lg w-full text-xl"
            type="text"
            name="country"
            placeholder="Pais"
            value={form01Data.country.toUpperCase()}
            onChange={handleChangeForms01Data}
            required
          />
          </div>
        </div>
        <div className="flex flex-col md:w-[900px] mb-5 ">
          <h1 className="text-2xl font-bold text-gray-800  mb-4">
          Dirección
          </h1>
          <span className="w-full text-justify text-xl mb-10 text-secondary">
          Agrega la dirección de tu propiedad, si no cuentas con una
          dirección específica puedes agregar una descripción breve del
          lugar.
          </span>
          <div className="w-full flex max-md:flex-col mb-5">
          <input
            className="border border-gray-400 h-12 px-2 rounded-lg w-full text-xl"
            type="text"
            name="directions"
            placeholder="Direccion (opcional)"
            value={form01Data.directions}
            onChange={handleChangeForms01Data}
          />
          </div>

          {form01Data.directions && (
          <div className="w-full flex flex-col mb-5">
            <input
            className="border border-gray-400 h-12 px-2 rounded-lg w-full text-xl"
            type="text"
            name="barrio"
            placeholder="Barrio"
            value={form01Data.barrio}
            onChange={handleChangeForms01Data}
            />
          </div>
          )}

          <div className="w-full flex flex-col mb-5">
          <textarea
            className="border border-gray-400 min-h-40 h-auto px-2 rounded-lg w-full text-xl text-wrap"
            type="textarea"
            name="indications"
            placeholder="Indicaciones del lugar"
            value={form01Data.indications}
            onChange={handleChangeForms01Data}
            required
          />
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center mt-20">
          <button
          onClick={() => {
            //poner el escroll en el inicioo de la pagina
            back(true);
            window.scrollTo(0, 0);
            onClose(false);
          }}
          type="button"
          className="w-full max-w-[500px] mb-5 flex justify-center items-center rounded-xl h-12 text-primary font-semibold bg-background"
          >
          Atras
          </button>
          <button
          onClick={() => {
            const isvalidated = validateForm01();
            if (isvalidated) {
            handleDataForm01(form01Data);
            handleChangeForms({ location: form01Data });
            setCurrentForm(2);
            //poner el escroll en el inicioo de la pagina
            window.scrollTo(0, 0);
            }
          }}
          type="button"
          className="w-full max-w-[500px] mb-5 flex justify-center items-center rounded-xl h-12 text-white font-semibold bg-primary"
          >
          Continuar
          </button>
        </div>
        </form>
      </div>
      {err ? <Alert {...err} /> : null}
      </div>
    );
  };

  // --------------------------S E G U N D A PARTE-------------------

  const FormHotelPart02 = () => {
    const [err, setErr] = useState(null);

    formData.type && (DataForm02.type = formData.type);
    formData.name && (DataForm02.name = formData.name);
    formData.groupName && (DataForm02.groupName = formData.groupName);
    formData.telefono && (DataForm02.telefono = formData.telefono);
    formData.segundoTelefono && (DataForm02.segundoTelefono = formData.segundoTelefono);
    formData.email && (DataForm02.email = formData.email);

    const [form02Data, setForm02Data] = useState(
      DataForm02 || {
        type: "",
        name: "",
        groupName: "",
        telefono: "",
        segundoTelefono: "",
        email: "",
      }
    );

    const handleChangeForms02Data = (e) => {
      const { name, value, type, checked } = e.target;
      setForm02Data((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

    const validateForm02 = () => {
      if (
        !form02Data.type ||
        !form02Data.name ||
        !form02Data.telefono ||
        !form02Data.email
      ) {
        setErr({ AlertTitle : 'Completa todos los campos!', AlertString : 'Es necesario que diligencies la iformacion completa requerida en este formulario.', AlertType: 'error', onClose : setErr });
        setTimeout(() => {
          setErr(null);
        }, 6000);

        return false;
      }
      if (!validarEmail(form02Data.email)) {
        setErr("Por favor, ingresa un correo electrónico válido.");
        setTimeout(() => {
          setErr(null);
        }, 6000);
        return false;
      }
      return true;
    };

    const validarEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    return (
      <div className="h-full w-full grid place-content-center bg-white">
        <div className="w-screen h-auto my-5 flex flex-col justify-center items-center rounded-xl">
          <h1 className="text-4xl text-center mb-10 font-bold">
            <span className=" text-secondary">Datos básicos </span>de tu
            propiedad<span className=" text-blue-400">...</span>
          </h1>

          <form className="flex flex-col justify-around items-center m-3 h-full w-[90%]">
            <div className="flex flex-col justify-center items-center md:w-[900px] mb-5">
              <div className="flex flex-col w-full mb-10 md:mb-5">
                <h1 className="font-extrabold text-3xl mb-2 text-gray-800">
                  Categoría
                </h1>
                <span className="text-xl mb-8 text-secondary">
                  Seleccione el tipo de propiedad que desea publicar
                </span>
                <select
                  className={`text-xl w-full border border-secondary rounded-md h-12 ${
                    form02Data.type == "" && "text-gray-500"
                  }`}
                  name="type"
                  value={form02Data.type}
                  onChange={handleChangeForms02Data}
                  required
                >
                  <option className="text-md w-full p-0" value="">
                    Tipo de propiedad
                  </option>
                  <option className="text-md w-full p-0" value="hotel">
                    Hotel
                  </option>
                  <option className="text-md w-full p-0" value="motel">
                    Motel
                  </option>
                  <option className="text-md w-full p-0" value="campamento">
                    Campamento
                  </option>
                </select>
              </div>

              <div className="flex flex-col w-full mb-5">
                <div className="flex flex-col mr-2 w-full mb-5">
                  <h1 className="font-extrabold text-3xl text-gray-800 mb-2">
                    Nombre de la propiedad
                  </h1>
                  <span className="text-xl mb-10 text-secondary">
                    Proporcione el nombre oficial de su propiedad.
                  </span>
                  <input
                    className="border outline-none border-secondary h-12 px-2 rounded-lg text-xl"
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={form02Data.name}
                    onChange={handleChangeForms02Data}
                    required
                  />
                </div>

                <div className="flex flex-col w-full">
                  <div className="flex items-center mb-5 border border-secondary rounded-lg px-2">
                    <input
                      className="outline-none w-full h-12 text-xl"
                      type="text"
                      name="groupName"
                      placeholder="Grupo/Franquicia (Opcional)"
                      value={form02Data.groupName}
                      onChange={handleChangeForms02Data}
                    />
                    <button className="relative h-6 w-6 border rounded-full border-blue-500 ml-2 group grid content-center">
                      <span className="absolute -right-7 text-sm w-96 h-auto border p-2 text-justify border-secondary bg-white rounded-lg shadow-lg hidden group-hover:block">
                        En este campo ingrese el nombre del grupo, red de
                        franquicias u organización a la que pertenece su
                        propiedad. Si NO PERTENECE a ninguna de las anteriores,
                        omita este paso.
                      </span>
                      ?
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full mb-5">
                <h1 className="font-extrabold text-3xl text-gray-800 mb-3">
                  Datos de contacto
                </h1>
                <span className="text-xl mb-4 text-secondary">
                  Te recomendamos que uses aquí información de contacto
                  exclusivo de tu negocio. Allí recibirás notificaciones e
                  información relacionada (no haga uso de su información de
                  contacto personal).
                </span>

                <div className="flex flex-col mb-5">
                  <input
                    className="border outline-none border-secondary h-12 px-2 rounded-lg text-xl"
                    type="text"
                    name="telefono"
                    placeholder="Teléfono 1"
                    value={form02Data.telefono}
                    onChange={handleChangeForms02Data}
                    required
                  />
                </div>
                <div className="flex flex-col mb-5">
                  <input
                    className="border outline-none border-secondary h-12 px-2 rounded-lg text-xl"
                    type="text"
                    name="segundoTelefono"
                    placeholder="Teléfono 2 (Opcional)"
                    value={form02Data.segundoTelefono}
                    onChange={handleChangeForms02Data}
                  />
                </div>

                <div className="flex lex-col w-full mb-5">
                  <input
                    className="border outline-none w-full border-secondary h-12 px-2 rounded-lg text-xl"
                    type="text"
                    name="email"
                    placeholder="Correo Electrónico"
                    value={form02Data.email}
                    onChange={handleChangeForms02Data}
                    required
                  />
                </div>

                <div className="w-full flex flex-col justify-center items-center mt-20">
                  <button
                    onClick={() => {
                      //poner el escroll en el inicioo de la pagina
                      setCurrentForm(1);
                      window.scrollTo(0, 0);
                    }}
                    type="button"
                    className="w-full max-w-[500px] mb-5 flex justify-center items-center rounded-xl h-12 text-primary font-semibold bg-background"
                  >
                    Atras
                  </button>
                  <button
                    onClick={() => {
                      if (validateForm02()) {
                        handleDataForm02(form02Data);
                        handleChangeForms(form02Data);
                        //ewgewsEEL SCROLL ARRIBA
                        window.scrollTo(0, 0);
                        setCurrentForm(3);
                      }
                    }}
                    type="button"
                    className="w-full max-w-[500px] mb-5 flex justify-center items-center rounded-xl h-12 text-white font-semibold bg-primary"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {err ? <Alert {...err} /> : null}
      </div>
    );
  };

  // --------------------------T E R C E R A PARTE-------------------

  const FormHotelPart03 = () => {
    const [err, setErr] = useState(null);
console.log('formdata en parte3from01', formData);
formData.rooms && (DataForm03['rooms'] = formData.rooms);
    // Crear un estado para guardar las habitaciones

    const [form03Data, setForm03Data] = useState(DataForm03.rooms || []);
    const [habitaciones, setHabitaciones] = useState(DataForm03.rooms || []);

    const handleChangeHabitaciones = (setter) => (newData) => {
      setter((prevData) => ({
        ...prevData,
        ...newData,
      }));
    };

    const validateForm03 = () => {
      if (Object.keys(form03Data).length === 0) {
        setErr({ AlertTitle : 'Añade tus habitaciones!', AlertString : 'Selecciona cuantas habitaciones tienes de cada tipo de habitacion y su precio, luego haz click en el boton [Añadir] ', AlertType: 'warning', onClose : func });
        setTimeout(() => {
          setErr(null);
        }, 6000);
        return false;
      }
      return true;
    };



    const handleSubmit = () => {
      if (validateForm03()) {
        handleChangeForms({ rooms: form03Data });
        next(true);
        onClose(false);
      }
    };
    console.log('habitaciones', form03Data);

    return (
      <div className="min-h-screen flex items-center justify-center bg-white w-screen ">
        <div className="w-11/12 max-w-4xl bg-white rounded-lg my-10">
          <h1 className="w-full  text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800">
            Capacidad <span className="text-secondary">y</span> precios
          </h1>

          <form className="">
            <div className="flex flex-col items-center space-y-6">
              {/* Sección de Habitaciones */}
              <div className="w-full">
                <RoomSection
                  setHabitaciones={handleChangeHabitaciones(setForm03Data)}
                  hab={habitaciones}
                />
              </div>

              {/* espacio para mapear las habitaciones */}

{
                Object.values(form03Data).map((habitacion, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between shadow-border-blur rounded-md w-full p-3 mb-2"
                  >
                    {/* Cantidad de habitaciones */}
                    <span className="text-base text-primary text-center md:w-20 border-r px-2">
                      <strong className=" text-lg">
                        {habitacion.quantity}{" "}
                      </strong>
                      <p className="text-sm text-alert">
                        Habitación{habitacion.quantity === 1 ? "" : "es"}
                      </p>
                    </span>

                    {/* Detalles de la habitación */}
                    <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-4 border-r px-2">
                      <span className="text-base font-medium text-primary md:w-40">
                        {roomTypes[Number(habitacion.type)-1].name}
                      </span>
                      <span className="text-secondary font-semibold md:text-right">
                        $ {habitacion.price}
                      </span>
                    </div>

                    {/* Botón de eliminar */}
                    <button 
                      onClick={() => {
                        const newForm03Data = { ...form03Data };
                        Object.keys(newForm03Data).forEach(key => {
                          if (newForm03Data[key].type === habitacion.type) {
                            delete newForm03Data[key];
                          }
                        });
                        setForm03Data(newForm03Data);
                        console.log('habitacion eliminada', newForm03Data);
                      }} 
                      className="bg-alert text-white font-bold rounded-full h-8 w-8 pb-1 mx-2 flex items-center justify-center hover:bg-red-600 transition duration-200"
                    >
                      x
                    </button>
                  </div>
                ))
}



              {/* Capacidad Total */}
              <section className="flex flex-col items-start w-full  pb-8">
                <span className=" text-md font-normal text-secondary">
                  {`${Object.values(form03Data).reduce(
                    (total, habitacion) => total + Number(habitacion.quantity),
                    0
                  )}`}
                  {` `}
                  Habitaciones
                </span>

                <span className=" text-md font-normal text-secondary">
                  {`${Object.values(form03Data).reduce(
                    (total, habitacion) => total + Number(habitacion.available),
                    0
                  )}`}
                  {` `}
                  Disponibles
                </span>
              </section>
            </div>
          </form>

          {/* Botón de Envío */}

          <div className="w-full flex flex-col justify-center items-center">
            <button
              onClick={() => {
                //poner el escroll en el inicioo de la pagina
                setCurrentForm(2);
                window.scrollTo(0, 0);
              }}
              type="button"
              className="w-full max-w-[500px] mb-5 flex justify-center items-center rounded-xl h-12 text-primary font-semibold bg-background"
            >
              Atras
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              className="w-full max-w-[500px] mb-5 flex justify-center items-center rounded-xl h-12 text-white font-semibold bg-primary"
            >
              Continuar
            </button>
          </div>

          {/* Error */}
          {err ? (
            <div className="mt-6">
              <Alert {...err} />
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentForm === 1 && <FormHotelPart01 />}
      {currentForm === 2 && <FormHotelPart02 />}
      {currentForm === 3 && <FormHotelPart03 />}
    </div>
  );
};

export default FormHotel01;
