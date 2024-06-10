import styles from "./Access.module.css";
import LogoCamara from "../../assets/CamaraSemFundoAzul.png";

import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import { BasicButton } from "../../components/BasicButton/BasicButton";

export const Access = () => {
  return (
    <div className={styles.access}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <img
            src={LogoCamara}
            alt="Logo Câmara de Vereadores de Balneário Camboriú"
          />
          <h1>Admissão Digital</h1>
        </div>
        <div className={styles.login}>
          <BasicButton title="Cadastrar" startIcon={<AppRegistrationIcon />} />
          <BasicButton title="Login" startIcon={<LoginIcon />} />
        </div>
      </div>
      <div className={styles.adm}>
        <p>
          <a href="#">Acesso Administrador</a>
        </p>
      </div>
    </div>
  );
};
