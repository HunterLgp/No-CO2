import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useToken } from "../hooks/useToken";
interface Props {
  children: JSX.Element;
}
const RequiredRouter: FC<Props> = ({ children }) => {
  const isLogin = useToken();
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

