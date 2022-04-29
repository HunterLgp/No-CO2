export interface FormAuth {
  email: string;
  password: string;
}
export interface Auth {
  token: string;
  isLoading: boolean;
  error?: string;
}
