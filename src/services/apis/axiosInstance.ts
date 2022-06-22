import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import env from "../../configs/env";
import history from "../../utils/history";
import { refreshTokenAPI } from "./auth";

const axiosInstance = axios.create({
  baseURL: env.baseURl,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    //@ts-ignore
    const token = JSON.parse(localStorage.getItem("persist:auth")).token;
    if (token) {
      //@ts-ignore
      config.headers["Authorization"] = `Bearer ${token.slice(1, token.length - 1)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        //@ts-ignore
        const storage = JSON.parse(localStorage.getItem("persist:auth"));
        try {
          if (storage.refreshToken) {
            const rs = await refreshTokenAPI(storage.refreshToken.slice(1, storage.refreshToken.length - 1));
            //@ts-ignore
            const { token, refreshToken } = rs.data;
            localStorage.setItem(
              "persist:auth",
              JSON.stringify({ ...storage, token: `\"${token}\"`, refreshToken: `\"${refreshToken}\"` }),
            );
            originalConfig.headers["Authorization"] = `Bearer ${token}`;
            return axiosInstance(originalConfig);
          } else {
            history.replace("/login");
          }
        } catch (_error: any) {
          console.log(_error.response);
          if (_error.response && _error.response.data) {
            const { token, refreshToken, ...rest } = storage;
            localStorage.setItem("persist:auth", JSON.stringify(rest));
            history.replace("/login");
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  },
);
export const getAPI: (url: string, headers?: AxiosRequestHeaders | undefined, params?: any) => Promise<any> = (
  url: string,
  headers?: AxiosRequestHeaders | undefined,
  params?: any,
) => {
  return axiosInstance.get(url, {
    headers,
    params,
  });
};
export const postAPI = (url: string, data?: any, headers?: AxiosRequestHeaders | undefined, params?: any) => {
  return axiosInstance.post(url, data, {
    headers,
    params,
  });
};
export const putAPI = (url: string, data?: any, headers?: AxiosRequestHeaders | undefined, params?: any) => {
  return axiosInstance.put(url, data, {
    headers,
    params,
  });
};
export const patchAPI = (url: string, data?: any, headers?: AxiosRequestHeaders | undefined, params?: any) => {
  return axiosInstance.patch(url, data, {
    headers,
    params,
  });
};
export const deleteAPI = (url: string, headers?: AxiosRequestHeaders | undefined, params?: any) => {
  return axiosInstance.delete(url, {
    headers,
    params,
  });
};

