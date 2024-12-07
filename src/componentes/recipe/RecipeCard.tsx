import { Recipe } from "../../interfaces";
import { useImageLoader } from "../../hooks/useImageLoader";
import { Link } from "react-router-dom";
import Stars from "./Stars";
import Views from "./Views";

import { useGetUserByIdQuery } from "../../app/apis/compartiendoSabores.api";

const RecipeCard: React.FC<Recipe> = ({
  title,
  images,
  views,
  average_rating,
  _id,
  user_id,
}) => {
  const imgURL = useImageLoader(images);
  const path = `/recipe/${_id}`;

  const { data: user, error, isLoading } = useGetUserByIdQuery(user_id);

  const handleClicked = async () => {
    console.log("Clicked");
  };

  return (
    <div className="w-full h-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/* Imagen principal */}
      <div className="flex justify-center">
        <Link to={path} onClick={handleClicked} className="w-full">
          <img
            className="p-8 rounded-t-lg h-64 md:h-64 w-full object-cover"
            src={imgURL}
            alt={title}
          />
        </Link>
      </div>

      {/* Contenido */}
      <div className="px-5 pb-5">
        {/* Usuario */}
        <div className="flex items-center gap-4 mb-4">
          {isLoading && (
            <p className="text-gray-500 dark:text-gray-400">
              Cargando usuario...
            </p>
          )}
          {error && (
            <>
              <img
                src={"https://via.placeholder.com/40"}
                alt={"avatar"}
                className="w-10 h-10 rounded-full object-cover"
              />
            </>
          )}
          {!isLoading && !error && user && (
            <>
              <img
                src={user.photo_url || "https://via.placeholder.com/40"}
                alt={`${user.first_name}'s avatar`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <h5 className="text-md font-medium text-gray-900 dark:text-white">
                {user.first_name} {user.last_name}
              </h5>
            </>
          )}
        </div>

        {/* Título */}
        <Link to={path} onClick={handleClicked}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-1">
            {title}
          </h5>
        </Link>

        {/* Estrellas */}
        <Stars rating={average_rating} />

        {/* Vistas y botón de favoritos */}
        <div className="flex items-center justify-between">
          <Views views={views} />
          <Link
            to="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Favoritos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
