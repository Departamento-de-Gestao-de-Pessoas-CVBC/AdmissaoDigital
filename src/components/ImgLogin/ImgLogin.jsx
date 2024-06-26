import styles from "./ImgLogin.module.css";
import BackgroundImg from "../../assets/bgCamara.png";

export const ImgLogin = () => {
  return (
    <div className={styles.imgLogin}>
      <img src={BackgroundImg} alt="Logo da Câmara com Fundo Azul" />
    </div>
  );
};
