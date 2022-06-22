import { Product, Categories } from "../../app/Products";
import { getAPI, postAPI, putAPI } from "./axiosInstance";

export const getCategoriesAPI: () => Promise<Categories[]> = () => getAPI("/category").then((value) => value.data);

export const getProductsFullAPI: () => Promise<Product[]> = () => getAPI("/product").then((value) => value.data);

export const getProductsFilterAPI: (categories: string[], name: string) => Promise<Product[]> = (categories, name) => {
  const categoriesQuery = categories.length
    ? `${categories.reduce((total, category) => `${total}category_ids[]=${category}&`, "")}`
    : "";
  return getAPI(`/product?${categoriesQuery}name=${name ? `${name}` : ""}`).then((value) => value.data);
};

export const getProductDetails: (params: string) => Promise<Product> = (id: string) => {
  return getAPI(`/product?id=${id}`).then((value) => value.data);
};

export const createReviewAPI = (comment: string, rate: 1 | 2 | 3 | 4 | 5, product_id: string, user_id: string) =>
  postAPI("product/review/create", { user_id, product_id, rate, comment });

export const createProduct = (
  name: string,
  category_id: string,
  description: string,
  price: number,
  url_image: string,
) => postAPI("/product/create", { name, category_id, description, price, url_image });

export const updateProduct = (
  id: string,
  name: string,
  category_id: string,
  description: string,
  price: number,
  url_image: string,
) => putAPI(`/product/update?id=${id}`, { name, category_id, description, price, url_image });

