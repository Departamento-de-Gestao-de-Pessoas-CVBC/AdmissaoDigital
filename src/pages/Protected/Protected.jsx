import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Protected = (props) =>{
    const navigate = useNavigate();
    const { Component } = props;
    useEffect(() =>{
        let login = localStorage.getItem("login");
        if(!login){
            localStorage.setItem("loginStatus", "Logue para ver o dashboard");
            navigate("/login", {replace: true});
        }
    }, []);

    return(
        <Component />
    );
}
