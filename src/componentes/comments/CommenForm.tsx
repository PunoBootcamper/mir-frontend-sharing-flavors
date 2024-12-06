import React, { useState } from "react";
import StarRating from "./StarRating";
import CommentBox from "./CommentBox";

interface CommentFormProps {
  onSubmit: (rating: number, comment: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleCommentChange = (value: string) => {
    setComment(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedRating, comment);
    setSelectedRating(0);
    setComment("");
  };

  return (
    <div className="mt-4">
      <h6 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Añadir Comentario
      </h6>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <StarRating onRatingChange={setSelectedRating} />
        <CommentBox
          value={comment}
          onChange={handleCommentChange}
          placeholder="Deja tu opinión aquí..."
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Comentar
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
