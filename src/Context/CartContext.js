import React, { createContext } from "react";
import { useQuery } from "react-query";

export const cartProvider = createContext();
const CartContext = ({ children }) => {
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["cart-products"],
    queryFn: () =>
      fetch(`https://e-commerce-admin-server-tawny.vercel.app/cart-products`).then((res) => res.json()),
  });
  const value = {
    products,
    refetch,
    isLoading,
  };
  return (
    <cartProvider.Provider value={value}>{children}</cartProvider.Provider>
  );
};

export default CartContext;
