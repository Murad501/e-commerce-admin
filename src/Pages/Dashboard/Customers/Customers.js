import React, { useContext } from "react";
import { useQuery } from "react-query";
import { userProvider } from "../../../Context/UserContext";

const Customers = () => {
  const { user } = useContext(userProvider);
  const { data: customers = [] } = useQuery({
    queryKey: ["customers", user?.email],
    queryFn: () =>
      fetch(`https://e-commerce-admin-server-tawny.vercel.app/customers`).then((res) => res.json()),
  });

  return (
    <>
      {customers.length ? (
        <div>
          <h1 className={`text-4xl font-bold text-center mb-10`}>
            Customer List
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
                    Email
                  </th>
                  <th className="bg-transparent font-bold text-[14px] text-center ">
                    Role
                  </th>
                  <th className="bg-transparent font-bold text-[14px] text-center">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, idx) => (
                  <tr key={customer._id} className={`border-b `}>
                    <th className="bg-transparent text-center border-0">
                      {idx + 1}
                    </th>
                    <td className="bg-transparent text-center border-0">
                      {customer.name}
                    </td>
                    <td className="bg-transparent text-center border-0">
                      {customer.email}
                    </td>
                    <td className="bg-transparent text-center border-0">
                      {customer.role}
                    </td>

                    <td className="bg-transparent flex gap-5 justify-center items-center border-0">
                      <button
                        className={`px-3 py-2 border hover:text-emerald-700 hover:border-emerald-700`}
                      >
                        Make Admin
                      </button>
                      <button
                        className={`px-3 py-2 border  hover:text-emerald-700 hover:border-emerald-700`}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl">customer list is empty.</p>
        </div>
      )}
    </>
  );
};

export default Customers;
