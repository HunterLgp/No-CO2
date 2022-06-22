import { StarFilled } from "@ant-design/icons";
import { css, cx } from "@emotion/css";
import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainHeader from "../../components/common/MainHeader";
import { SelectCategoryMulti } from "../../components/common/SelectCategory";
import { ReviewProps } from "../../components/individual/review";
import { getCategoriesAPI, getProductsFullAPI, getProductsFilterAPI } from "../../services/apis/product";

export interface Product {
  _id: string;
  name: string;
  url_image: string;
  description: string;
  price: 1 | 2 | 3 | 4 | 5;
  average_rate: number;
  category_id: string;
  reviews?: ReviewProps[];
}

export interface Categories {
  _id: string;
  name: string;
}

const Products: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [options, setOptions] = useState<Categories[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [name, setName] = useState<string>("");

  const getData = (categoryID: string) => {
    return options.filter((option) => {
      return option._id === categoryID;
    })[0].name;
  };

  const filterProducts = async () => {
    const dataProducts = await getProductsFilterAPI(categories, name);
    setProducts(dataProducts);
  };

  useEffect(() => {
    const getDataProducts = async () => {
      const dataProduct = await getProductsFullAPI();
      const dataCategory = await getCategoriesAPI();
      setProducts(dataProduct);
      setOptions(dataCategory);
    };
    getDataProducts();
  }, []);
  return (
    <>
      <MainHeader page="Products" />
      <main>
        <div className="w-full flex justify-start items-center mt-10">
          <Link
            to="/product/create"
            className="w-32 h-10 rounded-lg text-white bg-teal-500 flex items-center justify-center"
          >
            New Product +
          </Link>
        </div>
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-4 sm:px-0">
            <div className="flex justify-between items-center h-16 w-full mb-4">
              <SelectCategoryMulti
                options={options}
                categories={categories}
                setCategories={setCategories}
              />
              <input
                type="text"
                className="w-1/4 h-10 border-[1px] border-gray-500 rounded-md outline-none pl-2"
                placeholder="Filter by name"
                onChange={(e) => setName(e.target.value)}
              />
              <button
                className="w-1/4 h-10 text-white bg-gray-800 rounded-md"
                onClick={filterProducts}
              >
                Search
              </button>
            </div>
            <div className="flex justify-between flex-wrap">
              {products.length
                ? products?.map((product) => (
                    <Link
                      to={`/product/${product._id}`}
                      key={product._id}
                      className="w-[32%] aspect-[4/5] relative"
                    >
                      <img
                        src={product.url_image}
                        className="w-full aspect-[4/3] rounded-lg"
                        alt="product"
                      />
                      <div
                        className={cx(
                          "absolute w-[80%] h-1/3 top-1/2 left-[10%] flex flex-col py-3 px-2 z-10 bg-white rounded-lg",
                          css`
                            box-shadow: 0px 1px 3px #33333388;
                          `,
                        )}
                      >
                        <div className="w-full h-1/3 flex justify-center items-center">{product.name}</div>
                        <div className="w-full h-1/3 flex justify-between items-center">
                          <div className="w-1/2">
                            <StarFilled
                              className={`text-sm ${product.average_rate >= 1 ? "text-yellow-400" : "text-gray-400"}`}
                            />
                            <StarFilled
                              className={`text-sm ${product.average_rate >= 2 ? "text-yellow-400" : "text-gray-400"}`}
                            />
                            <StarFilled
                              className={`text-sm ${product.average_rate >= 3 ? "text-yellow-400" : "text-gray-400"}`}
                            />
                            <StarFilled
                              className={`text-sm ${product.average_rate >= 4 ? "text-yellow-400" : "text-gray-400"}`}
                            />
                            <StarFilled
                              className={`text-sm ${product.average_rate >= 5 ? "text-yellow-400" : "text-gray-400"}`}
                            />
                          </div>
                          <div className="w-1/2 text-right">{getData(product.category_id)}</div>
                        </div>
                        <div className="w-full h-1/3 flex justify-center items-center">
                          <button className="rounded-full w-3/4 border-2 border-gray-800 h-full flex justify-center items-center">
                            {product.price} USD
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Products;

