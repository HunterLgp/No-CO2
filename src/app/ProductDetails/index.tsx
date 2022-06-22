import { StarFilled } from "@ant-design/icons";
import { FC, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import MainHeader from "../../components/common/MainHeader";
import Review from "../../components/individual/review";
import { getProductDetails, getCategoriesAPI, createReviewAPI } from "../../services/apis/product";
import { Categories, Product } from "../Products";
import { getMeAPI } from "../../services/apis/auth";

export const ProductDetailsBox: FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const ProductDetails: FC = () => {
  const location = useLocation();
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<Categories[]>();
  const [rate, setRate] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [comment, setComment] = useState<string>("");
  const [errorComment, setErrorComment] = useState<boolean>(false);

  const getData = () => {
    return categories?.filter((category) => {
      return category._id === product?.category_id;
    })[0].name;
  };

  const handleComment = async () => {
    const idProduct = location.pathname.split("/")[2];
    if (rate && comment && product) {
      const me = await getMeAPI();
      await createReviewAPI(comment, rate, idProduct, me.data._id);
      const newDataProduct = await getProductDetails(idProduct);
      setProduct(newDataProduct);
      setComment("");
      setRate(0);
    } else {
      setErrorComment(true);
    }
  };

  useEffect(() => {
    if (errorComment && rate && comment) {
      setErrorComment(false);
    }
  }, [rate, comment, errorComment]);

  useEffect(() => {
    const getDataProductDetails = async () => {
      const idProduct = location.pathname.split("/")[2];
      const dataProductDetails = await getProductDetails(idProduct);
      const dataCategories = await getCategoriesAPI();
      setProduct(dataProductDetails);
      setCategories(dataCategories);
    };
    getDataProductDetails();
  }, [location]);
  return (
    <>
      <MainHeader page="Product Details" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex">
              <img
                src={product?.url_image}
                className="w-1/2"
                alt="image_product"
              />
              <div className="w-1/2 pl-4">
                <div className="w-full flex justify-start items-center">
                  <div className="">Name :</div>
                  <div className="">{product?.name}</div>
                </div>
                <div className="w-full flex justify-start items-center">
                  <div className="">Category :</div>
                  <div className="">{getData()}</div>
                </div>
                <div className="w-full flex justify-start items-center">
                  <div className="">Price :</div>
                  <div className="">{product?.price}$</div>
                </div>
                <div className="w-full flex justify-start items-center">
                  <div className="">Description :</div>
                  <div className="">{product?.description}</div>
                </div>
                <Link
                  to={`/product/update/${product?._id}`}
                  className="w-32 h-10 rounded-lg text-white bg-teal-500 flex items-center justify-center"
                >
                  Edit
                </Link>
              </div>
            </div>
            <div className="w-full mt-6">
              {product?.reviews?.map((d, index) => (
                <Review
                  key={index}
                  user_id={d.user_id}
                  rate={d.rate}
                  comment={d.comment}
                />
              ))}
            </div>
            <div className="w-full flex justify-between items-center mt-6">
              <input
                type="text"
                placeholder="enter your comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div>
                <StarFilled
                  className={`text-sm ${rate >= 1 ? "text-yellow-400" : "text-gray-400"}`}
                  onClick={() => setRate(1)}
                />
                <StarFilled
                  className={`text-sm ${rate >= 2 ? "text-yellow-400" : "text-gray-400"}`}
                  onClick={() => setRate(2)}
                />
                <StarFilled
                  className={`text-sm ${rate >= 3 ? "text-yellow-400" : "text-gray-400"}`}
                  onClick={() => setRate(3)}
                />
                <StarFilled
                  className={`text-sm ${rate >= 4 ? "text-yellow-400" : "text-gray-400"}`}
                  onClick={() => setRate(4)}
                />
                <StarFilled
                  className={`text-sm ${rate >= 5 ? "text-yellow-400" : "text-gray-400"}`}
                  onClick={() => setRate(5)}
                />
              </div>
              <button
                className="bg-gray-800 w-32 h-8 flex justify-center items-center text-white rounded-sm"
                onClick={handleComment}
              >
                Comment
              </button>
            </div>
            <div className={`${!errorComment && "hidden"} text-rose-500 text-sm mt-2`}>
              Vui lòng nhập cả bình luận và chọn đánh giá.
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default ProductDetails;

