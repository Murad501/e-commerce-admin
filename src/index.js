import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserContext from "./Context/UserContext";
import LoadingContext from "./Context/LoadingContext";
import DashboardContext from "./Context/DashboardContext";

import { QueryClient, QueryClientProvider } from "react-query";
import ProductContext from "./Context/ProductContext";
import CartContext from "./Context/CartContext";
import PaymentDetailsContext from "./Context/PaymentDetailsContext";
import DetailsCartContext from "./Context/DetailsCartContext";

// Create a client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContext>
        <LoadingContext>
          <DashboardContext>
            <ProductContext>
              <CartContext>
                <DetailsCartContext>
                  <PaymentDetailsContext>
                    <App />
                  </PaymentDetailsContext>
                </DetailsCartContext>
              </CartContext>
            </ProductContext>
          </DashboardContext>
        </LoadingContext>
      </UserContext>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
