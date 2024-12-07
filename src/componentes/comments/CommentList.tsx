import CommentCard from "./CommentCard";
import { Comment } from "../../interfaces";

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
              key={comment._id}
              comment={comment.comment}
              rating={comment.rating}
              user_id={comment.user_id}
              recipe_id={comment.recipe_id}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
