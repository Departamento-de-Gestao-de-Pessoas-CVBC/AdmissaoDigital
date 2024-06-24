import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Access } from "./pages/Access/Access";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import { UserInformation } from "./pages/UserInformation/UserInformation";
import { Protected } from "./pages/Protected/Protected";
import { AdminAccess } from "./pages/AdminAccess/AdminAccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Access />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "teste",
    element: <Protected Component={UserInformation} />,
  },
  {
    path: "adminAccess",
    element: <AdminAccess />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
