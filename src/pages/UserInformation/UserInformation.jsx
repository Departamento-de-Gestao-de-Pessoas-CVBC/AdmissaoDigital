import styles from "./UserInformation.module.css";

import { useNavigate } from "react-router-dom";

import { BasicButton } from "../../components/BasicButton/BasicButton";
// import { Header } from "../../components/Header/Header";

export const UserInformation = () => {
  const navigate = useNavigate();
  function logoutSubmit() {
    localStorage.setItem("login", "");
    localStorage.setItem("loginStatus", "Logado com sucesso!");
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.userSummary}>
        <div className={styles.summaryTitle}>
          <p>Informações do Usuário</p>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryInfos}></div>
          <div className={styles.summaryExtraInfos}></div>
        </div>
      </div>
      <div className={styles.basicInfo}></div>
      <BasicButton title="Logout" onClick={logoutSubmit} />
    </div>
  );
};
