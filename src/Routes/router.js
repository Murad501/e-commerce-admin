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
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import Customers from "../Pages/Dashboard/Customers/Customers";
import AddCustomer from "../Pages/Dashboard/AddCustomer/AddCustomer";
import Shop from "../Pages/Shop/Shop";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Cart from "../Pages/Cart/Cart";
import PaymentDetails from "../Pages/PaymentDetails/PaymentDetails";
import Checkout from "../Pages/Checkout/Checkout";
import AdminRoute from "./AdminRoute";

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
      {
        path: "/shop",
        element: (
          <PrivateRoute>
            <Shop></Shop>
          </PrivateRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
      },
      {
        path: "/products/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <PaymentDetails></PaymentDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout></Checkout>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout></DashboardLayout>
      </AdminRoute>
    ),
    children: [
      {
        path: "/dashboard/orders",
        element: <Orders></Orders>,
      },
      {
        path: "/dashboard/products",
        element: <Products></Products>,
      },
      {
        path: "/dashboard/add-product",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/customers",
        element: <Customers></Customers>,
      },
      {
        path: "/dashboard/add-customer",
        element: <AddCustomer></AddCustomer>,
      },
    ],
  },
]);
