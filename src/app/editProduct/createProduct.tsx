import { FC } from "react";
import MainHeader from "../../components/common/MainHeader";
import EditProduct from "./editProduct";

const CreateProduct: FC = () => {
  return (
    <>
      <MainHeader page="Create Products" />
      <main>
        <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <EditProduct />
          </div>
        </div>
      </main>
    </>
  );
};
export default CreateProduct;

