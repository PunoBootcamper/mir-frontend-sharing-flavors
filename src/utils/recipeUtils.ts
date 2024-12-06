import { IRecipeForm, Recipe } from "../interfaces";

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
