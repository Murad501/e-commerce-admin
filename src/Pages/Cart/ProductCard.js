import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { cartProvider } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { productProvider } from "../../Context/ProductContext";

const ProductCard = ({ product, refetch }) => {
  const [productQuantity, setProductQuantity] = useState(product?.quantity);
  const { refetch: cartRefetch } = useContext(cartProvider);
  const { products } = useContext(productProvider);

  const currentProduct = products.find(
    (pdct) => pdct._id === product.productId
  );

  const currentQuantity = parseInt(currentProduct?.quantity);

  const handleIncreaseQuantity = (id) => {
    if (productQuantity === currentQuantity) {
      return;
    }
    setProductQuantity(productQuantity + 1);
    fetch(`https://e-commerce-admin-server-tawny.vercel.app/update-quantity/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        quantity: productQuantity + 1,
      }),
    })
      .then((res) => res.json())
      .then(() => cartRefetch());
  };
  const handleDecreaseQuantity = (id) => {
    if (productQuantity === 1) {
      return;
    }
    setProductQuantity(productQuantity - 1);
    fetch(`https://e-commerce-admin-server-tawny.vercel.app/update-quantity/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        quantity: productQuantity - 1,
      }),
    })
      .then((res) => res.json())
      .then(() => cartRefetch());
  };

  const handleDeleteCartProduct = (id) => {
    fetch(`https://e-commerce-admin-server-tawny.vercel.app/delete-cart-item/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("product delete successfully");
        refetch();
        cartRefetch();
      });
  };

  return (
    <div className="card card-side shadow-sm border rounded-sm p-2 max-w-5xl md:min-w-full lg:min-w-full">
      <figure>
        <img className="max-h-20" src={product.picture} alt="Movie" />
      </figure>
      <div className="card-body flex-row items-center justify-between gap-5 md:gap-10 px-2 md:px-8 py-1">
        <div className="hidden md:block">
          <h2 className="card-title mb-3">
            {product?.name.length > 50
              ? product?.name.slice(0, 50) + "..."
              : product?.name}
          </h2>
          <p className="font-semibold">${product?.price}</p>
        </div>
        <div className="flex gap-5 items-center">
          <div className="md:hidden flex-col justify-center items-center">
            <h2 className="mb-3 font-semibold text-center">
              ${product?.price}
            </h2>
            <div className="flex justify-center items-center gap-3">
              <FaMinus
                onClick={handleDecreaseQuantity}
                className="hover:text-emerald-700 cursor-pointer"
              ></FaMinus>{" "}
              <p>{productQuantity}</p>
              <FaPlus
                onClick={handleIncreaseQuantity}
                className="hover:text-emerald-700 cursor-pointer"
              ></FaPlus>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex justify-center items-center gap-3">
              <FaMinus
                onClick={() => handleDecreaseQuantity(product._id)}
                className="hover:text-emerald-700 font-normal cursor-pointer"
              ></FaMinus>{" "}
              <p>{productQuantity}</p>
              <FaPlus
                onClick={() => handleIncreaseQuantity(product._id)}
                className="hover:text-emerald-700 cursor-pointer"
              ></FaPlus>
            </div>
          </div>
          <span
            onClick={() => handleDeleteCartProduct(product?._id)}
            className="border p-3 rounded-full hover:text-red-400 hover:border-red-400 transition-all duration-700 cursor-pointer"
          >
            <FaTrash></FaTrash>
          </span>
          <div className="card-actions justify-end">
            <Link
              to={`/checkout/${product?._id}`}
              className="bg-emerald-700 text-white font-semibold px-2 md:px-5 py-2"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
