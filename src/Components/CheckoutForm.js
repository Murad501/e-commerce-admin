import React, { useContext, useState } from "react";
import LoadingButton from "./LoadingButton";
import { detailsCartProvider } from "../Context/DetailsCartContext";
import { loadingProvider } from "../Context/LoadingContext";
import { paymentDetailsProvider } from "../Context/PaymentDetailsContext";
// import { userProvider } from "../Context/UserContext";
// import { paymentDetailsProvider } from "../Context/PaymentDetailsContext";

const CheckoutForm = ({ product }) => {
  //   const { user } = useContext(userProvider);
  const [processing, setProcessing] = useState(false);
    // const { paymentDetails } = useContext(paymentDetailsProvider);
  const { myCart, isLoading } = useContext(detailsCartProvider);
  const { setIsLoading } = useContext(loadingProvider);

  if (isLoading) {
    return setIsLoading(true);
  } else {
    setIsLoading(false);
  }
  const currentProduct = myCart.find((pdct) => pdct._id === product._id);

  const price = parseFloat(currentProduct?.price);
  const VAT = price * 0.08;
  const total = price + VAT + 5;

  return (
    <div className="w-full">
      <form>
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
            <LoadingButton btnStyle={"mt-5 w-[200px] py-3"}></LoadingButton>
          </span>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
