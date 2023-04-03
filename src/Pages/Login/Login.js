import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userProvider } from "../../Context/UserContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser, googleLogin } = useContext(userProvider);
  const [firebaseError, setFirebaseError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (data) => {
    loginUser(data.email, data.password)
      .then(() => {
        navigate(from, { replace: true });
        toast.success("user login successfully");
      })
      .catch((err) => {
        if (err.message === "Firebase: Error (auth/invalid-email).") {
          setFirebaseError("Invalid Email");
        } else if (err.message === "Firebase: Error (auth/user-not-found).") {
          setFirebaseError("User not found");
        }
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        navigate(from, { replace: true });
        toast.success("user login successfully");
      })
      .catch((err) => setFirebaseError(err.message));
  };

  return (
    <div className="hero text-black px-1">
      <div className="card  px-4 py-5 rounded-sm w-full max-w-md border">
        <h1 className="mb-5 text-center font-bold text-3xl">Login</h1>
        <div className="text-center mb-5">
          <p>admin-email: murad@gmail.com</p>
          <p>pass: 123123</p>
        </div>
        {firebaseError && (
          <p className="text-center text-red-600 my-2">{firebaseError}</p>
        )}
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control">
            <label className="label">
              <span className="text-sm text-gray-500">Email</span>
            </label>
            <input
              type="text"
              placeholder="example@gmail.com"
              className="input input-bordered focus:outline-none rounded-sm bg-white"
              {...register("email", { required: "Email is required" })}
            />
            <p className="text-red-600">
              {errors.email && <span>{errors.email?.message}</span>}
            </p>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-gray-500 text-sm">Password</span>
            </label>
            <input
              type="password"
              placeholder="********"
              className="input input-bordered focus:outline-none rounded-sm bg-white"
              {...register("password", { required: "Password is required" })}
            />
            <p className="text-red-600">
              {errors.password && <span>{errors.password?.message}</span>}
            </p>
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="py-3 bg-blue-500 rounded-sm text-white font-semibold"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center my-4">
          New to E-Commerce Admin?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
        <div className="divider text-md w-1/2 mx-auto">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="flex justify-center items-center py-3 rounded-sm font-semibold text-white gap-3 bg-green-500"
        >
          <FaGoogle></FaGoogle> Google Login
        </button>
      </div>
    </div>
  );
};

export default Login;
