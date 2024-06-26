import styles from "./Header.module.css";
import LogoCamara from "../../assets/CamaraSemFundoBranco.png";

import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <img
        src={LogoCamara}
        alt="Logo Câmara de Vereadores de Balneário Camboriú"
        onClick={() => navigate("/")}
      />
      <h1>Admissão Digital</h1>
    </div>
  );
};
