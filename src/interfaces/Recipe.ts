export interface Recipe {
  _id: string;
  user_id: string;
  title: string;
  ingredients: string[];
  procedure: string[];
  images: string[];
  category: string;
  average_rating: number;
  views: number;
  __v: number;
  createdAt: string;
}

export interface IRecipeForm {
  title: string;
  ingredients: { ingredientsName: string }[];
  procedure: { stepName: string }[];
  category: string;
  image: File;
}

export interface IRecipeEditForm {
  title: string;
  ingredients: { ingredientsName: string }[];
  procedure: { stepName: string }[];
  category: string;
  image?: File; // Aquí será la URL de la imagen existente
}
