import React, { useContext, useState } from "react";
import { userProvider } from "../../Context/UserContext";
import { Link, useParams } from "react-router-dom";
// import { productProvider } from "../../Context/ProductContext";
// import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";
// import { BsFillBagCheckFill } from "react-icons/bs";
import { paymentDetailsProvider } from "../../Context/PaymentDetailsContext";
import CheckoutForm from "../../Components/CheckoutForm";
// import { productProvider } from "../../Context/ProductContext";
import { cartProvider } from "../../Context/CartContext";
// import CheckoutForm from "../CheckoutForm/CheckoutForm";

const PaymentDetails = () => {
  const { user } = useContext(userProvider);
  const { id } = useParams();
  const { products } = useContext(cartProvider);
  const product = products.find((product) => product?._id === id);
  //   const [transitionId, setTransitionId] = useState("");
  //   const [isSold, setIsSold] = useState(!product?.available);
  const { paymentDetails: previousPaymentDetails } = useContext(
    paymentDetailsProvider
  );

  const { products: cartProducts } = useContext(cartProvider);
  const available = cartProducts.find((pdct) => pdct._id === id);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    country: "",
    state: "",
    zip: "",
    landmark: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...previousPaymentDetails, [name]: value });
  };

  const handleAddPaymentDetails = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/save-payment-details/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ paymentDetails: formData }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          toast.success("payment details saved");
        }
      });
  };

  return (
    <>
      {available ? (
        <div className="w-full px-5">
          <div className="my-10">
            <div className="text-center mb-10">
              <h3 className={`text-3xl font-bold mb-5 `}>Payment Details</h3>
              <p className="font-medium">
                Complete your purchase by providing your payment details
              </p>
            </div>
            <div className="grid grid-cols-1 gap-20 ">
              <div className="max-w-5xl mx-auto w-full">
                <form onSubmit={handleAddPaymentDetails} className="my-10mx-2">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div>
                      <h4 className={`text-xl font-bold mb-5 `}>
                        Contact info
                      </h4>
                      <div className="mb-10">
                        <input
                          onChange={handleInputChange}
                          placeholder="First name"
                          type="text"
                          defaultValue={previousPaymentDetails?.firstName}
                          name="firstName"
                          id="firstName"
                          className={`border-b bg-transparent p-2 w-full rounded-sm focus:outline-none `}
                          required
                        />
                      </div>
                      <div className="mb-10">
                        <input
                          onChange={handleInputChange}
                          defaultValue={previousPaymentDetails?.lastName}
                          placeholder="Last name"
                          type="text"
                          name="lastName"
                          id="lastName"
                          className={`border-b bg-transparent p-2 w-full rounded-sm focus:outline-none `}
                          required
                        />
                      </div>
                      <div className="mb-10">
                        <input
                          onChange={handleInputChange}
                          placeholder="Email"
                          defaultValue={previousPaymentDetails?.email}
                          type="email"
                          name="email"
                          id="email"
                          className={`border-b bg-transparent p-2 w-full rounded-sm focus:outline-none `}
                          required
                        />
                      </div>
                      <div className="mb-10">
                        <input
                          onChange={handleInputChange}
                          placeholder="Phone number"
                          defaultValue={previousPaymentDetails?.number}
                          type="number"
                          name="number"
                          id="number"
                          className={`border-b bg-transparent p-2 w-full rounded-sm focus:outline-none`}
                          required
                        />
                      </div>
                    </div>
                    <div className="my-10 lg:my-0">
                      <h4 className={`text-xl font-bold mb-5 `}>
                        Billing address
                      </h4>
                      <div className="mb-10">
                        <input
                          onChange={handleInputChange}
                          placeholder="Country"
                          defaultValue={previousPaymentDetails?.country}
                          type="text"
                          name="country"
                          id="country"
                          className={`border-b bg-transparent p-2 w-full rounded-sm focus:outline-none`}
                          required
                        />
                      </div>
                      <div className="mb-10">
                        <input
                          onChange={handleInputChange}
                          placeholder="State"
                          defaultValue={previousPaymentDetails?.state}
                          type="text"
                          name="state"
                          id="state"
                          className={`border-b bg-transparent p-2 w-full rounded-sm focus:outline-none`}
                          required
                        />
                      </div>
                      <div className="mb-10">
                        <input
                          onChange={handleInputChange}
                          placeholder="Zip code"
                          defaultValue={previousPaymentDetails?.zip}
                          type="number"
                          name="zip"
                          id="zip"
                          className={`border-b bg-transparent p-2 w-full rounded-sm focus:outline-none`}
                          required
                        />
                      </div>
                      <div className="mb-10">
                        <input
                          onChange={handleInputChange}
                          defaultValue={previousPaymentDetails?.landmark}
                          id="landmark"
                          name="landmark"
                          type="text"
                          placeholder="E.g beside train station"
                          className={`border-b bg-transparent p-2 w-full rounded-sm focus:outline-none`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-end">
                    <button
                      type="submit"
                      className={`mb-5 bg-emerald-700 text-white px-10 py-2 `}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
              <div className="max-w-5xl mx-auto w-full">
                <div>
                  <h4 className={`text-xl font-bold mb-5`}>Order summary</h4>
                  <CheckoutForm product={product}></CheckoutForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text-xl">
          This Product is not available into your cart.{" "}
          <Link to="/shop" className="font-semibold text-emerald-700">
            Shop Now
          </Link>
        </h3>
      )}
    </>
  );
};

export default PaymentDetails;
