import { FC } from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../../components/common/MainHeader";

const UpdateProductBox: FC = () => {
  return (
    <>
      <MainHeader page="Update Products" />
      <main>
        <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};
export default UpdateProductBox;

