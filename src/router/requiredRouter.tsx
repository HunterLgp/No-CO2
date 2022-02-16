import { FC } from "react";
import { Navigate } from "react-router-dom";
interface Props {
  children: JSX.Element;
}
const RequiredRouter: FC<Props> = ({ children }) => {
  const isLogin = false;
  return isLogin ? children : <Navigate to="/login" replace={true} />;
};
export default RequiredRouter;
