import { IRecipeForm, IRecipeEditForm, Recipe } from "../interfaces";
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale"; // Opcional, para soporte en español

export function transformIRecipeFormToRecipe(
  formData: IRecipeForm,
  userId: string,
  imageUrl: string,
): Partial<Recipe> {
  return {
    title: formData.title,
    ingredients: formData.ingredients.map(
      (ingredient) => ingredient.ingredientsName,
    ),
    procedure: formData.procedure.map((step) => step.stepName),
    category: formData.category,
    images: [imageUrl],
    user_id: userId,
  };
}

export function transformIRecipeEditFormToRecipe(
  formData: IRecipeEditForm,
  userId: string,
  imageUrl?: string, // La imagen será opcional en este caso
): Partial<Recipe> {
  return {
    title: formData.title,
    ingredients: formData.ingredients.map(
      (ingredient) => ingredient.ingredientsName,
    ),
    procedure: formData.procedure.map((step) => step.stepName),
    category: formData.category,
    ...(imageUrl ? { images: [imageUrl] } : {}), // Solo incluir imágenes si hay una nueva URL
    user_id: userId,
  };
}

export const formatDate = (createdAt: string): string => {
  const date = new Date(createdAt);

  const now = new Date();
  const differenceInDays =
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

  if (differenceInDays < 1) {
    // Mostrar "hace X tiempo" si es del mismo día
    return formatDistanceToNow(date, { addSuffix: true, locale: es });
  } else {
    // Mostrar fecha legible si es más antigua
    return format(date, "dd/MM HH:mm", { locale: es });
  }
};
