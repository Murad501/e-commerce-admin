import React, { useContext, useState } from "react";
import { detailsCartProvider } from "../../Context/DetailsCartContext";
import { loadingProvider } from "../../Context/LoadingContext";
import LoadingButton from "../../Components/LoadingButton";
import { userProvider } from "../../Context/UserContext";

const CheckoutForm = () => {
  const [processing, setProcessing] = useState(false);
  const { myCart, isLoading, refetch } = useContext(detailsCartProvider);
  const { setIsLoading } = useContext(loadingProvider);
  const { user } = useContext(userProvider);

  refetch();
  if (isLoading) {
    return setIsLoading(true);
  } else {
    setIsLoading(false);
  }
  const totalPrice = myCart.reduce(function (prev, cur) {
    return prev + parseInt(cur.price) * cur?.quantity;
  }, 0);
  const VAT = parseInt(totalPrice * 0.08);
  const total = totalPrice + 5 + parseInt(VAT);

  const handlePayment = (e) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      fetch(`http://localhost:5000/handle-checkout/${user?.email}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          refetch();
          setProcessing(false);
        });
    }, 2000);
  };

  return (
    <div className="w-full">
      <form onSubmit={handlePayment}>
        <div className="my-10">
          <div className=" border-b">
            {myCart.map((product) => (
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h4 className="text-lg">{product?.name}</h4>
                  <p className="font-semibold">
                    ${product?.price} * {product?.quantity} ={" "}
                    {product?.price * product?.quantity}
                  </p>
                </div>
              </div>
            ))}

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
            <LoadingButton btnStyle={"w-[200px] py-3"}></LoadingButton>
          </span>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
