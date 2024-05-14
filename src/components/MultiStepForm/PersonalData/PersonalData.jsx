import styles from "./PersonalData.module.css";

export const PersonalData = () => {
  return (
    <div className={styles.personalData}>
      <h1>DADOS PESSOAIS</h1>
      <div className={styles.form}>
        <input
            type="text"
            id="nome"
            placeholder="Nome completo"
        />
        <input
            type="text"
            id="nome"
            placeholder="Nome da mãe"
        />
        <input
            type="text"
            id="nome"
            placeholder="Nome do pai"
        />
        <input
            type="text"
            id="nome"
            placeholder="Nacionalidade"
        />
        <input
            type="text"
            id="nome"
            placeholder="Estado de nascimento"
        />
        <input
            type="text"
            id="nome"
            placeholder="Cidade de nascimento"
        />
      </div>
    </div>
  );
};
