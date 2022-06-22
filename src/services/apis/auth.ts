import { AxiosResponse } from "axios";
import { Gender, User } from "../../app/InformationUser";
import { FormAuth, ResponseAuth } from "../store/reducer/slices/authSlice";
import { getAPI, postAPI, putAPI } from "./axiosInstance";

export const registerAPI: (params: FormAuth) => Promise<AxiosResponse<ResponseAuth, any>> = (data: FormAuth) =>
  postAPI("/register", data);

export const loginAPI: (params: FormAuth) => Promise<AxiosResponse<ResponseAuth, any>> = (data: FormAuth) =>
  postAPI("/login", data);

export const logoutAPI = (params: { token: string | undefined; refreshToken: string | undefined }) =>
  postAPI("/logout", params);
export const refreshTokenAPI = (refreshToken: string) =>
  //@ts-ignore
  postAPI("/refresh_token", { refreshToken });

export const getUserAPI: (params: string) => Promise<AxiosResponse<User, any>> = (id) => getAPI(`user/${id}`);

export const getMeAPI: () => Promise<AxiosResponse<User, any>> = () => getAPI("/user/me");

export const updateProfile = (
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  gender: Gender,
  url_image: string,
) => putAPI(`/user/update_profile?id=${id}`, { first_name, last_name, email, gender, url_image });

