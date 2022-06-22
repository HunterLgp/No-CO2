import { FC, useState, useEffect } from "react";
import {
  Field,
  validateRegister,
  validatePassword,
  validateConfirmPassword,
  validateEmail,
  Validate,
  validateUserName,
} from "../../utils/validate";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/store/reducer/slices/authSlice";
import { AppDispatch, RootState } from "../../services/store/rootStore";
import { CheckBox } from "../../components/global/groupCheckBox";
import { validateName } from "../../utils/validate";

export const optionsGender = [
  {
    value: 0,
    label: "Nam",
  },
  {
    value: 1,
    label: "Nữ",
  },
  {
    value: 2,
    label: "Khác",
  },
];

const Register: FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [gender, setGender] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [validate, setValidate] = useState<Validate>({
    userName: Field.PASS,
    email: Field.PASS,
    password: Field.PASS,
    confirmPassword: Field.PASS,
    firstName: Field.PASS,
    lastName: Field.PASS,
  });
  const navigate = useNavigate();

  const [isLogin, isLoading] = useSelector((state: RootState) => [!!state.auth.token, state.auth.isLoading]);
  const dispatch = useDispatch<AppDispatch>();

  const checkValidateUserName = () => {
    const checkValidateUserName = validateUserName(userName);
    setValidate({ ...validate, userName: checkValidateUserName });
  };

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

  const checkValidateFirstName = () => {
    const checkValidateFirstName = validateName(firstName);
    setValidate({ ...validate, firstName: checkValidateFirstName });
  };
  const checkValidateLastName = () => {
    const checkValidateLastName = validateName(lastName);
    setValidate({ ...validate, lastName: checkValidateLastName });
  };
  const submit = () => {
    if (!isLoading) {
      const checkValidate = validateRegister(userName, email, password, confirmPassword, firstName, lastName);
      checkValidate.userName === Field.PASS &&
      checkValidate.email === Field.PASS &&
      checkValidate.password === Field.PASS &&
      checkValidate.confirmPassword === Field.PASS &&
      checkValidate.firstName === Field.PASS &&
      checkValidate.lastName === Field.PASS
        ? dispatch(register({ userName, password, email, gender, firstName, lastName }))
        : setValidate(checkValidate);
    }
  };

  useEffect(() => {
    isLogin && navigate("/");
  }, [isLogin, navigate]);
  return (
    <div className="w-full pb-6 flex bg-slate-50">
      <div className="m-auto max-w-md w-11/12 flex flex-col items-center mt-6">
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
                : "Tên người dùng phải có từ 8-20 kí tự, bao gồm chữ thường, chữ in hoa và số."}
            </div>
          </div>
          <div className="mb-4 w-full">
            <label
              className="w-full"
              htmlFor="password"
            >
              Password
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
          <div className="mb-4 w-full">
            <label
              className="w-full"
              htmlFor="confirm_password"
            >
              Confirm Password
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
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
            />
            <div className={`${validate.confirmPassword === Field.PASS && "hidden"} text-rose-500 text-sm mt-1`}>
              {validate.confirmPassword === Field.NOT_INPUT
                ? "Vui lòng không để trống"
                : "Mật khẩu xác nhận không khớp"}
            </div>
          </div>
          <div className="mb-4 w-full">
            <label
              className="w-full"
              htmlFor="email"
            >
              Email Address
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
            />
            <div className={`${validate.email === Field.PASS && "hidden"} text-rose-500 text-sm mt-1`}>
              {validate.email === Field.NOT_INPUT ? "Vui lòng không để trống." : "Vui lòng nhập đúng chuẩn email."}
            </div>
          </div>
          <div className="mb-4 w-full">
            <label
              className="w-full"
              htmlFor="first_name"
            >
              First Name
            </label>
            <input
              className="w-full outline-none border border-solid border-slate-300 rounded-md shadow-sm pl-2 h-9 mt-2"
              name="first_name"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              onBlur={checkValidateFirstName}
            />
            <div className={`${validate.firstName === Field.PASS && "hidden"} text-rose-500 text-sm mt-1`}>
              {validate.firstName === Field.NOT_INPUT
                ? "Vui lòng không để trống."
                : "Vui lòng nhập chữ cái đầu in hoa."}
            </div>
          </div>
          <div className="mb-4 w-full">
            <label
              className="w-full"
              htmlFor="last_name"
            >
              Last Name
            </label>
            <input
              className="w-full outline-none border border-solid border-slate-300 rounded-md shadow-sm pl-2 h-9 mt-2"
              name="last_name"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              onBlur={checkValidateLastName}
            />
            <div className={`${validate.email === Field.PASS && "hidden"} text-rose-500 text-sm mt-1`}>
              {validate.email === Field.NOT_INPUT ? "Vui lòng không để trống." : "Vui lòng nhập chữ cái đầu in hoa."}
            </div>
          </div>
          <div className="mb-6 w-full">
            <label
              className="w-full"
              htmlFor="gender"
            >
              Gender
            </label>
            <CheckBox
              value={gender}
              setValue={setGender}
              options={optionsGender}
            />
          </div>
          <button
            className="w-full h-10 bg-indigo-700 rounded-md text-slate-50 mb-6"
            onClick={submit}
          >
            {isLoading ? "Registering" : "Sign up"}
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

