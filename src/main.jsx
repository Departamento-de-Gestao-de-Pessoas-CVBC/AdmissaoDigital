import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";

// import { Access } from "./pages/Access/Access";
import { Register } from "./pages/Register/Register";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Register />
  </React.StrictMode>
);
