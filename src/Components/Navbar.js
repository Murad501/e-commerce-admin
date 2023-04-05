import React, { useContext, useRef, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import { userProvider } from "../Context/UserContext";
import { loadingProvider } from "../Context/LoadingContext";
import { HiShoppingCart } from "react-icons/hi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { logOut, user } = useContext(userProvider);
  const { setIsLoading } = useContext(loadingProvider);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("token");
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const ref = useRef();
  useOnClickOutside(ref, () => setOpen(false));
  useOnClickOutside();

  const handleClick = () => {
    setOpen(!open);
  };

  const menus = (
    <>
      <li>
        <Link
          className={`font-semibold bg-transparent px-3 py-2 hover:text-emerald-700`}
          to="/"
        >
          Home
        </Link>
      </li>

      {user && (
        <>
          <li>
            <Link
              className={`font-semibold bg-transparent px-3 py-2 hover:text-emerald-700 flex items-center`}
              to="/dashboard"
            >
              Cart
              <HiShoppingCart />
            </Link>
          </li>
          <li>
            <Link
              className={`font-semibold bg-transparent px-3 py-2 hover:text-emerald-700`}
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>
        </>
      )}

      <button
        onClick={handleLogOut}
        className={`border font-semibold text-white px-3 py-2 hover:text-emerald-700 bg-emerald-700 hover:border-emerald-700 hover:bg-white transition-all duration-700`}
      >
        Sign Out
      </button>
    </>
  );
  return (
    <>
      {user ? (
        <div className={`navbar px-0 relative md:border-b py-5`}>
          <div className="flex-1">
            <Link to="/" className="font-semibold text-2xl text-emerald-700">
              E-Commerce
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 hidden md:flex items-center gap-4">
              {menus}
            </ul>

            <div
              ref={ref}
              onClick={() => handleClick()}
              className="dropdown dropdown-end"
            >
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar md:hidden"
              >
                {user ? (
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL} alt="" />
                  </div>
                ) : (
                  <span className="text-xl">
                    <FaAlignJustify></FaAlignJustify>
                  </span>
                )}
              </label>
              {open && (
                <ul
                  tabIndex={0}
                  className={`absolute top-16 right-0 menu menu-compact border  dropdown-content   w-52 flex-col justify-center gap-2 px-2 py-3 md:hidden z-50 bg-white`}
                >
                  {menus}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
