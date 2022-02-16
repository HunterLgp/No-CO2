import { FC } from "react";
import { Link } from "react-router-dom";

const Login: FC = () => {
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
            <label className="w-full" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full outline-none border border-solid border-slate-300 rounded-md shadow-sm pl-2 h-9 mt-2"
              name="email"
              type="text"
            />
          </div>
          <div className="mb-6 w-full">
            <label className="w-full" htmlFor="password">
              Password
            </label>
            <input
              className="w-full outline-none border border-solid border-slate-300 rounded-md shadow-sm pl-2 h-9 mt-2"
              name="password"
              type="text"
            />
          </div>
          <div className="w-full mb-6 flex justify-end">
            <Link to="" className="text-sm text-indigo-600 font-semibold">
              Forgot your password?
            </Link>
          </div>
          <button className="w-full h-10 bg-indigo-700 rounded-md text-slate-50 mb-6">
            Sign in
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
