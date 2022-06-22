import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/store/reducer/slices/authSlice";
import { AppDispatch, RootState } from "../../services/store/rootStore";
import { Field, Validate, validateLogin, validatePassword, validateUserName } from "../../utils/validate";

const Login: FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validate, setValidate] = useState<Validate>({
    userName: Field.PASS,
    password: Field.PASS,
  });

  const navigate = useNavigate();
  const [token, isLoading] = useSelector((state: RootState) => [state.auth.token, state.auth.isLoading]);
  const dispatch = useDispatch<AppDispatch>();
  const checkValidateUserName = () => {
    const checkValidateUserName = validateUserName(userName);
    setValidate({ ...validate, userName: checkValidateUserName });
  };
  const checkValidatePassword = () => {
    const checkValidateUser = validatePassword(password);
    setValidate({ ...validate, password: checkValidateUser });
  };
  const submit = async () => {
    const checkValidate = validateLogin(userName, password);
    if (checkValidate.userName === Field.PASS && checkValidate.password === Field.PASS) {
      dispatch(login({ userName, password }));
    } else {
      setValidate(checkValidate);
    }
  };
  useEffect(() => {
    token && navigate("/");
  }, [token, navigate]);
  return (
    <div className="w-screen h-screen flex bg-slate-50">
      <div className="m-auto max-w-md w-11/12 flex flex-col items-center">
        <img
          className="w-14"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
          alt=""
        />
        <h1 className="mt-6 text-3xl font-bold">Sign in with your account</h1>
        <div className="mt-4 w-full bg-white p-10 rounded-lg shadow-md">
          <div className="mb-4 w-full">
            <label
              className="w-full"
              htmlFor="user_name"
            >
              User Name
            </label>
            <input
              className="w-full outline-none border border-solid border-slate-300 rounded-md shadow-sm pl-2 h-9 mt-2"
              name="user_name"
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              onBlur={checkValidateUserName}
            />
            <div className={`${validate.userName === Field.PASS && "hidden"} text-rose-500 text-sm mt-1`}>
              {validate.userName === Field.NOT_INPUT
                ? "Vui lòng không để trống."
                : "Tên người dùng phải có từ 8-20 kí tự, bao gồm chữ thường, chữ in hoa và số"}
            </div>
          </div>
          <div className="mb-6 w-full">
            <label
              className="w-full"
              htmlFor="password"
            >
              Mật Khẩu
            </label>
            <input
              className="w-full outline-none border border-solid border-slate-300 rounded-md shadow-sm pl-2 h-9 mt-2"
              name="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onBlur={checkValidatePassword}
            />
            <div className={`${validate.password === Field.PASS && "hidden"} text-rose-500 text-sm mt-1`}>
              {validate.password === Field.NOT_INPUT
                ? "Vui lòng không để trống."
                : "Mật khẩu phải từ 8-15 kí tự, có ít nhất một chữ hoa, một chữ thường, một số và một kí tự đặc biệt."}
            </div>
          </div>
          <div className="w-full mb-6 flex justify-end">
            <Link
              to=""
              className="text-sm text-indigo-600 font-semibold"
            >
              Forgot your password?
            </Link>
          </div>
          <button
            className="w-full h-10 bg-indigo-700 rounded-md text-slate-50 mb-6"
            onClick={submit}
          >
            {isLoading ? "Loading ..." : "Sign in"}
          </button>
          <div className="w-full flex justify-between items-center">
            <div className="flex-1 h-0.5 bg-gray-400" />
            <Link
              to="/register"
              className="text-sm text-indigo-600 font-semibold px-1.5"
            >
              Sign up
            </Link>
            <div className="flex-1 h-0.5 bg-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;

