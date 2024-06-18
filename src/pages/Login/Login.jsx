import styles from "./Login.module.css";
import LogoCamaraAzul from "../../assets/CamaraSemFundoAzul.png";

import { useNavigate } from "react-router-dom";

import { ImgLogin } from "../../components/ImgLogin/ImgLogin";
import { Input } from "../../components/Input/Input";
import { BasicButton } from "../../components/BasicButton/BasicButton";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.login}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <img src={LogoCamaraAzul} alt="Logo Câmara Azul" />
          <h1>LOGIN</h1>
        </div>
      </div>
      <div className={styles.info}>
        <Input type="text" id="login" label="Login (CPF)" />
        <Input type="password" id="password" label="Senha" />
      </div>
      <BasicButton 
        title="Teste"
        onClick={() => navigate("/teste")}
      />
    </div>
  );
};
