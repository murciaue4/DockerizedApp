import {  useState } from "react";


import Errors from "../../alerts/Errors";


const LocationForm= ({ handleChangeForms, formData, onClose, next }) => {
    const [form01Data, setForm01Data] = useState({
      city: "Puerto Gaitan",
      country: "Colombia",
      sector: "",
      directions: "",
      barrio: "",
      indications: "",
    });

    const handleChangeForms01Data = (e) => {
      const { name, value, type, checked } = e.target;

      setForm01Data((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    };
    return (
      <div className=" h-full w-full grid place-content-center bg-red">
        <div className="shadow-md w-screen h-auto my-5 flex flex-col justify-center items-center rounded-xl  ">
          <h1 className="text-4xl text-center mb-10 font-extrabold ">
            Unos datos más de tu ubicación...
          </h1>
          <br />
          <form className="flex flex-col justify-around items-center m-3 h-full w-[90%] ">
            <div className=" flex flex-col justify-center items-center md:w-[900px]  mb-5 border  ">
              <div className="w-full flex flex-col mb-5">
                <h1 className="text-3xl font-extrabold">Localización</h1>
                <span className=" w-full text-justify text-xl mb-3">
                  Indica el sector que corresponda a tu ubicacion o el mas
                  cercano a esta, agrega ademas en orden consecutivo la ciudad y
                  el país.
                </span>

                <select
                  className="border  border-gray-400 h-12 px-2 rounded-lg w-full text-xl"
                  name="sector"
                  value={form01Data.sector}
                  onChange={handleChangeForms01Data}
                  required
                >
                  <option className="text-md w-full p-0" value="">
                    Seleccione una ubicación
                  </option>
                  <option className="text-md w-full p-0" value="el porvenir">
                    El Porvenir
                  </option>
                  <option className="text-md w-full p-0" value="buenos aires">
                    Buenos Aires
                  </option>
                  <option className="text-md w-full p-0" value="santa helena">
                    Santa Helena
                  </option>
                  <option className="text-md w-full p-0" value="el oasis">
                    El Oasis
                  </option>
                  <option className="text-md w-full p-0" value="cuerna vaca">
                    Cuerna Vaca
                  </option>
                  <option className="text-md w-full p-0" value="puerto gaitan">
                    Pto. Gaitan
                  </option>
                  <option className="text-md w-full p-0" value="Otro">
                    Otro
                  </option>
                </select>
              </div>

              <div className="w-full flex flex-col mb-5">
                <input
                  className={`border  border-gray-400 h-12 px-2 rounded-lg w-full text-xl`}
                  type="text"
                  name="city"
                  value={form01Data.city}
                  onChange={handleChangeForms01Data}
                  required
                />
              </div>

              <div className="w-full flex flex-col mb-5 ">
                <input
                  className={`border  border-gray-400 h-12 px-2 rounded-lg w-full text-xl`}
                  type="text"
                  name="country"
                  placeholder="Pais"
                  value={form01Data.country}
                  onChange={handleChangeForms01Data}
                  required
                />
              </div>
            </div>
            <div className=" flex flex-col  md:w-[900px]  mb-5  ">
              <h1 className="text-3xl font-extrabold">Dirección</h1>
              <span className=" w-full text-justify text-xl mb-3">
                Agrega la dirección de tu propiedad, si no cuentas con una
                dirección específica puedes agregar una descripción breve del
                lugar
              </span>
              <div className="w-full  flex max-md:flex-col mb-5 ">
                <input
                  className={`border  border-gray-400 h-12 px-2 rounded-lg w-full text-xl`}
                  type="text"
                  name="directions"
                  placeholder="Direccion "
                  value={form01Data.directions}
                  onChange={handleChangeForms01Data}
                />
              </div>

              {form01Data.directions && (
                <div className="w-full flex flex-col mb-5 ">
                  <input
                    className={`border  border-gray-400 h-12 px-2 rounded-lg w-full text-xl`}
                    type="text"
                    name="barrio"
                    placeholder="Barrio"
                    value={form01Data.barrio}
                    onChange={handleChangeForms01Data}
                  />
                </div>
              )}

              <div className="w-full flex flex-col mb-5   ">
                <input
                  className={`border  border-gray-400 h-12 px-2 rounded-lg w-full text-xl`}
                  type="text"
                  name="indications"
                  placeholder="Descripción del lugar"
                  value={form01Data.indications}
                  onChange={handleChangeForms01Data}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col w-full md:w-[900px]  mb-5 ">
              <button
                onClick={() => {
                  setCurrentForm(2);
                  handleChangeForms({ location: form01Data });
                }}
                type="button"
                className="w-full h-14 py-2 px-4 rounded-sm bg-blue-500 text-white text-2xl hover:bg-blue-600"
              >
                Siguiente
              </button>
            </div>
          </form>
        </div>
        {err.error ? <Errors error={err} /> : null}
      </div>
    );
  };

export default LocationForm;