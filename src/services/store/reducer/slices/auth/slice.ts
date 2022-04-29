import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth, FormAuth } from "./type";

const initialState: Auth = {
  token: "token",
  isLoading: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state: Auth, action: PayloadAction<FormAuth>) => {
      state.isLoading = true;
    },
    registerSuccess: (state: Auth, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoading = false;
    },
    registerFailed: (state: Auth) => {
      state.isLoading = false;
    },
    login: (state: Auth, action: PayloadAction<FormAuth>) => {
      state.isLoading = true;
    },
    loginSuccess: (state: Auth, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoading = false;
    },
    loginFailed: (state: Auth) => {
      state.isLoading = false;
    },
    reset: () => {
      return {
        token: "",
        isLoading: false,
      };
    },
  },
});
export const { register, registerSuccess, registerFailed, login, loginSuccess, loginFailed, reset } = authSlice.actions;
export default authSlice.reducer;
