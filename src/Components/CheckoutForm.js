import React, { useContext, useState } from "react";
import LoadingButton from "./LoadingButton";
import { detailsCartProvider } from "../Context/DetailsCartContext";
import { loadingProvider } from "../Context/LoadingContext";
import { useNavigate } from "react-router-dom";
import { userProvider } from "../Context/UserContext";

const CheckoutForm = ({ product }) => {
  const [processing, setProcessing] = useState(false);
  const { myCart, isLoading, refetch } = useContext(detailsCartProvider);
  const { setIsLoading } = useContext(loadingProvider);
  const {user} = useContext(userProvider)
  const navigate = useNavigate()

  if (isLoading) {
    return setIsLoading(true);
  } else {
    setIsLoading(false);
  }
  const currentProduct = myCart.find((pdct) => pdct?._id === product?._id);

  const price = parseInt(currentProduct?.price) * (currentProduct?.quantity);
  const VAT = parseInt(price * 0.08);
  const total = price + VAT + 5;


  const handlePayment = (e) => {
    e.preventDefault()
    setProcessing(true);
    const order = {
        ...currentProduct,
        buyer: user?.email,
        date: new Date(),
        productId: currentProduct._id
    }

    setTimeout(() => {
      fetch(`http://localhost:5000/handle-checkout-by/${currentProduct?._id}`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({order})
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          refetch();
          setProcessing(false);
          navigate('/cart')
        });
    }, 2000);
  };

  return (
    <div className="w-full">
      <form onSubmit={handlePayment}>
        <div className="my-10">
          <div className=" border-b">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-lg">Subtotal</h4>
              <p className="font-semibold">${price}</p>
            </div>
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-lg">VAT (8%)</h4>
              <p className="font-semibold">${VAT}</p>
            </div>
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-lg">Delivery charge</h4>
              <p className="font-semibold">$5</p>
            </div>
          </div>
          <div className="flex justify-between items-center my-5">
            <h4 className="text-xl font-semibold">Total</h4>
            <p className="text-xl font-semibold">${total}</p>
          </div>
        </div>
        {!processing ? (
          <span className="flex justify-end">
            <button
              type="submit"
              className={`border w-[200px] px-6 py-3 bg-emerald-700 text-white font-semibold `}
            >
              Pay
            </button>
          </span>
        ) : (
          <span className="flex justify-end">
            <LoadingButton btnStyle={" w-[200px] py-3"}></LoadingButton>
          </span>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
