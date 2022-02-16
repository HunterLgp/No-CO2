import { FC } from "react";
import { Link } from "react-router-dom";

const PageNotFound: FC = () => {
  return (
    <div
      className={"w-screen h-screen bg-cover bg-center"}
      style={{ backgroundImage: "url('/images/page_not_found.jpg')" }}
    >
      <div
        className="fixed text-center w-96 top-1/3"
        style={{ left: "calc(50% - 12rem)" }}
      >
        <div className="text-4xl font-bold text-white mb-4">Page Not Found</div>
        <Link to="/" className="rounded-md text-white">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};
export default PageNotFound;
