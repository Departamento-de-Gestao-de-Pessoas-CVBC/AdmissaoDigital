import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import LogoCamaraAzul from "../../assets/CamaraSemFundoAzul.png";

import LoginIcon from "@mui/icons-material/Login";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";

import { ImgLogin } from "../../components/ImgLogin/ImgLogin";
import { Input } from "../../components/Input/Input";
import { BasicButton } from "../../components/BasicButton/BasicButton";

export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

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
  }, [msg]);

  const handleInputChange = (e, type) => {
    switch (type) {
      case "user":
        setError("");
        setUser(e.target.value);
        if (e.target.value == "") {
          setError("Usuario não pode ser em branco");
        }
        break;
      case "pass":
        setError("");
        setPass(e.target.value);
        if (e.target.value == "") {
          setError("Senha não pode ser em branco");
        }
        break;
      default:
    }
  };

  function loginSubmit() {
    if (user !== "" && pass !== "") {
      var url = "http://localhost/teste/ADMISSAODIGITAL/api/login.php"; //gustavo
      var headers = {
        Accept: "application/json",
        "Content-type": "aplication/json",
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
            response[0].result === "Cpf incorreto!" ||
            response[0].result === "Senha incorreta!"
          ) {
            setError(response[0].result);
          } else {
            setMsg(response[0].result);
            setTimeout(function () {
              localStorage.setItem("login", true);
              navigate("/Teste");
            }, 5000);
          }
        })
        .catch((err) => {
          setError(err);
          console.log(err);
        });
    } else {
      setError("Preencha todos os campos!");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.returnButton}>
        <BasicButton
          title="Voltar"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
        />
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
          />
          <Input
            type="password"
            id="password"
            value={pass}
            onChange={(e) => handleInputChange(e, "pass")}
            label="Senha"
          />
          <BasicButton title="Teste" onClick={loginSubmit} />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        {msg && <div className={styles.msg}>{msg}</div>}
        <div className={styles.esqueceuSenha}>
          <p>
            <a href="#">Esqueci minha senha</a>
          </p>
        </div>
      </div>
    </div>
  );
};
