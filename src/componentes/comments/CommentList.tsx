import Stars from "../recipe/Stars";

interface Comment {
  id: number;
  name: string;
  text: string;
  avatar: string;
  rating: number;
}

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  return (
    <div className="mt-6">
      <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Comentarios
      </h5>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex items-center gap-4 p-4 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
          >
            {/* Foto de perfil */}
            <img
              src={comment.avatar}
              alt={`${comment.name}'s avatar`}
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* Contenido del comentario */}
            <div className="flex-1">
              <h6 className="font-semibold text-gray-900 dark:text-white">
                {comment.name}
              </h6>
              <p className="text-gray-600 dark:text-gray-300">{comment.text}</p>
              <Stars rating={comment.rating} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
