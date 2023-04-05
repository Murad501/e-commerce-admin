import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegTimesCircle } from "react-icons/fa";
// import { loadingProvider } from "../../../Context/LoadingContext";
import { userProvider } from "../../../Context/UserContext";
import { toast } from "react-hot-toast";
import LoadingButton from "../../../Components/LoadingButton";
import { useNavigate } from "react-router-dom";
import { productProvider } from "../../../Context/ProductContext";

const AddProduct = () => {
  const imgbbApi = process.env.REACT_APP_imgbbApi;
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useContext(userProvider);
  const [isPosting, setIsPosting] = useState(false);

  const {refetch} = useContext(productProvider)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsPosting(true);
    const image = data.profileImage[0];
    const formData = new FormData();
    formData.append("image", image);
    fetch(`https://api.imgbb.com/1/upload?key=${imgbbApi}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.data.url) {
          const imgUrl = result.data.url;
          const product = {
            postedBy: user.email,
            picture: imgUrl,
            price: data.price,
            quantity: data.quantity,
            name: data.name,
            description: data.description,
            date: new Date(),
          };

          fetch("http://localhost:5000/product", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then(() => {
              refetch()
              navigate('/dashboard/products')
            })
            .catch((err) => console.log(err));

          toast.success("image upload successfully");
          console.log(product);
          setIsPosting(false);
        }
      });
  };

  function handleImageChange(event) {
    const image = event.target.files[0];
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
    }
  }

  function handleRemoveImage(e) {
    setSelectedImage(null);
  }

  return (
    <div>
      <h1 className={`text-4xl font-bold text-center mb-10`}>Add a Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="mb-4">
            <label htmlFor="price" className="block  font-medium mb-2">
              Price $
            </label>
            <input
              type="number"
              id="price"
              placeholder="Price"
              {...register("price", { required: true })}
              className={`border bg-transparent p-2 w-full rounded-sm focus:outline-none`}
              required
            />
            {errors.price && (
              <span className="text-red-500">Price is required</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block  font-medium mb-2">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              placeholder="Quantity"
              {...register("quantity", { required: true })}
              className={`border bg-transparent p-2 w-full rounded-sm focus:outline-none`}
              required
            />
            {errors.quantity && (
              <span className="text-red-500">Quantity is required</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block  font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            {...register("description", { required: true })}
            className={`textarea textarea-bordered bg-transparent p-2 w-full rounded-sm focus:outline-none`}
            required
          />
          {errors.description && (
            <span className="text-red-500">Description is required</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Product Image</label>
          <div className="relative">
            <input
              {...register("profileImage")}
              type="file"
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              onChange={handleImageChange}
            />
            <div
              className={`border h-60 flex items-center justify-center p-2 w-full rounded-sm focus:outline-none`}
            >
              {selectedImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={selectedImage}
                    alt="Selected Profile"
                    className="h-full mx-auto"
                  />
                  <FaRegTimesCircle
                    className="absolute top-0 right-0  w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
                    onClick={handleRemoveImage}
                  ></FaRegTimesCircle>
                </div>
              ) : (
                <div className="text-gray-400 text-sm">
                  Drag and drop your profile image here or click to select
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-6 flex justify-end items-center">
          {isPosting ? (
            <LoadingButton btnStyle={"mt-5"}></LoadingButton>
          ) : (
            <button
              type="submit"
              className={`font-semibold px-4 py-2 rounded-none mt-5 bg-emerald-700 text-white`}
            >
              Add Product
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
