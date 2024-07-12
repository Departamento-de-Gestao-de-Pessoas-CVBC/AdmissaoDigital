import { useState, useEffect } from "react";
import styles from "./AdminAccessLogin.module.css";
import LogoCamara from "../../assets/CamaraSemFundoAzul.png";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { Input } from "../../components/Input/Input";
import { BasicButton } from "../../components/BasicButton/BasicButton";

import { API_DIRECTORY } from "../../../config.js";

export const AdminAccessLogin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [errorMsg, setError] = useState("");
  const [aproveMsg, setMsg] = useState("");

  useEffect(() => {
    let login = localStorage.getItem("adminLogin");
    if (login) {
      navigate("/adminAccess");
    }
    let loginStatus = localStorage.getItem("loginStatus");
    if (loginStatus) {
      setError(loginStatus);
      setTimeout(() => {
        localStorage.clear();
        window.location.reload();
      }, 3000);
    }
    setTimeout(() => {
      setMsg("");
    }, 5000);
  }, [aproveMsg]);

  const handleInputChange = (e, type) => {
    switch (type) {
      case "user":
        setError("");
        setUser(e.target.value);
        if (e.target.value === "") {
          setError("O campo de login não pode estar vazio.");
        }
        break;
      case "pass":
        setError("");
        setPass(e.target.value);
        if (e.target.value === "") {
          setError("O campo de senha não pode estar vazio.");
        }
        break;
      default:
    }
  };

  const loginSubmit = () => {
    if (user !== "" && pass !== "") {
      const url = `${API_DIRECTORY}login_adm.php`;

      const headers = {
        Accept: "application/json",
        "Content-type": "application/json",
      };
      const Data = {
        user: user,
        pass: pass,
      };
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (
            response.message === "Usuário incorreto!" ||
            response.message === "Senha incorreta!"
          ) {
            setError(response.message);
          } else {
            setMsg(response.message);
            localStorage.setItem("adminUserId", response.userId);
            setTimeout(() => {
              localStorage.setItem("adminLogin", true);
              if (response.token === "0") {
                navigate("/firstLogin"); // página ainda não criada
              } else if (response.token === "1") {
                navigate("/adminAccess");
              }
            }, 5000);
          }
        })
        .catch((err) => {
          setError(err.toString());
          console.log(err);
        });
    } else {
      setError("Preencha todos os campos!");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logoEtitle}>
          <img src={LogoCamara} />
          <h1>Acesso Administrador</h1>
        </div>
        <div className={styles.login}>
          <Input
            type="text"
            id="login"
            label="Login"
            value={user}
            onChange={(e) => handleInputChange(e, "user")}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="password"
            id="password"
            value={pass}
            onChange={(e) => handleInputChange(e, "pass")}
            onKeyDown={handleKeyDown}
            label="Senha"
          />
          <BasicButton
            title="Entrar"
            onClick={loginSubmit}
            startIcon={<LoginIcon />}
          />
          <BasicButton
            title="Sair"
            startIcon={<LogoutIcon />}
            onClick={() => navigate("/")}
          />
        </div>
        {errorMsg && (
          <div className={styles.errorMsg}>
            <MdError />
            {errorMsg}
          </div>
        )}
        {aproveMsg && (
          <div className={styles.approveMsg}>
            <FaCheckCircle />
            {aproveMsg}
          </div>
        )}
      </div>
    </div>
  );
};
