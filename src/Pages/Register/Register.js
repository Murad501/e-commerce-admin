import { updateProfile } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userProvider } from "../../Context/UserContext";

const Register = () => {
  const { createUser, googleLogin } = useContext(userProvider);
  const [firebaseError, setFirebaseError] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");

  const passwordCheck = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //email & password registration user
  const handleRegister = (data) => {
    console.log("handle register");
    if (!data.password.match(passwordCheck)) {
      return setPasswordWarning(
        "The password must be at least 8 characters and contain lowercase, uppercase, number and special characters"
      );
    } else {
      setPasswordWarning("");
    }
    createUser(data.email, data.password)
      .then((result) => {
        const currentUser = result.user;
        updateProfile(currentUser, {
          displayName: data.name,
        })
          .then(() => {
            navigate(from, { replace: true });

            toast.success("user register successfully");
          })
          .catch((err) => setFirebaseError(err.message));
      })
      .catch((err) => setFirebaseError(err.message));
  };
  //seller registration
  // google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        navigate(from, { replace: true });
        toast.success("user register successfully");
      })
      .catch((err) => setFirebaseError(err.message));
  };

  return (
    <div className="hero text-black px-1">
      <div className="card  px-4 py-5 rounded-sm w-full max-w-md border">
        <h1 className="my-5 text-center font-bold text-3xl">Register</h1>
        {firebaseError && (
          <p className="text-center text-red-600 my-2">{firebaseError}</p>
        )}
        {passwordWarning && (
          <p className="text-center text-yellow-500 my-2">
            {passwordWarning}
          </p>
        )}
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="form-control">
            <label className="label">
              <span className="text-sm text-gray-500">Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered focus:outline-none rounded-sm bg-white"
              {...register("name", { required: "Name is required" })}
            />
            <p className="text-red-600">
              {errors.name && <span>{errors.name?.message}</span>}
            </p>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-sm text-gray-500">Number</span>
            </label>
            <input
              type="text"
              placeholder="01XXXXXXXXX"
              defaultValue="+880"
              className="input input-bordered focus:outline-none rounded-sm bg-white"
              {...register("number", { required: "Number is required" })}
            />
            <p className="text-red-600">
              {errors.number && <span>{errors.number?.message}</span>}
            </p>
          </div>
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
              Register
            </button>
          </div>
        </form>
        <p className="text-center my-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
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

export default Register;
