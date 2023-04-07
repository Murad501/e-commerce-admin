import React, { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { userProvider } from "./UserContext";
import { productProvider } from "./ProductContext";

export const detailsCartProvider = createContext();
const DetailsCartContext = ({ children }) => {
  const { user } = useContext(userProvider);
  const { products } = useContext(productProvider);
  const {
    data: myCartProducts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-cart"],
    queryFn: () =>
      fetch(`https://e-commerce-admin-server-tawny.vercel.app/my-cart/${user?.email}`, {
        headers: {
          "content-type": "application/json",
          
        },
      }).then((res) => res.json()),
  });

  if(products.message){
    return
  }


  const myCart = products?.filter((product) =>
      myCartProducts?.some(
        (cartProduct) => cartProduct.productId === product._id
      )
    )
    .map((item) => ({
      ...item,
      quantity: myCartProducts?.find((item2) => item2.productId === item._id)
        .quantity,
      _id: myCartProducts?.find((item2) => item2.productId === item._id)._id,
      productId: myCartProducts?.find((item2) => item2.productId === item._id)
        .productId,
    }));
  const value = {
    myCart,
    refetch,
    isLoading,
  };
  return (
    <detailsCartProvider.Provider value={value}>
      {children}
    </detailsCartProvider.Provider>
  );
};

export default DetailsCartContext;
