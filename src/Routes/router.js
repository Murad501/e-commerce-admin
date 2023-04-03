import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Page404 from "../Components/Page404";
import Home from "../Pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import Login from "../Pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Page404></Page404>,
    children: [
      {
        path: "/",
        element: <PrivateRoute><Home></Home></PrivateRoute>,
      },
      {
        path: '/login',
        element: <Login></Login>
      }

    ],
  },
]);
