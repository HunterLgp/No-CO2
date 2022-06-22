import { useSelector } from "react-redux";
import { RootState } from "../services/store/rootStore";
export const useToken = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  return Boolean(token);
};

