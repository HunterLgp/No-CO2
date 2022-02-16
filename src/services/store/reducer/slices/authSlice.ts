import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth, User } from "../types/user";

const initialState: Auth = {
  isLogin: false,
  isLoading: false,
};
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state: Auth,
      action: PayloadAction<{ userName: string; password: string }>
    ) => {
      state.isLoading = true;
    },
    loginSuccess: (state: Auth, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLogin = true;
      state.isLoading = false;
    },
    loginFailed: (state: Auth) => {
      state.isLoading = false;
    },
    logout: () => {
      return {
        isLogin: false,
        isLoading: false,
      };
    },
  },
});
export const { login, loginSuccess, loginFailed, logout } = authSlice.actions;
export default authSlice.reducer;
