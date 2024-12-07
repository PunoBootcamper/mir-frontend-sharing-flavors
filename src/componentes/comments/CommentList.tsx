import CommentCard from "./CommentCard";

interface Comment {
  id: number;
  name: string;
  text: string;
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
          <>
            <CommentCard
              key={comment.id}
              id={comment.id}
              text={comment.text}
              comment={comment.text}
              first_name={comment.name}
              last_name={comment.name}
              rating={comment.rating}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
