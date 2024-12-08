import { Recipe } from "../../interfaces";
import Stars from "./Stars";
import Views from "./Views";
import { useImageLoader } from "../../hooks/useImageLoader";
import CommentForm from "../comments/CommentForm";
import CommentsList from "../comments/CommentList";
import {} from "../../app/apis/compartiendoSabores.api";
import { Comment } from "../../interfaces";
import {
  useGetCommentsQuery,
  useGetUserByIdQuery,
  useCreateCommentMutation,
} from "../../app/apis/compartiendoSabores.api";
import { RootState } from "../../app/store/store";
import { useSelector } from "react-redux";

const RecipeCardDetailed: React.FC<Partial<Recipe>> = ({
  title,
  images,
  views = 0,
  average_rating = 0,
  user_id,
  ingredients,
  procedure,
  _id,
}) => {
  const imgURL = useImageLoader(images);

  const loggedUser = useSelector((state: RootState) => state.auth.user);

  const handleClicked = () => {
    console.log("funcion para agregar a favoritos");
  };

  const [createComment] = useCreateCommentMutation();
  const { data: comments } = useGetCommentsQuery(_id ?? "");
  const { data: user, error, isLoading } = useGetUserByIdQuery(user_id ?? "");

  const handleSubmittedComment = async (rating: number, comment: string) => {
    try {
      const newComment: Partial<Comment> = {
        user_id: loggedUser?._id,
        recipe_id: _id,
        rating,
        comment,
      };
      await createComment(newComment);
    } catch (error) {
      console.log("Error al enviar el comentario", error);
    }
  };

  return (
    <div className="w-full bg-gray-800 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-5">
        {/* Vistas */}
        <div>
          <Views views={views} />
        </div>

        {/* Título y Estrellas */}
        <div className="flex flex-col items-center text-center">
          <h5 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">
            {title}
          </h5>
          <Stars rating={average_rating} />
        </div>

        {/* Botón de Favoritos */}
        <button
          onClick={handleClicked}
          className="bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Añadir a Favoritos
        </button>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <div className="flex flex-col md:flex-row items-start gap-4">
          {/* Información del usuario */}
          <div className="w-full md:w-1/2">
            {isLoading && (
              <p className="text-gray-500 dark:text-gray-400">
                Cargando información del usuario...
              </p>
            )}
            {error && (
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={"https://via.placeholder.com/40"}
                  alt={`avatar`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            )}
            {!isLoading && !error && user && (
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={user.photo_url || "https://via.placeholder.com/40"}
                  alt={`${user.first_name}'s avatar`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user.first_name} {user.last_name}
                </h5>
              </div>
            )}
            <ul className="space-y-1 list-disc list-inside text-gray-500 dark:text-white">
              {ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          {/* Imagen */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              className="rounded-lg w-full h-auto object-cover max-h-64 md:max-h-full"
              src={imgURL}
              alt={title}
            />
          </div>
        </div>

        {/* Procedimiento */}
        <div className="mt-6">
          <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Procedimiento
          </h5>
          <ol className="space-y-1 list-decimal list-inside text-gray-500 dark:text-white">
            {procedure?.map((step, index) => <li key={index}>{step}</li>)}
          </ol>
        </div>

        {/* Comentarios */}
        <CommentsList comments={comments ?? []} />
        <CommentForm onSubmit={handleSubmittedComment} />
      </div>
    </div>
  );
};

export default RecipeCardDetailed;
