import Stars from "../recipe/Stars";
interface CommentCardProps {
  id: number;
  first_name: string;
  last_name: string;
  text: string;
  rating: number;
  comment: string;
}
const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  first_name,
  last_name,
  rating,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600">
      {/* Foto de perfil */}
      <img
        src=""
        alt={`${first_name}'s avatar`}
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* Contenido del comentario */}
      <div className="flex-1">
        <h6 className="font-semibold text-gray-900 dark:text-white">
          {first_name} {last_name}
        </h6>
        <p className="text-gray-600 dark:text-gray-300">{comment}</p>
        <Stars rating={rating} />
      </div>
    </div>
  );
};

export default CommentCard;
