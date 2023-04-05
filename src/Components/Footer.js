import React, { useContext } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { userProvider } from "../Context/UserContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { user } = useContext(userProvider)
  return (
    <>
      {user ? (
        <footer className="footer sm:flex justify-between items-center p-4 border-t">
          <div className="items-center grid-flow-col">
            <p>Copyright © 2023 - All right reserved</p>
          </div>
          <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <Link to='#' className="w-10 h-10 border p-2 rounded-full hover:border-emerald-700 hover:text-emerald-700 transition-all duration-700">
              <FaFacebookF className="w-full h-full"></FaFacebookF>
            </Link>
            <Link to='#' className="w-10 h-10 border p-2 rounded-full hover:border-emerald-700 hover:text-emerald-700 transition-all duration-700">
              <FaLinkedinIn className="w-full h-full"></FaLinkedinIn>
            </Link>
          </div>
        </footer>
      ) : (
        ""
      )}
    </>
  );
};

export default Footer;
