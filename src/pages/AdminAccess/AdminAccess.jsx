import styles from "./AdminAccess.module.css";
import LogoCamara from "../../assets/CamaraSemFundoAzul.png";

import { useNavigate } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { Input } from "../../components/Input/Input";
import { BasicButton } from "../../components/BasicButton/BasicButton";

export const AdminAccess = () => {
  const navigate = useNavigate();

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
            type="number"
            id="login"
            label="Login (CPF)"
            mask="999.999.999-99"
            onKeyDown={handleKeyDown}
          />
          <Input
            type="password"
            id="password"
            onKeyDown={handleKeyDown}
            label="Senha"
          />
          <div className={styles.buttons}>
            <BasicButton title="Entrar" startIcon={<LoginIcon />} />
            <BasicButton
              title="Sair"
              startIcon={<LogoutIcon />}
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
