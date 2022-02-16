export enum RoleUser {
  user,
  admin,
}
export interface User {
  userName: string;
  email: string;
  token: string;
  password: string;
  role: RoleUser;
}
export interface Auth {
  isLogin: boolean;
  isLoading: boolean;
  user?: User;
}
