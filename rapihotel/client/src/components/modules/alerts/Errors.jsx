

const Errors = ({error}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 border border-gray-500 shadow-md h-screen text-red-500 font-bold z-50 overflow-hidden">
      <div className="relative max-w-md mx-auto p-4">
        <p className="text-center">{error.message}</p>
      </div>
    </div>
  );
};

export default Errors;