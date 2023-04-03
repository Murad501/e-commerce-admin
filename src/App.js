import { Toaster } from "react-hot-toast";
import "./App.css";
import { FaRadiation } from "react-icons/fa";
import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router";
import { loadingProvider } from "./Context/LoadingContext";

function App() {
  const { isLoading } = useContext(loadingProvider);
  return (
    <div className={`bg-white text-gray-600 min-h-screen`}>
      <div className="container mx-auto">
        <RouterProvider router={router}></RouterProvider>
        <Toaster></Toaster>
      </div>
      {isLoading && (
        <div
          className={`h-full w-full flex fixed top-0 opacity-80 justify-center items-center z-20`}
        >
          <button
            type="button"
            className="bg-emerald-700 flex items-center justify-center mx-auto my-5 text-white px-4 py-2 rounded-sm cursor-wait"
            disabled
          >
            <FaRadiation className="animate-spin h-5 w-5 mr-3"></FaRadiation>
            Loading...
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
