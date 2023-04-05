import React from "react";
import { FaRadiation } from "react-icons/fa";

const LoadingButton = ({btnStyle}) => {
  return (
    <button
      type="button"
      className={`bg-emerald-700 flex items-center justify-center text-white px-4 py-2 rounded-sm cursor-wait font-semibold ${btnStyle}`}
      disabled
    >
      <FaRadiation className="animate-spin h-5 w-5 mr-3 "></FaRadiation>
      Loading...
    </button>
  );
};

export default LoadingButton;
