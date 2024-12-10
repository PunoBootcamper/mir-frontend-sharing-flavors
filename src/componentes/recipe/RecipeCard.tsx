import { Recipe } from "../../interfaces";
import { useImageLoader } from "../../hooks/useImageLoader";
import { Link } from "react-router-dom";
import Stars from "./Stars";
import Views from "./Views";
import { useGetUserByIdQuery } from "../../app/apis/compartiendoSabores.api";
import { useUpdateRecipeMutation } from "../../app/apis/compartiendoSabores.api";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/recipeUtils";
const RecipeCard: React.FC<Recipe> = ({
  title,
  images,
  views,
  average_rating,
  _id,
  user_id,
  createdAt,
}) => {
  const imgURL = useImageLoader(images);
  const path = `/recipe/${_id}`;
  const {
    data: user,
    error: errorUser,
    isLoading: isLoadingUser,
  } = useGetUserByIdQuery(user_id);
  const navigate = useNavigate();

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

  return (
    <div className="w-full h-auto max-w-sm border bg-gray-800 border-gray-700 rounded-lg shadow">
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
            <p className="text-gray-400">Cargando usuario...</p>
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
            <button>
              <img
                src={user.photo_url || "https://via.placeholder.com/40"}
                alt={`${user.first_name}'s avatar`}
                className="w-10 h-10 rounded-full object-cover focus:cursor-auto"
                onClick={() => {
                  navigate(`/profile/${user._id}`);
                }}
              />
              <h5
                className="text-md font-medium text-white"
                onClick={() => {
                  navigate(`/profile/${user._id}`);
                }}
              >
                {user.first_name} {user.last_name}
              </h5>
            </button>
          )}
        </div>

        {/* Título */}
        <Link to={path} onClick={handleClicked}>
          <h5 className="text-xl font-semibold tracking-tight text-white line-clamp-1">
            {title}
          </h5>
        </Link>

        {/* Estrellas */}
        <Stars rating={average_rating} />

        {/* Vistas y botón de favoritos */}
        <div className="flex items-center justify-between">
          <Views views={views} />
          <p className="text-sm text-gray-400 text-right">
            {formatDate(createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
