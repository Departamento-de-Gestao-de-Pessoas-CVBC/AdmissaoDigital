import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Access } from "./pages/Access/Access";
import { Register } from "./pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Access />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
