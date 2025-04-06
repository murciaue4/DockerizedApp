import { useState, useEffect } from "react";
import Errors from "../../alerts/Errors";

const AddHotelForm02 = ({ handleChangeForms, formData, servicesList, next, back, onClose }) => {
  const [err, setErr] = useState(null);
  const [formData02, setFormData02] = useState({
    description: formData.descripcion || "",
    services: formData.servicios || [],
  });

  const services = servicesList

  console.log(services)

 useEffect(() => {
  console.log('formData', formData);
  console.log('formData02', formData02);
  }, [formData02]);

  const handleSetErr = (err) => {
    setErr(err);
    setTimeout(() => {
      setErr(null);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   

    if (!formData02.description.trim()) {
      handleSetErr("La descripción no puede estar vacía.");
      return;
    }

    if (formData02.services.length === 0) {
      handleSetErr("Debe seleccionar al menos un servicio.");
      return;
    }
    handleChangeForms({
      ...formData,
      descripcion: formData02.description,
      servicios: formData02.services,
    });
    next(true);
    onClose(false);
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    console.log('name', name?.toString());
    console.log('value', value);

    if (name === "description") {
      setFormData02((prev) => ({ ...prev, description: value }));
    }

  };
  const handleChangeFormService = (e) => {
    e.stopPropagation();
    const selected = Array.from(e.target.selectedOptions).map(option =>
        parseInt(option.value, 10)
    );
    console.log('selected services', selected);
    setFormData02((prev) => ({ ...prev, services: selected }));
};

const handleCheckboxChange = (e) => {
  const value = parseInt(e.target.value, 10);
  if (e.target.checked) {
    setFormData02((prev) => ({
      ...prev,
      services: [...prev.services, value],
    }));
  } else {
    setFormData02((prev) => ({
      ...prev,
      services: prev.services.filter((serviceId) => serviceId !== value),
    }));
  }
};


  // const handleServiceChange = (e) => {
  //   const selected = Array.from(e.target.selectedOptions).map((option) =>
     
  //     parseInt(option.value, 10)
  //   );
  //   console.log('selected', selected);
  //   setFormData02((prev) => ({ ...prev, services: selected }));
  //   console.log('formData02.services', formData02.services);
  //   console.log('formData02', formData02);
  // };

  const handleRemoveService = (id) => {
    setFormData02((prev) => ({
      ...prev,
      services: prev.services.filter((serviceId) => serviceId !== id),
    }));
  };

  const selectedServiceNames = services
    .filter((service) => formData02.services.includes(service.id))
    .map((service) => service.name);

  return (
    <div className="h-full w-full grid place-content-center bg-white py-10">
      <div className="w-screen h-auto my-5 flex flex-col justify-center items-center rounded-xl">
        <h1 className="text-4xl text-center mb-10 font-bold">
          <span className="text-blue-400">Servicios </span>del Hotel
          <span className="text-blue-400">...</span>
        </h1>

        <form
          className="flex flex-col justify-around items-center m-3 h-full w-[90%]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-center items-center md:w-[900px] mb-5">
            <div className="flex flex-col w-full mb-10 md:mb-5 border-b-2 pb-5">
              <span className="font-bold text-2xl text-primary">Descripción</span>
              <span className="text-xl text-primary mb-8 mt-2">
                Escribe una descripción detallada de tu hotel. Las personas
                verán esto en los resultados de sus búsquedas, por favor utiliza
                bien este espacio.
              </span>
              <textarea
                className="outline-none border border-gray-400 h-40 px-2 rounded-lg text-xl w-full"
                name="description"
                placeholder="Escribe aquí..."
                value={formData02.description}
                onChange={handleChangeForm}
                maxLength={500}
                required
              />
              <span className="text-sm text-gray-500">
                {formData02.description.length}/500 caracteres
              </span>
            </div>

            <div className="flex flex-col w-full mb-10 md:mb-5">
              <span className="font-bold text-2xl text-primary">Servicios</span>
              <div className="mb-4 mt-2">
                <label className="text-xl mb-4"></label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData02.services.map((serviceId) => {
                    const service = services.find((s) => s.id === serviceId);
                    return (
                      <span
                        key={serviceId}
                        className="flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700"
                      >
                        {service?.name}
                        <button
                          type="button"
                          onClick={() => handleRemoveService(serviceId)}
                          className="ml-2 text-red-500 font-bold"
                        >
                          ✕
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>

              <label className="text-xl mb-4 text-primary">
                Selecciona los servicios ofrecidos:
              </label>
              <div className="w-full">
                {[...new Set(services.map((service) => service.category))].map(
                  (category) => (
                    <fieldset key={category} className="mb-4 border p-2 rounded-lg">
                      <legend className="text-xl font-bold text-primary">
                        {category}
                      </legend>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {services
                          .filter((service) => service.category === category)
                          .map((service) => (
                            <label
                              key={service.id}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                value={service.id}
                                checked={formData02.services.includes(service.id)}
                                onChange={handleCheckboxChange}
                                className="form-checkbox text-primary"
                              />
                              <span className="text-sm">{service.name}</span>
                            </label>
                          ))}
                      </div>
                    </fieldset>
                  )
                )}
              </div>
            </div>

            <div className="w-full flex flex-col justify-center items-center mt-20">
              <button
                type="button"
                onClick={() => {
                  back(true);
                  window.scrollTo(0, 0);
                  onClose(false);
                }}
                className="w-full max-w-[500px] mb-5 flex justify-center items-center rounded-xl h-12 text-primary font-semibold bg-background"
              >
                Atrás
              </button>
              <button
                type="submit"
                className="w-full max-w-[500px] mb-5 flex justify-center items-center rounded-xl h-12 text-white font-semibold bg-primary"
              >
                Continuar
              </button>
            </div>
          </div>
        </form>
      </div>
      {err ? <Errors error={err} /> : null}
    </div>
  );
};

export default AddHotelForm02;