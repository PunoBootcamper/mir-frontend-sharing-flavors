import { Recipe } from "../../interfaces";
import { useImageLoader } from "../../hooks/useImageLoader";
import { Link } from "react-router-dom";
import Stars from "./Stars";
import Views from "./Views";
import { RootState } from "../../app/store/store";
import { useSelector } from "react-redux";

import { useGetUserByIdQuery } from "../../app/apis/compartiendoSabores.api";
import { useUpdateRecipeMutation } from "../../app/apis/compartiendoSabores.api";

interface RecipeCardProps extends Recipe {
  isFavorite: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  images,
  views,
  average_rating,
  _id,
  user_id,
  isFavorite,
}) => {
  const imgURL = useImageLoader(images);
  const path = `/recipe/${_id}`;
  const loggedUser = useSelector((state: RootState) => state.auth.user);
  const {
    data: user,
    error: errorUser,
    isLoading: isLoadingUser,
  } = useGetUserByIdQuery(user_id);

  const [updateRecipe] = useUpdateRecipeMutation();

  //Actualizar las vistas de la receta
  const handleClicked = async () => {
    try {
      await updateRecipe({
        _id: _id || "",
        views: views + 1,
      });
    } catch (error) {
      console.log("Error al actualizar las vistas de la receta", error);
    }
  };

  const handleFavorite = () => {
    console.log("Función para agregar a favoritos");
    console.log({ Receta: title, "ID receta": _id });
    console.log({ "ID usuario": loggedUser?._id });
    console.log({ " favorito": loggedUser?.profile.favorites });
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
          {isLoadingUser && (
            <p className="text-gray-500 dark:text-gray-400">
              Cargando usuario...
            </p>
          )}
          {errorUser && (
            <>
              <img
                src={"https://via.placeholder.com/40"}
                alt={"avatar"}
                className="w-10 h-10 rounded-full object-cover"
              />
            </>
          )}
          {!isLoadingUser && !errorUser && user && (
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
          {
            // Si la receta ya está en favoritos
            isFavorite ? (
              <button
                onClick={handleFavorite}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Favoritos
              </button>
            ) : (
              <button
                onClick={handleFavorite}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Favoritos
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
