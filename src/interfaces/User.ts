export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  favorites: string[];
  description: string;
  photo_url: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserCredentials {
  email: string;
  password: string;
}
