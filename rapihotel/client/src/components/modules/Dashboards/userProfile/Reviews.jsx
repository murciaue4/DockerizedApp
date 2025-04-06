const Comments = () => {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background max-lg:bg-black max-lg:bg-opacity-50">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4 border-b pb-4">
            <div className="flex items-center space-x-2">
              <p className="text-lg font-semibold text-gray-800">
                <a href="/profile/landing.html" className="text-blue-600 hover:underline">
                  Danniel Murcia
                </a>
              </p>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mt-2">Tus comentarios</h1>
          </div>
          <div className="flex flex-col items-center justify-center text-center text-gray-500 py-10">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xl">💬</span>
            </div>
            <p className="mt-4">Todavía no enviaste ningún comentario.</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Comments;