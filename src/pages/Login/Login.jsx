import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import LogoCamaraAzul from "../../assets/CamaraSemFundoAzul.png";

import LoginIcon from "@mui/icons-material/Login";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { ImgLogin } from "../../components/ImgLogin/ImgLogin";
import { Input } from "../../components/Input/Input";
import { BasicButton } from "../../components/BasicButton/BasicButton";
import { ReturnButton } from "../../components/ReturnButton/ReturnButton";

import { API_DIRECTORY } from "../../../config.js";

export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [errorMsg, setError] = useState("");
  const [aproveMsg, setMsg] = useState("");

  useEffect(() => {
    let login = localStorage.getItem("login");
    if (login) {
      navigate("teste");
    }
    let loginStatus = localStorage.getItem("loginStatus");
    if (login) {
      setError(loginStatus);
      setTimeout(function () {
        localStorage.clear();
        window.location.reload();
      }, 3000);
    }
    setTimeout(function () {
      setMsg("");
    }, 5000);
  }, [aproveMsg]);

  const handleInputChange = (e, type) => {
    switch (type) {
      case "user":
        setError("");
        setUser(e.target.value);
        if (e.target.value == "") {
          setError("O campo de login não pode estar vazio.");
        }
        break;
      case "pass":
        setError("");
        setPass(e.target.value);
        if (e.target.value == "") {
          setError("O campo de senha não pode estar vazio.");
        }
        break;
      default:
    }
  };

  function loginSubmit() {
    if (user !== "" && pass !== "") {
      var url = `${API_DIRECTORY}login.php`;

      var headers = {
        Accept: "application/json",
        "Content-type": "application/json",
      };
      var Data = {
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
            response.message === "CPF incorreto!" ||
            response.message === "Senha incorreta!"
          ) {
            setError(response.message);
          } else {
            setMsg(response.message);
            localStorage.setItem("userId", response.userId); // Salva o ID do usuário
            setTimeout(function () {
              localStorage.setItem("login", true);
              navigate("/Teste");
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
  }

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
      <div className={styles.returnButton} onClick={() => navigate("/")}>
        <ReturnButton />
      </div>
      <div className={styles.imgLogin}>
        <ImgLogin />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.logoEtitle}>
          <img src={LogoCamaraAzul} />
          <h1>Login</h1>
        </div>
        <div className={styles.login}>
          <Input
            type="number"
            id="login"
            label="Login (CPF)"
            mask="999.999.999-99"
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
        <div className={styles.esqueceuSenha}>
          <p>
            <a href="#">Esqueci minha senha</a>
          </p>
        </div>
      </div>
    </div>
  );
};
