import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../../Components/LoadingButton";

const AddCustomer = () => {
  const [isPosting, setIsPosting] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsPosting(true);
    const customer = {
      name: data.name,
      email: data.email,
      role: data.role,
    };
    setIsPosting(false)
    fetch("http://localhost:5000/customer", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success("customer added successfully");
        setIsPosting(false);
        navigate("/dashboard/customers");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className={`text-4xl font-bold text-center mb-10`}>Add a Customer</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto">
        <div className="mb-4 md:col-span-4">
          <label htmlFor="name" className="block  font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            {...register("name", { required: true })}
            className={`border bg-transparent p-2 w-full rounded-sm focus:outline-none`}
            required
          />
          {errors.name && (
            <span className="text-red-500">Name is required</span>
          )}
        </div>
        <div className="mb-4 md:col-span-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className={`border bg-transparent p-2 w-full rounded-sm focus:outline-none`}
            required
          />
          {errors.email && (
            <span className="text-red-500">Email is required</span>
          )}
        </div>
        <div className="mb-4 md:col-span-4">
          <label htmlFor="role" className="block font-medium mb-2">
            Role
          </label>
          <select
            type="text"
            id="role"
            {...register("role", { required: true })}
            className={`border bg-transparent p-2 w-full rounded-sm focus:outline-none`}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.category && (
            <span className="text-red-500">Role is required</span>
          )}
        </div>

        <div className="mb-6 flex justify-end items-center">
          {isPosting ? (
            <LoadingButton btnStyle={"mt-5"}></LoadingButton>
          ) : (
            <button
              type="submit"
              className={`font-semibold px-4 py-2 rounded-none mt-5 bg-emerald-700 text-white`}
            >
              Add Customer
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
