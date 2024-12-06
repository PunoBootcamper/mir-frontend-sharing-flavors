import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mt-4">
        Página no encontrada
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;