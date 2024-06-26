import styles from "./AdminAccess.module.css";
import LogoCamara from "../../assets/CamaraSemFundoAzul.png";

import { useNavigate } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { Input } from "../../components/Input/Input";
import { BasicButton } from "../../components/BasicButton/BasicButton";

export const AdminAccess = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.imgTitle}>
          <img
            src={LogoCamara}
            alt="Logo Câmara de Vereadores de Balneário Camboriú"
          />
          <h1>Acesso Administrador</h1>
        </div>
        <div className={styles.inputs}>
          <Input
            type="number"
            id="login"
            label="Login (CPF)"
            mask="999.999.999-99"
          />
          <Input type="password" id="password" label="Senha" />
          <BasicButton title="Entrar" startIcon={<LoginIcon />} />
          <BasicButton
            title="Sair"
            startIcon={<LogoutIcon />}
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
};
