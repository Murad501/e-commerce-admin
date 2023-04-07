import React, { createContext, useContext, useEffect, useState } from "react";
import { userProvider } from "./UserContext";

export const paymentDetailsProvider = createContext();
const PaymentDetailsContext = ({ children }) => {
  const { user } = useContext(userProvider);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`https://e-commerce-admin-server-tawny.vercel.app/payment-details/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setPaymentDetails(data.paymentDetails);
        });
    }
  }, [user]);

  const value = {
    paymentDetails,
  };
  return (
    <paymentDetailsProvider.Provider value={value}>
      {children}
    </paymentDetailsProvider.Provider>
  );
};

export default PaymentDetailsContext;
