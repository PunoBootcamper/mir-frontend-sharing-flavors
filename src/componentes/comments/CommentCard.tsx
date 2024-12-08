import Stars from "../recipe/Stars";
import { Comment } from "../../interfaces";
import { useGetUserByIdQuery } from "../../app/apis/compartiendoSabores.api";

interface CommentCardProps extends Partial<Comment> {
  userData?: {
    first_name: string;
    last_name: string;
    photo_url: string;
  };
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  user_id,
  rating = 0,
  userData,
}) => {
  // Solo consulta el usuario si no se pasa `userData`
  const {
    data: user,
    error,
    isLoading,
  } = useGetUserByIdQuery(user_id ?? "", {
    skip: !!userData || !user_id,
  });

  const displayUser = userData || user;

  return (
    <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600">
      {/* Foto de perfil */}
      {isLoading && (
        <div
          className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"
          aria-label="Cargando..."
        ></div>
      )}
      {error && (
        <div
          className="w-10 h-10 bg-red-300 rounded-full"
          aria-label="Error al cargar"
        ></div>
      )}
      {displayUser && (
        <img
          src={displayUser.photo_url || "https://via.placeholder.com/150"}
          alt={`${displayUser.first_name || "Usuario"}'s avatar`}
          className="w-10 h-10 rounded-full object-cover"
          loading="lazy"
        />
      )}

      {/* Contenido del comentario */}
      <div className="flex-1">
        <h6 className="font-semibold text-gray-900 dark:text-white">
          {displayUser?.first_name || "Usuario"} {displayUser?.last_name || ""}
        </h6>
        <p className="text-gray-600 dark:text-gray-300">{comment}</p>
        <Stars rating={rating} />
      </div>
    </div>
  );
};

export default CommentCard;