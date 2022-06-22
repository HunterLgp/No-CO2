import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormAuth {
  userName: string;
  password: string;
  email?: string;
  gender?: number;
  firstName?: string;
  lastName?: string;
}
export interface ResponseAuth {
  token?: string;
  refreshToken?: string;
}
export interface Auth {
  isLoading: boolean;
  token?: string;
  refreshToken?: string;
  error?: any;
}

const initialState: Auth = {
  isLoading: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state: Auth, action: PayloadAction<FormAuth>) => {
      state.isLoading = true;
    },
    registerSuccess: (state: Auth, action: PayloadAction<ResponseAuth>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isLoading = false;
    },
    registerFailed: (state: Auth, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    login: (state: Auth, action: PayloadAction<FormAuth>) => {
      state.isLoading = true;
    },
    loginSuccess: (state: Auth, action: PayloadAction<ResponseAuth>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isLoading = false;
    },
    loginFailed: (state: Auth, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state: Auth, action: PayloadAction<ResponseAuth>) => {
      state.isLoading = true;
    },
    logoutSuccess: () => {
      return {
        isLoading: false,
      };
    },
    logoutFailed: (state: Auth, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const {
  register,
  registerSuccess,
  registerFailed,
  login,
  loginSuccess,
  loginFailed,
  logout,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;
export default authSlice.reducer;

