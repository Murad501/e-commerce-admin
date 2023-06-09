import React, { useContext } from "react";
import { productProvider } from "../../../Context/ProductContext";

const Products = () => {
  const {products} = useContext(productProvider)

  return (
    <>
      {products.length ? (
        <div>
          <h1 className={`text-4xl font-bold text-center mb-10`}>
            Product List
          </h1>
          <div className="overflow-x-auto">
            <table className={`table w-full border `}>
              {/* head */}
              <thead>
                <tr className={`border-b `}>
                  <th className="bg-transparent font-bold text-[14px] text-center">
                    SN
                  </th>
                  <th className="bg-transparent font-bold text-[14px] text-center w-1/3">
                    Name
                  </th>
                  <th className="bg-transparent font-bold text-[14px] text-center  w-1/3">
                    Seller
                  </th>
                  <th className="bg-transparent font-bold text-[14px] text-center ">
                    Quantity
                  </th>

                  <th className="bg-transparent font-bold text-[14px] text-center">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, idx) => (
                  <tr key={product._id} className={`border-b `}>
                    <th className="bg-transparent text-center border-0">
                      {idx + 1}
                    </th>
                    <td className="bg-transparent text-center border-0">
                      {product.name}
                    </td>
                    <td className="bg-transparent text-center border-0">
                      {product.postedBy}
                    </td>
                    <td className="bg-transparent text-center border-0">{product?.quantity}</td>
                    <td className="bg-transparent flex gap-5 justify-center items-center border-0">
                      <p className="font-semibold">${product?.price}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl">product list is empty.</p>
        </div>
      )}
    </>
  );
};

export default Products;
