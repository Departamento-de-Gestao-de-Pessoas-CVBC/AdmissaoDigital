import styles from "./ForgotPassword.module.css";
import LogoCamara from "../../assets/CamaraSemFundoAzul.png";
import { useNavigate } from "react-router-dom";

import SendIcon from "@mui/icons-material/Send";

import { Input } from "../../components/Input/Input";
import { BasicButton } from "../../components/BasicButton/BasicButton";

export const ForgotPassword = () => {
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
      <div className={styles.logoTitle}>
        <img src={LogoCamara} onClick={() => navigate("/")} />
        <h1>Esqueci Minha Senha</h1>
      </div>
      <div className={styles.card}>
        <p>
          Por favor, insira seu endereço de e-mail cadastrado no campo abaixo.
          Enviaremos um link para que você possa criar uma nova senha.
        </p>
        <Input
          type="email"
          label="E-mail"
          id="recoveryEmail"
          onKeyDown={handleKeyDown}
        />
      </div>
      <BasicButton title="Enviar" startIcon={<SendIcon />} />
      <div className={styles.resendMessage}>
        <p>
          Se você não recebeu o e-mail, <a href="#">clique aqui</a> e será
          reenviado.
        </p>
      </div>
    </div>
  );
};
