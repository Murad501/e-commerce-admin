import React, { useContext, useState } from "react";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";

import { useParams } from "react-router-dom";
import { userProvider } from "../../Context/UserContext";
import { loadingProvider } from "../../Context/LoadingContext";
import { productProvider } from "../../Context/ProductContext";
import { toast } from "react-hot-toast";
import { cartProvider } from "../../Context/CartContext";

const ProductDetails = () => {
  const { loading } = useContext(userProvider);
  const { setIsLoading } = useContext(loadingProvider);
  const { user } = useContext(userProvider);
  //   const navigate = useNavigate();
  const [productQuantity, setProductQuantity] = useState(1);
  const { products: cartProducts, refetch } = useContext(cartProvider);

  const { id } = useParams();
  const { products } = useContext(productProvider);
  if (loading) {
    return setIsLoading(true);
  } else {
    setIsLoading(false);
  }
  const product = products.find((product) => product._id === id);
  if (!product) {
    return setIsLoading(true);
  } else {
    setIsLoading(false);
  }
  const { picture, price, name, description, _id, quantity } =
    product;

  const quantityNumber = parseInt(quantity);

  const handleIncreaseQuantity = () => {
    if (productQuantity === quantityNumber) {
      return;
    }
    setProductQuantity(productQuantity + 1);
  };
  const handleDecreaseQuantity = () => {
    if (productQuantity === 1) {
      return;
    }
    setProductQuantity(productQuantity - 1);
  };

  const handleAddCart = (id) => {
    const alReadyAdded = cartProducts.find(
      (product) => product.productId === id
    );
    if (alReadyAdded) {
      toast.error("product already added");
      return;
    }
    const product = {
      productId: id,
      quantity: productQuantity,
      user: user?.email,
    };
    fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("product added into cart");
        refetch();
      });
  };

  return (
    <div className="py-10">
      <div className="grid justify-center items-center gird-cols-1 md:grid-cols-2 lg:grid-cols-9 ">
        <img
          className="lg:col-span-6 mx-auto max-h-[600px]"
          src={picture}
          alt="productImage"
        />
        <div className="lg:col-span-3">
          <h2 className="font-semibold text-3xl mb-10">{name}</h2>
          <div className="flex flex-col gap-5">
            <span className="flex items-center gap-1  font-semibold">
              <ImPriceTags></ImPriceTags>Price:{" "}
              <span className="font-bold">${price}</span>
            </span>
            <div className="flex items-center gap-10">
              <p className="font-semibold flex gap-3">
                Quantity: <span className="font-bold">{productQuantity}</span>
              </p>
              <span className="flex gap-5">
                <FaMinus
                  onClick={handleDecreaseQuantity}
                  className="hover:text-emerald-700 cursor-pointer"
                ></FaMinus>{" "}
                <FaPlus
                  onClick={handleIncreaseQuantity}
                  className="hover:text-emerald-700 cursor-pointer"
                ></FaPlus>
              </span>
            </div>
          </div>
          <button
            onClick={() => handleAddCart(_id)}
            type="submit"
            className={` font-semibold px-4 py-3 rounded-none mt-5 flex items-center gap-2 bg-emerald-700 text-white`}
          >
            <FaShoppingCart></FaShoppingCart>
            Add to Cart
          </button>
          <p className="text-lg mt-5">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
