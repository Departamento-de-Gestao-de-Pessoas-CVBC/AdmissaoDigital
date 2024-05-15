import styles from "./Access.module.css";
import LogoCamara from "../../assets/CamaraSemFundoAzul.png";

import { MdAppRegistration, MdLogin } from "react-icons/md";

import { Button } from "../../components/Button/Button";

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
          <Button title="Cadastrar" icone={<MdAppRegistration />} />
          <Button title="Login" icone={<MdLogin />} />
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
