import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userProvider } from "../../Context/UserContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser } = useContext(userProvider);
  const [firebaseError, setFirebaseError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (data) => {
    loginUser(data.email, data.password)
      .then(() => {
        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email: data.email }),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("token", data.token);
          });
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

  return (
    <div className="hero text-black px-1">
      <div className="card  px-4 py-5 rounded-sm w-full max-w-md border">
        <h1 className="mb-5 text-center font-bold text-3xl">Login</h1>
        <div className="text-center mb-5">
          <p>admin-email: murad@gmail.com</p>
          <p>pass: Murad@12345</p>
        </div>
        {firebaseError && (
          <p className="text-center text-red-600 my-2">{firebaseError}</p>
        )}
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control mb-3">
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
          <div className="form-control mb-3">
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
              className="py-3 bg-emerald-700 rounded-sm text-white font-semibold"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center my-4">
          New to E-Commerce?{" "}
          <Link to="/register" className="text-emerald-700 font-bold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
