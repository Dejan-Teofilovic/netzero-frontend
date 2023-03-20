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

export interface IClaim {
  id: number;
  id_wallet_address: number;
  wallet_address: string;
  token_amount: number;
  eth_amount: number;
  carbon_amount: number;
  fee_amount: number;
  mintable_token_amount: number;
  created_at: string;
  updated_at: string;
}

export interface IMintableClaim {
  id: number;
  id_wallet_address: number;
  id_user: number;
  user_first_name: string;
  user_last_name: string;
  wallet_address: string;
  token_amount: number;
  eth_amount: number;
  carbon_amount: number;
  fee_amount: number;
  mintable_token_amount: number;
  created_at: string;
  updated_at: string;
}
