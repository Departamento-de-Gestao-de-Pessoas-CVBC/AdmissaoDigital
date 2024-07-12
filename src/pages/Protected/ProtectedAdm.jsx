import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedAdm = (props) => {
  const navigate = useNavigate();
  const { Component } = props;

  useEffect(() => {
    let adminLogin = localStorage.getItem("adminLogin");
    if (!adminLogin) {
      localStorage.setItem("loginStatus", "Logue para ver o painel administrativo");
      navigate("/adminLogin", { replace: true });
    }
  }, [navigate]);

  return <Component />;
};
