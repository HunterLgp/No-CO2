import { FC } from "react";
import Login from "../app/Auth/login";
import Register from "../app/Auth/register";
import Home from "../app/Home";
import InformationUser from "../app/InformationUser";
import PageNotFound from "../app/PageNotFound";
import ProductDetails, { ProductDetailsBox } from "../app/ProductDetails";
import Products from "../app/Products";
import Layout from "../components/templates/Layout";
import UpdateProductBox from "../app/editProduct/updateProduct";
import EditProduct from "../app/editProduct/editProduct";
import CreateProduct from "../app/editProduct/createProduct";

export interface RouteValue {
  path: string;
  component: FC;
  required?: boolean;
  children?: RouteValue[];
}

const routers: RouteValue[] = [
  {
    path: "/",
    component: Layout,
    required: false,
    children: [
      {
        path: "",
        component: Home,
        required: false,
      },
      {
        path: "products",
        component: Products,
        required: true,
      },
      {
        path: "product",
        component: ProductDetailsBox,
        required: true,
        children: [
          {
            path: "create",
            component: CreateProduct,
          },
          {
            path: "update",
            component: UpdateProductBox,
            children: [
              {
                path: ":id",
                component: EditProduct,
              },
            ],
          },
          {
            path: ":id",
            component: ProductDetails,
          },
        ],
      },
      {
        path: "info_user",
        component: InformationUser,
        required: true,
      },
    ],
  },
  {
    path: "/login",
    component: Login,
    required: false,
  },
  {
    path: "/register",
    component: Register,
    required: false,
  },
  {
    path: "*",
    component: PageNotFound,
    required: false,
  },
];
export default routers;

