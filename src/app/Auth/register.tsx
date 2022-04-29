import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/store/reducer/slices/auth/slice";
import { AppDispatch, RootState } from "../../services/store/rootStore";
import { Field, Validate } from "../../services/types/validate";
import { validateAll, validatePassword, validateConfirmPassword, validateEmail } from "../../services/utils/validate";

const Register: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [validate, setValidate] = useState<Validate>({
    email: Field.PASS,
    password: Field.PASS,
    confirmPassword: Field.PASS,
  });
  const navigate = useNavigate();
  const [isLogin, isLoading] = useSelector((state: RootState) => [!!state.auth.token, state.auth.isLoading]);
  const dispatch = useDispatch<AppDispatch>();
  const checkValidateEmail = () => {
    const checkValidateEmail = validateEmail(email);
    setValidate({ ...validate, email: checkValidateEmail });
  };
  const checkValidatePassword = () => {
    const checkValidateEmail = validatePassword(password);
    setValidate({ ...validate, password: checkValidateEmail });
  };
  const checkValidateConfirmPassword = () => {
    if (validatePassword(password) === Field.PASS) {
      const checkValidateConfirmPassword = validateConfirmPassword(confirmPassword, password);
      setValidate({ ...validate, confirmPassword: checkValidateConfirmPassword });
    }
  };
  const submit = () => {
    const checkValidate = validateAll(email, password, confirmPassword);
    checkValidate.email === Field.PASS &&
    checkValidate.password === Field.PASS &&
    checkValidate.confirmPassword === Field.PASS
      ? dispatch(register({ email, password }))
      : setValidate(checkValidate);
  };
  useEffect(() => {
    isLogin && navigate("/");
  }, [isLogin, navigate]);
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
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full outline-none border border-solid border-slate-300 rounded-md shadow-sm pl-2 h-9 mt-2"
              name="email"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onBlur={checkValidateEmail}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
            />
            <div className={`${validate.email === Field.PASS && "hidden"} text-rose-500 text-sm mt-1`}>
              {validate.email === Field.NOT_INPUT ? "Vui lòng không để trống." : "Vui lòng nhập đúng chuẩn email."}
            </div>
          </div>
          <div className="mb-4 w-full">
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
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
            />
            <div className={`${validate.password === Field.PASS && "hidden"} text-rose-500 text-sm mt-1`}>
              {validate.password === Field.NOT_INPUT
                ? "Vui lòng không để trống."
                : "Mật khẩu phải từ 8-15 kí tự, có ít nhất một chữ hoa, một chữ thường, một số và một kí tự đặc biệt."}
            </div>
          </div>
          <div className="mb-6 w-full">
            <label
              className="w-full"
              htmlFor="confirm_password"
            >
              Xác Nhận Mật Khẩu
            </label>
            <input
              className="w-full outline-none border border-solid border-slate-300 rounded-md shadow-sm pl-2 h-9 mt-2"
              name="confirm_password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              onBlur={checkValidateConfirmPassword}
            />
            <div className={`${validate.confirmPassword === Field.PASS && "hidden"} text-rose-500 text-sm mt-1`}>
              {validate.confirmPassword === Field.NOT_INPUT
                ? "Vui lòng không để trống"
                : "Mật khẩu xác nhận không khớp"}
            </div>
          </div>
          <button
            className="w-full h-10 bg-indigo-700 rounded-md text-slate-50 mb-6"
            onClick={submit}
          >
            {isLoading ? "Loading ..." : "Sign up"}
          </button>
          <div className="w-full flex justify-between items-center">
            <div className="flex-1 h-0.5 bg-gray-400" />
            <Link
              to="/login"
              className="text-sm text-indigo-600 font-semibold px-1.5"
            >
              Sign in
            </Link>
            <div className="flex-1 h-0.5 bg-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
