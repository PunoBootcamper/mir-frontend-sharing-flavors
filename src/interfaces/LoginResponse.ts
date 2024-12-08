export interface LoginResponse {
  token: string;
  _id: string;
  profile: {
    fullName: string;
    avatar: string;
    role: string;
    email: string;
    favorites: string[];
  };
}
