import { useContext, useState } from "react";
import FormHotel from "./FormHotel";
import FormHotel01 from "./FormHotel01";
import FormHotel02 from "./FormHotel02";
import FormHotel03 from "./FormHotel03";
import SubmitForm from './SubmitForm';
import axios from "axios";

import { loginContext } from "../../../../context/loginContext";
import SelectTypeOfProperty from "../add/MainForms";
import { geoLocationContext } from "../../../../context/geoLocationContext";

const AddHotelForm = () => {
  const { token, user, URLStatic, servicesList } = useContext(loginContext);
  const { userLocation } = useContext(geoLocationContext);
  const [formData, setFormData] = useState({
    id: 0,
    id_user: user.id,
    name: "",
    email: "",
    location: {},
    capacity: 0,
    type: "",
    choords: "",
    descripcion: "",
    servicios: [],
  });
  const [err, setErr] = useState({});

  const [showMain, setShowMain] = useState(false);
  const [showFormHotel, setShowFormHotel] = useState(true);
  const [showFormHotel01, setShowFormHotel01] = useState(false);
  const [showFormHotel02, setShowFormHotel02] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [showFormHotel03, setShowFormHotel03] = useState(false);

  

  const handleChangeForms = (newData) => {
    setFormData((prevData) => {0
      const updatedData = { ...prevData };

      for (const key in newData) {
        updatedData[key] = newData[key];
      }

      return updatedData;
    });
  };

  // logica para enviar la informacion al servidor
  const handleFormDataSubmit = async () => {
    try {
      const response = await axios.post(
        `${URLStatic}/user/hoteles/${user.user_id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const hotelId = response.data?.body?.hotelId;
      if (hotelId) {
        setFormData((prevData) => ({
          ...prevData,
          id: hotelId,
        }));
        return hotelId;
      } else {
        throw new Error("No se recibió un hotelId del backend.");
      }
    } catch (error) {
      console.error("Error al enviar los datos del hotel:", error);
      return null; // Indicar que hubo un error
    }
  };
  

  return (
    <div>
      <div className="w-full h-full flex justify-center">
        {showMain && (
          <SelectTypeOfProperty
            onClose={setShowMain}
            next={setShowFormHotel}
            handleChangeForms={handleChangeForms}
          />
        )}
        {showFormHotel && (
          <FormHotel
            userLocation={userLocation}
            onClose={setShowFormHotel}
            next={setShowFormHotel01}
            back={setShowMain}
            handleChangeForms={handleChangeForms}
            formData={formData}
          />
        )}
        {showFormHotel01 && (
          <FormHotel01
            onClose={setShowFormHotel01}
            next={setShowFormHotel02}
            back={setShowFormHotel}
            handleChangeForms={handleChangeForms}
            formData={formData}
          />
        )}
        {showFormHotel02 && (
          <FormHotel02
            onClose={setShowFormHotel02}
            next={setShowSubmitForm}
            back={setShowFormHotel01}
            handleChangeForms={handleChangeForms}
            formData={formData}
            servicesList={servicesList}
          />
        )}
        {showSubmitForm && (
          <SubmitForm
            onClose={setShowSubmitForm}
            next={setShowFormHotel03}
            back={setShowFormHotel02}
            formData={formData}
            handleFormDataSubmit={handleFormDataSubmit}
          />
        )}{showFormHotel03 && (
         <FormHotel03
            onClose={setShowFormHotel03}
            handleChangeForms={handleChangeForms}
            next={setShowMain}
            back={setShowSubmitForm}
            formData={formData}
          />
        )}


      </div>
    </div>
  );
};

export default AddHotelForm;
