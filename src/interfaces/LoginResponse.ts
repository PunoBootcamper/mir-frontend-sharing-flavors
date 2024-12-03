export interface LoginResponse {
  token: string;
  profile: {
    fullName: string;
    avatar: string;
    role: string;
    email: string;
  };
}
