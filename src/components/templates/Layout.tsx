import { FC } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout: FC = () => {
  return (
    <div className="min-h-full">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
