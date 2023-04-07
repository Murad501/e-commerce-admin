import { updateProfile } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userProvider } from "../../Context/UserContext";
import { saveUser } from "../../Shared/saveUser";
import { FaRadiation } from "react-icons/fa";

const Register = () => {
  const { createUser } = useContext(userProvider);
  const [firebaseError, setFirebaseError] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [registering, setRegistering] = useState(false);

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
    if (!data.password.match(passwordCheck)) {
      return setPasswordWarning(
        "The password must be at least 8 characters and contain lowercase, uppercase, number and special characters"
      );
    } else {
      setPasswordWarning("");
    }
    setRegistering(true);
    createUser(data.email, data.password)
      .then((result) => {
        const user = {
          name: data.name,
          email: data.email,
          role: "user",
        };
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
        saveUser(user);
        const currentUser = result.user;
        updateProfile(currentUser, {
          displayName: data.name,
        })
          .then(() => {
            navigate(from, { replace: true });
            setRegistering(false);
            toast.success("user register successfully");
          })
          .catch((err) => {
            setRegistering(false);
            setFirebaseError(err.message);
          });
      })
      .catch((err) => {
        setRegistering(false);
        setFirebaseError(err.message);
      });
  };

  return (
    <div className="hero text-black px-1">
      <div className="card  px-4 py-5 rounded-sm w-full max-w-md border">
        <h1 className="my-5 text-center font-bold text-3xl">Register</h1>
        {firebaseError && (
          <p className="text-center text-red-600 my-2">{firebaseError}</p>
        )}
        {passwordWarning && (
          <p className="text-center text-yellow-500 my-2">{passwordWarning}</p>
        )}
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="form-control mb-3">
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
          <div className="form-control mb-3">
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
            {registering ? (
              <button
                type="button"
                className={`py-3 bg-emerald-700 rounded-sm text-white font-semibold flex justify-center items-center`}
                disabled
              >
                <FaRadiation className="animate-spin h-5 w-5 mr-3 "></FaRadiation>
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                className="py-3 bg-emerald-700 rounded-sm text-white font-semibold"
              >
                Register
              </button>
            )}
          </div>
        </form>
        <p className="text-center my-4">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-700 font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
