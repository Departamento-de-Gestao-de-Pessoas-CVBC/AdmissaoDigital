import styles from "./PersonalData.module.css";

import { GoArrowRight, GoArrowLeft } from "react-icons/go";

import { Button } from "../Button/Button";

import { BasicTextFields } from "../Input/Input";

export const PersonalData = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.personalData}>
      <div className={styles.title}>
        <h1>DADOS PESSOAIS</h1>
      </div>
      <div className={styles.inputs}>
        <BasicTextFields type="text" id="name" label="Nome Completo" />
        <BasicTextFields type="text" id="name" label="Nome da mãe" />
        <BasicTextFields type="text" id="name" label="Nome do pai" />
        <BasicTextFields
          type="number"
          id="cpf"
          label="CPF"
          mask="999.999.999-99"
        />
      </div>
      <div className={styles.buttons}>
        <Button icone={<GoArrowLeft />} title="Voltar" />
        <Button icone={<GoArrowRight />} title="Avançar" />
      </div>
    </div>
  );
};
