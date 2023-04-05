import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  BsFillBagPlusFill,
  BsFillBoxFill,
  BsFillCartCheckFill,
} from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { HiShoppingCart, HiUsers } from "react-icons/hi";
import { FaUserPlus } from "react-icons/fa";
import { MdReportOff } from "react-icons/md";
import { dashboardProvider } from "../../Context/DashboardContext";

const Dashboard = () => {
  const { showFullMenu } = useContext(dashboardProvider);

  const commonClass = `text-xl font-medium bg-transparent hover:text-emerald-700 flex items-center ${
    showFullMenu ? "justify-center lg:justify-start" : "justify-center"
  } gap-3 whitespace-nowrap overflow-hidden`;

  return (
    <nav
      className={`flex flex-row md:flex-col justify-evenly gap-8 p-3 border-b md:border-b-0 md:py-5`}
    >
      <NavLink
        title="Checkout"
        className={`${commonClass}`}
        to="/dashboard"
        end
      >
        {({ isActive }) => (
          <div className={isActive && "text-emerald-700"}>
            <span className={`${commonClass}`}>
              <HiShoppingCart className="h-7"></HiShoppingCart>
              {showFullMenu && <p className="hidden lg:block">Checkout</p>}
            </span>
          </div>
        )}
      </NavLink>
      <>
        <NavLink title="Products" to="/dashboard/products">
          {({ isActive }) => (
            <div className={isActive && "text-emerald-700"}>
              <span className={`${commonClass}`}>
                <BsFillBoxFill className="h-7"></BsFillBoxFill>
                {showFullMenu && <p className="hidden lg:block">Products</p>}
              </span>
            </div>
          )}
        </NavLink>
        <NavLink title="Add Product" to="/dashboard/add-product">
          {({ isActive }) => (
            <div className={isActive && "text-emerald-700"}>
              <span className={`${commonClass}`}>
                <BsFillBagPlusFill className="h-7"></BsFillBagPlusFill>
                {showFullMenu && <p className="hidden lg:block">Add Product</p>}
              </span>
            </div>
          )}
        </NavLink>
      </>

      <>
        <NavLink title="Customers" to="/dashboard/customers">
          {({ isActive }) => (
            <div className={isActive && "text-emerald-700"}>
              <span className={`${commonClass}`}>
                <HiUsers className="h-7"></HiUsers>
                {showFullMenu && <p className="hidden lg:block">Customers</p>}
              </span>
            </div>
          )}
        </NavLink>
        <NavLink title="Add Customer" to="/dashboard/add-customer">
          {({ isActive }) => (
            <div className={isActive && "text-emerald-700"}>
              <span className={`${commonClass}`}>
                <FaUserPlus className="h-7"></FaUserPlus>

                {showFullMenu && (
                  <p className="hidden lg:block">Add Customer</p>
                )}
              </span>
            </div>
          )}
        </NavLink>

        <NavLink title="Orders" to="/dashboard/orders">
          {({ isActive }) => (
            <div className={isActive && "text-emerald-700"}>
              <span className={`${commonClass}`}>
                <BsFillCartCheckFill className="h-7"></BsFillCartCheckFill>
                {showFullMenu && <p className="hidden lg:block">Orders</p>}
              </span>
            </div>
          )}
        </NavLink>
        <NavLink title="All Admins" to="/dashboard/all-admins">
          {({ isActive }) => (
            <div className={isActive && "text-emerald-700"}>
              <span className={`${commonClass}`}>
                <RiAdminFill className="h-7"></RiAdminFill>
                {showFullMenu && <p className="hidden lg:block">All Admins</p>}
              </span>
            </div>
          )}
        </NavLink>
        <NavLink title="Reported Items" to="/dashboard/reported-items">
          {({ isActive }) => (
            <div className={isActive && "text-emerald-700"}>
              <span className={`${commonClass}`}>
                <MdReportOff className="h-7"></MdReportOff>
                {showFullMenu && (
                  <p className="hidden lg:block">Reported Items</p>
                )}
              </span>
            </div>
          )}
        </NavLink>
      </>
    </nav>
  );
};

export default Dashboard;
