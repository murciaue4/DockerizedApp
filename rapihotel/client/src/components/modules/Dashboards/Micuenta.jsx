import editIcon from "../../../static/editIcon-02.svg";
import ajustesIcon from "../../../static/AjustesIcon-03.svg";
import Skeleton from "react-loading-skeleton";

const AccountDetails = ({ dataUser, user }) => {
  return (
    <div className="bg-white p-6 rounded-lg w-full mx-auto mt-6">
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div>
          <span className="block text-sm text-gray-500">Nombre:</span>
          <span className="block text-xl font-semibold text-indigo-600">
            {dataUser ? dataUser.name.toUpperCase() : <Skeleton width={120} />}
          </span>
        </div>
        {/* Apellido */}
        <div>
          <span className="block text-sm text-gray-500">Apellido:</span>
          <span className="block text-xl font-semibold text-indigo-600">
            {dataUser ? dataUser.lastname.toUpperCase() : <Skeleton width={120} />}
          </span>
        </div>
        {/* Username */}
        <div>
          <span className="block text-sm text-gray-500">Username:</span>
          <span className="block text-xl font-semibold text-indigo-600">
            {user.username || <Skeleton width={80} />}
          </span>
        </div>
        {/* Correo Electrónico */}
        <div>
          <span className="block text-sm text-gray-500">Correo Electrónico:</span>
          <span className="block text-xl font-semibold text-indigo-600">
            {dataUser ? dataUser.email : <Skeleton width={180} />}
          </span>
        </div>
        {/* Teléfono */}
        <div>
          <span className="block text-sm text-gray-500">Teléfono:</span>
          <span className="block text-xl font-semibold text-indigo-600">
            {dataUser ? dataUser.telefono || "No disponible" : <Skeleton width={120} />}
          </span>
        </div>
        {/* Segundo Teléfono */}
        <div>
          <span className="block text-sm text-gray-500">Segundo Teléfono:</span>
          <span className="block text-xl font-semibold text-indigo-600">
            {dataUser ? dataUser.segundoTelefono || "No disponible" : <Skeleton width={120} />}
          </span>
        </div>
        {/* Fecha de Creación */}
        <div>
          <span className="block text-sm text-gray-500">Fecha de Creación:</span>
          <span className="block text-xl font-semibold text-indigo-600">
            {dataUser ? new Date(dataUser.created_date).toLocaleDateString() : <Skeleton width={180} />}
          </span>
        </div>
        {/* Verificado */}
        <div>
          <span className="block text-sm text-gray-500">Verificado:</span>
          <span className="block text-xl font-semibold text-indigo-600">
            {dataUser ? (dataUser.verify ? "Sí" : "No") : <Skeleton width={80} />}
          </span>
        </div>
        {/* Tipo de Usuario */}
        <div>
          <span className="block text-sm text-gray-500">Tipo de Usuario:</span>
          <span className="block text-xl font-semibold text-indigo-600">
            {dataUser ? (dataUser.usertype === 0 ? "Usuario" : "Administrador") : <Skeleton width={120} />}
          </span>
        </div>
      </div>

      <div className="flex justify-around mt-6">
        <button className="flex items-center justify-center w-32 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          <img src={editIcon} alt="Editar" className="h-5 mr-2" />
          <span>Editar</span>
        </button>
        <button className="flex items-center justify-center w-32 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
          <img src={ajustesIcon} alt="Ajustes" className="h-5 mr-2" />
          <span>Ajustes</span>
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
