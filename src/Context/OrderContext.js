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
      fetch(`http://localhost:5000/orders`).then((res) => res.json()),
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
