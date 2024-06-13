import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
<<<<<<< HEAD
// import { BrowserRouter } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Access } from "./pages/Access/Access";
import { Register } from "./pages/Register/Register";
=======

import { Access } from "./pages/Access/Access";
// import { Register } from "./pages/Register/Register";
>>>>>>> parent of da475b1 (Get e Post php usando o user_adm)

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
<<<<<<< HEAD
    <RouterProvider router={router} />
=======
    <Access />
>>>>>>> parent of da475b1 (Get e Post php usando o user_adm)
  </React.StrictMode>
);
