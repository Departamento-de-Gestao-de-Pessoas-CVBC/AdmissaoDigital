import styles from "./Login.module.css";
import LogoCamaraAzul from "../../assets/CamaraSemFundoAzul.png";

import { useNavigate } from "react-router-dom";

import { ImgLogin } from "../../components/ImgLogin/ImgLogin";
import { Input } from "../../components/Input/Input";
import { BasicButton } from "../../components/BasicButton/BasicButton";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.imgLogin}>
        <ImgLogin />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.logoEtitle}>
          <img src={LogoCamaraAzul} />
          <h1>Login</h1>
        </div>
        <div className={styles.login}>
          <Input type="number" id="login" label="Login (CPF)" />
          <Input type="password" id="password" label="Senha" />
          <BasicButton title="Teste" onClick={() => navigate("/teste")} />
        </div>
        <div className={styles.esqueceuSenha}>
          <p>
            <a href="#">Esqueci minha senha</a>
          </p>
        </div>
      </div>
    </div>
  );
};
