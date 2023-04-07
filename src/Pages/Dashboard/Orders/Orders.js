import React, { useContext } from "react";
import { orderProvider } from "../../../Context/OrderContext";

const Orders = () => {
  const { orders } = useContext(orderProvider);
  return (
    <>
      {orders.length ? (
        <div>
          <h1 className={`text-4xl font-bold text-center mb-10`}>Order List</h1>
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
                    Customer
                  </th>
                  <th className="bg-transparent font-bold text-[14px] text-center w-1/3">
                    Price
                  </th>
                  <th className="bg-transparent font-bold text-[14px] text-center ">
                    Quantity
                  </th>

                  <th className="bg-transparent font-bold text-[14px] text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={order._id} className={`border-b `}>
                    <th className="bg-transparent text-center border-0">
                      {idx + 1}
                    </th>
                    <td className="bg-transparent text-center border-0">
                      {order?.name}
                    </td>
                    <td className="bg-transparent text-center border-0">
                      {order?.buyer}
                    </td>
                    <td className="bg-transparent text-center border-0">
                      ${order?.price}
                    </td>
                    <td className="bg-transparent text-center border-0">
                      {order?.quantity}
                    </td>
                    <td className="bg-transparent flex gap-5 justify-center items-center border-0">
                      <p
                        className={`bg-emerald-50 font-semibold px-3 rounded-sm`}
                      >
                        Paid
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl">Order list is empty.</p>
        </div>
      )}
    </>
  );
};

export default Orders;
