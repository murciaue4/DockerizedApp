
import FormLogin from "./FormLogin";
import Form01 from "./Form01";
import { useState } from "react";

import PasswordRecoveryForm from "./PasswordRecoveryForm";
import ResetPasswordForm from "./ResetPasswordForm";


const Logger = () => {
  const [showForm01, setShowForm01] = useState(false);
  const handleSetShowForm01 = () => {
    setShowForm01(!showForm01);
  };
  return (
    <div className="flex justify-center w-full h-auto min-h-screen ">
      <div
        className={` h-full w-full flex justify-center rounded-lg `}
      >
      
        <div className=" w-full h-auto min-h-screen flex justify-center items-center bg-background lg:rounded-r-lg max-lg:rounded-lg ">
          {!showForm01 ? (
            <FormLogin handleSetShowForm01={handleSetShowForm01} />
          ) : (
            <Form01 handleSetShowForm01={handleSetShowForm01} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Logger;
