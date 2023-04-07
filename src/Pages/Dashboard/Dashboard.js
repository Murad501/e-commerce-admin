import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  BsFillBagPlusFill,
  BsFillBoxFill,
  BsFillCartCheckFill,
} from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { FaUserPlus } from "react-icons/fa";
import { dashboardProvider } from "../../Context/DashboardContext";
import useAdmin from "../../Hooks/useAdmin";

const Dashboard = () => {
  const { showFullMenu } = useContext(dashboardProvider);
  const { isAdmin } = useAdmin();

  const commonClass = `text-xl font-medium bg-transparent hover:text-emerald-700 flex items-center ${
    showFullMenu ? "justify-center lg:justify-start" : "justify-center"
  } gap-3 whitespace-nowrap overflow-hidden py-3 px-5 md:px-3`;

  return (
    <nav
      className={`flex flex-row md:flex-col justify-evenly border-b md:border-b-0 md:py-5 gap-3`}
    >
      {isAdmin && (
        <>
          <NavLink title="Orders" to="/dashboard/orders">
            {({ isActive }) => (
              <div
                className={`${
                  isActive &&
                  "text-emerald-700 bg-emerald-50 border-b-4 md:border-l-4 md:border-b-0 border-emerald-700"
                } hover:bg-emerald-50 hover:border-b-4 hover:md:border-l-4 hover:md:border-b-0  hover:border-emerald-700 hover:transition-all`}
              >
                <span className={`${commonClass}`}>
                  <BsFillCartCheckFill className="h-7"></BsFillCartCheckFill>
                  {showFullMenu && <p className="hidden lg:block">Orders</p>}
                </span>
              </div>
            )}
          </NavLink>

          <NavLink title="Products" to="/dashboard/products">
            {({ isActive }) => (
              <div
                className={`${
                  isActive &&
                  "text-emerald-700 bg-emerald-50 border-b-4 md:border-l-4 md:border-b-0 border-emerald-700"
                } hover:bg-emerald-50 hover:border-b-4 hover:md:border-l-4 hover:md:border-b-0  hover:border-emerald-700 hover:transition-all`}
              >
                <span className={`${commonClass}`}>
                  <BsFillBoxFill className="h-7"></BsFillBoxFill>
                  {showFullMenu && <p className="hidden lg:block">Products</p>}
                </span>
              </div>
            )}
          </NavLink>
          <NavLink title="Add Product" to="/dashboard/add-product">
            {({ isActive }) => (
              <div
                className={`${
                  isActive &&
                  "text-emerald-700 bg-emerald-50 border-b-4 md:border-l-4 md:border-b-0 border-emerald-700"
                } hover:bg-emerald-50 hover:border-b-4 hover:md:border-l-4 hover:md:border-b-0  hover:border-emerald-700 hover:transition-all`}
              >
                <span className={`${commonClass}`}>
                  <BsFillBagPlusFill className="h-7"></BsFillBagPlusFill>
                  {showFullMenu && (
                    <p className="hidden lg:block">Add Product</p>
                  )}
                </span>
              </div>
            )}
          </NavLink>

          <NavLink title="Customers" to="/dashboard/customers">
            {({ isActive }) => (
              <div
                className={`${
                  isActive &&
                  "text-emerald-700 bg-emerald-50 border-b-4 md:border-l-4 md:border-b-0 border-emerald-700"
                } hover:bg-emerald-50 hover:border-b-4 hover:md:border-l-4 hover:md:border-b-0  hover:border-emerald-700 hover:transition-all`}
              >
                <span className={`${commonClass}`}>
                  <HiUsers className="h-7"></HiUsers>
                  {showFullMenu && <p className="hidden lg:block">Customers</p>}
                </span>
              </div>
            )}
          </NavLink>
          <NavLink title="Add Customer" to="/dashboard/add-customer">
            {({ isActive }) => (
              <div
                className={`${
                  isActive &&
                  "text-emerald-700 bg-emerald-50 border-b-4 md:border-l-4 md:border-b-0 border-emerald-700"
                } hover:bg-emerald-50 hover:border-b-4 hover:md:border-l-4 hover:md:border-b-0  hover:border-emerald-700 hover:transition-all`}
              >
                <span className={`${commonClass}`}>
                  <FaUserPlus className="h-7"></FaUserPlus>

                  {showFullMenu && (
                    <p className="hidden lg:block">Add Customer</p>
                  )}
                </span>
              </div>
            )}
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Dashboard;
