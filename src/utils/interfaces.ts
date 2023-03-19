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
