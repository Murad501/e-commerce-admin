import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { detailsCartProvider } from "../../Context/DetailsCartContext";

const Cart = () => {
  const { myCart, refetch } = useContext(detailsCartProvider);
  refetch();
  return (
    <>
      {myCart.length ? (
        <div className="my-5">
          <div className="grid grid-cols-1 gap-5 my-5">
            {myCart.map((product) => (
              <ProductCard
                product={product}
                key={product._id}
                refetch={refetch}
              ></ProductCard>
            ))}
          </div>
          <span className="flex justify-center mt-10">
            {myCart.length > 1 ? (
              <Link
                to={`/checkout`}
                className="bg-emerald-700 text-white font-semibold px-2 md:px-5 py-2 mx-auto"
              >
                Checkout All
              </Link>
            ) : (
              ""
            )}
          </span>
        </div>
      ) : (
        <h3 className="text-xl">
          Your Cart is Empty.{" "}
          <Link to="/shop" className="font-semibold text-emerald-700">
            Shop Now
          </Link>
        </h3>
      )}
    </>
  );
};

export default Cart;
