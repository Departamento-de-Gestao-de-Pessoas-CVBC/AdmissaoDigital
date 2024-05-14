import styles from "./Header.module.css";
import LogoCamara from "../../assets/CamaraSemFundoBranco.png";

export const Header = () => {
  return (
    <div className={styles.header}>
      <img
        src={LogoCamara}
        alt="Logo Câmara de Vereadores de Balneário Camboriú"
      />
      <h1>Admissão Digital</h1>
    </div>
  );
};
