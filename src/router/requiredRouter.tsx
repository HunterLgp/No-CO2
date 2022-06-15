import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../services/store/rootStore";
interface Props {
  children: JSX.Element;
}
const RequiredRouter: FC<Props> = ({ children }) => {
  const isLogin = true;
  // const isLogin = useSelector((state: RootState) => state.auth.token);
  return isLogin ? (
    children
  ) : (
    <Navigate
      to="/login"
      replace={true}
    />
  );
};
export default RequiredRouter;
