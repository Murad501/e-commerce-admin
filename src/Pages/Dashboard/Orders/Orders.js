import React from "react";

const Orders = () => {
  const orders = [1, 2, 3, 4, 5, 6, 7, 8, 8, 3, 4, 5, 6];
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
                    Address
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
                      {order.productName}
                    </td>
                    <td className="bg-transparent text-center border-0">
                      {order.transitionId}
                    </td>
                    <td className="bg-transparent text-center border-0">
                      {order.transitionId}
                    </td>
                    <td className="bg-transparent text-center border-0">
                      1
                    </td>
                    <td className="bg-transparent flex gap-5 justify-center items-center border-0">
                      <p
                        className={`${
                          idx % 2 === 0 ? "bg-emerald-100" : "bg-red-100"
                        } font-semibold px-1`}
                      >
                        {idx % 2 === 0 ? "Completed" : "Cancel"}
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
          <p className="text-xl">
            Order list is empty.
          </p>
        </div>
      )}
    </>
  );
};

export default Orders;
