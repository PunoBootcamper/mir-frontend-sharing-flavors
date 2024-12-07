import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import StarRating from "./StarRating";
import CommentBox from "./CommentBox";

interface CommentFormProps {
  onSubmit: (rating: number, comment: string) => void;
}

interface FormValues {
  rating: number;
  comment: string;
}

// Esquema de validación con Yup
const commentSchema = Yup.object().shape({
  rating: Yup.number()
    .required("La calificación es obligatoria")
    .min(1, "La calificación debe ser al menos 1 estrella"),
  comment: Yup.string()
    .required("El comentario es obligatorio")
    .min(10, "El comentario debe tener al menos 10 caracteres"),
});

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      rating: 0,
      comment: "",
    },
    resolver: yupResolver(commentSchema), // Conectar el esquema de Yup
  });

  const onSubmitForm = (data: FormValues) => {
    onSubmit(data.rating, data.comment);
    reset();
  };

  return (
    <div className="mt-4">
      <h6 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Añadir Comentario
      </h6>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmitForm)}>
        {/* Campo de Rating */}
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <>
              <StarRating onRatingChange={field.onChange} value={field.value} />
              {errors.rating && (
                <p className="text-red-500 text-sm">{errors.rating.message}</p>
              )}
            </>
          )}
        />

        {/* Campo de Comentario */}
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <>
              <CommentBox
                value={field.value}
                onChange={field.onChange}
                placeholder="Deja tu opinión aquí..."
              />
              {errors.comment && (
                <p className="text-red-500 text-sm">{errors.comment.message}</p>
              )}
            </>
          )}
        />

        {/* Botón de Enviar */}
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
