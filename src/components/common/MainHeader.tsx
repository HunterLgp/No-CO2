import { FC } from "react";

interface Props {
  page: string;
}
const MainHeader: FC<Props> = ({ page }) => {
  return (
    <header className="bg-white shadow mt-5">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">{page}</h1>
      </div>
    </header>
  );
};
export default MainHeader;

