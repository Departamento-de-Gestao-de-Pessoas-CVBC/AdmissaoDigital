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
import { EditPersonalData } from "./pages/PagesToEdit/EditPersonalData";
import { EditDocuments } from "./pages/PagesToEdit/EditDocuments";
import { EditAddress } from "./pages/PagesToEdit/EditAddress";
import { EditJobInformation } from "./pages/PagesToEdit/EditJobInformation";
import { EditContact } from "./pages/PagesToEdit/EditContact";
import { EditAccessPassword } from "./pages/PagesToEdit/EditAccessPassword";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";

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
  {
    path: "editPersonalData",
    element: <EditPersonalData />,
  },
  {
    path: "editDocuments",
    element: <EditDocuments />,
  },
  {
    path: "editAddress",
    element: <EditAddress />,
  },
  {
    path: "editJobInformation",
    element: <EditJobInformation />,
  },
  {
    path: "editContact",
    element: <EditContact />,
  },
  {
    path: "editAccessPassword",
    element: <EditAccessPassword />,
  },
  {
    path: "forgotPassword",
    element: <ForgotPassword />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
