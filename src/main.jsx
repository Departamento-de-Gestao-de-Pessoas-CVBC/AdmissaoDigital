import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Access } from "./pages/Access/Access";
import { AdminAccess } from "./pages/AdminAccess/AdminAccess";
import { AdminAccessLogin } from "./pages/AdminAccessLogin/AdminAccessLogin";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { Login } from "./pages/Login/Login";
import { EditAccessPassword } from "./pages/PagesToEdit/EditAccessPassword";
import { EditAddress } from "./pages/PagesToEdit/EditAddress";
import { EditContact } from "./pages/PagesToEdit/EditContact";
import { EditDocuments } from "./pages/PagesToEdit/EditDocuments";
import { EditJobInformation } from "./pages/PagesToEdit/EditJobInformation";
import { EditPersonalData } from "./pages/PagesToEdit/EditPersonalData";
import { Protected } from "./pages/Protected/Protected";
import { Register } from "./pages/Register/Register";
import { UserInformation } from "./pages/UserInformation/UserInformation";
import { FirstAccess } from "./pages/FirstAccess/FirstAccess";

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
    path: "userInformation",
    element: <Protected Component={UserInformation} />,
  },
  {
    path: "adminAccessLogin",
    element: <AdminAccessLogin />,
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
  {
    path: "adminAccess",
    element: <AdminAccess />,
  },
  {
    path: "firstAccess",
    element: <FirstAccess />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
