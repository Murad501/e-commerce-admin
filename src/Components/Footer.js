import React, { useContext } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { userProvider } from "../Context/UserContext";

const Footer = () => {
  const { user } = useContext(userProvider)
  console.log(user)
  return (
    <>
      {user ? (
        <footer className="footer items-center p-4 border-t">
          <div className="items-center grid-flow-col">
            <p>Copyright © 2023 - All right reserved</p>
          </div>
          <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <span className="w-10 h-10 border p-2 rounded-full">
              <FaFacebookF className="w-full h-full"></FaFacebookF>
            </span>
            <span className="w-10 h-10 border p-2 rounded-full">
              <FaLinkedinIn className="w-full h-full"></FaLinkedinIn>
            </span>
          </div>
        </footer>
      ) : (
        ""
      )}
    </>
  );
};

export default Footer;
