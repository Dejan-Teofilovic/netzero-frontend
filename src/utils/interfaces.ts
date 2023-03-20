export interface ILoginData {
  email: string;
  password: string;
}

export interface ISignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserType {
  id: number;
  type: string;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  last_logged_at: string;
  id_user_type: number;
}
