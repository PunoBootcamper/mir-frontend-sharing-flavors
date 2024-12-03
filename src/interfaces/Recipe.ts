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
}
