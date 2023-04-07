import React, { createContext } from "react";
import { useQuery } from "react-query";

export const orderProvider = createContext();
const OrderContext = ({ children }) => {


  const {
    data: orders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`https://e-commerce-admin-server-tawny.vercel.app/orders`).then((res) => res.json()),
  });

  const value = {
    orders,
    refetch,
    isLoading,
  };
  return (
    <orderProvider.Provider value={value}>{children}</orderProvider.Provider>
  );
};

export default OrderContext;
