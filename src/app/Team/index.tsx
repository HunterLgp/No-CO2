import { useDispatch } from "react-redux";
import MainHeader from "../../components/common/MainHeader";
import { loginSuccess } from "../../services/store/reducer/slices/auth/slice";
import { AppDispatch } from "../../services/store/rootStore";

const Team = () => {
  const dispatch= useDispatch<AppDispatch>()
  return (
    <>
      <MainHeader page="Team" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              <button onClick={()=>dispatch(loginSuccess("myToken"))}>click</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Team;
