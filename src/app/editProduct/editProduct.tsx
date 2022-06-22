import { css, cx } from "@emotion/css";
import { FC, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SelectCategory } from "../../components/common/SelectCategory";
import { getCategoriesAPI, getProductDetails, createProduct, updateProduct } from "../../services/apis/product";
import { Categories } from "../Products";

const EditProduct: FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categories, setCategories] = useState<Categories[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [urlImage, setUrlImage] = useState<string>("");
  const location = useLocation();

  const handleSubmit = async () => {
    if (name.trim() && categoryId.trim() && description.trim() && price && urlImage.trim())
      if (location.pathname.split("/").length === 4) {
        const res = await updateProduct(
          location.pathname.split("/")[3],
          name,
          categoryId,
          description,
          price,
          urlImage,
        );
        if (res.status === 200) {
          navigate(`/product/${location.pathname.split("/")[3]}`);
        }
      } else {
        const res = await createProduct(name, categoryId, description, price, urlImage);
        if (res.status === 200) {
          navigate(`/product/${res.data._id}`);
        }
      }
  };

  useEffect(() => {
    const getDefaultData = async () => {
      const resCategories = await getCategoriesAPI();
      setCategories(resCategories);
      if (location.pathname.split("/").length === 4) {
        const id = location.pathname.split("/")[3];
        const resProduct = await getProductDetails(id);
        setName(resProduct.name);
        setCategoryId(resProduct.category_id);
        setDescription(resProduct.description);
        setPrice(resProduct.price);
        resProduct.url_image && setUrlImage(resProduct.url_image);
      }
    };
    getDefaultData();
  }, []);
  return (
    <div className=" w-full flex justify-center">
      <div
        className={cx(
          "bg-white px-6 py-10 rounded-lg w-1/2",
          css`
            box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
          `,
        )}
      >
        <div className="mb-4">
          <label className="text-[#333] text-lg">Name:</label>
          <input
            type="text"
            className="w-full h-10 border-[1px] border-gray-500 rounded-md outline-none pl-2 mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-[#333] text-lg">Category:</label>
          <SelectCategory
            options={categories}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
          />
        </div>
        <div className="mb-4">
          <label className="text-[#333] text-lg">Description:</label>
          <input
            type="text"
            className="w-full h-10 border-[1px] border-gray-500 rounded-md outline-none pl-2 mt-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="text-[#333] text-lg">Price:</label>
          <input
            type="number"
            className="w-full h-10 border-[1px] border-gray-500 rounded-md outline-none pl-2 mt-2"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="text-[#333] text-lg">URL Image:</label>
          <input
            type="text"
            value={urlImage}
            className="w-full h-10 border-[1px] border-gray-500 rounded-md outline-none pl-2 mt-2"
            onChange={(e) => setUrlImage(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end items-center mt-8">
          <button className="w-32 h-10 text-teal-500 bg-white border-[1px] border-gray-500 rounded-md">Cancle</button>
          <button
            className="w-32 h-10 text-white bg-gray-800 rounded-md ml-4"
            onClick={handleSubmit}
          >
            {location.pathname.split("/").length === 4 ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

