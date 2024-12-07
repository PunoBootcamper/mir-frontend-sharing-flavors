export interface Comment {
  _id: string;
  user_id: string;
  recipe_id: string;
  rating: number;
  comment: string;
  __v: number;
}

export interface CommentWithAvatar extends Comment {
  photo_url: string;
  first_name: string;
  last_name: string;
}
