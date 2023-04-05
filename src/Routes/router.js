import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Page404 from "../Components/Page404";
import Home from "../Pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import Orders from "../Pages/Dashboard/Orders/Orders";
import Products from "../Pages/Dashboard/Products/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Page404></Page404>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home></Home>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: '/dashboard/orders',
        element: <Orders></Orders>
      },
      {
        path: '/dashboard/products',
        element: <Products></Products>
      }
    ]
  }
]);
