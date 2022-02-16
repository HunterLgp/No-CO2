import axios, { AxiosRequestHeaders } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://js-post-api.herokuapp.com/api/",
});

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export const getAPI = (
  url: string,
  headers?: AxiosRequestHeaders | undefined,
  params?: any
) => {
  return axiosInstance.get(url, {
    headers,
    params,
  });
};
export const postAPI = (
  url: string,
  data?: any,
  headers?: AxiosRequestHeaders | undefined,
  params?: any
) => {
  return axiosInstance.post(url, data, {
    headers,
    params,
  });
};
export const putAPI = (
  url: string,
  data?: any,
  headers?: AxiosRequestHeaders | undefined,
  params?: any
) => {
  return axiosInstance.post(url, data, {
    headers,
    params,
  });
};
export const patchAPI = (
  url: string,
  data?: any,
  headers?: AxiosRequestHeaders | undefined,
  params?: any
) => {
  return axiosInstance.post(url, data, {
    headers,
    params,
  });
};
export const deleteAPI = (
  url: string,
  headers?: AxiosRequestHeaders | undefined,
  params?: any
) => {
  return axiosInstance.delete(url, {
    headers,
    params,
  });
};
