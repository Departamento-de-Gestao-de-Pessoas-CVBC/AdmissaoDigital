import styles from "./AccessPassword.module.css";

import DoneIcon from "@mui/icons-material/Done";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { BasicButton } from "../BasicButton/BasicButton";
import { Input } from "../Input/Input";

export const AccessPassword = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.accessPassword}>
      <div className={styles.title}>
        <h1>SENHA DE ACESSO</h1>
      </div>
      <div className={styles.inputs}>
        <Input
          type="password"
          id="password"
          name="password"
          label="Crie uma Senha"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          label="Confirme Senha"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className={styles.buttons}>
        <BasicButton
          title="Voltar"
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={prevStep}
        />
        <BasicButton
          title="Finalizar"
          startIcon={<DoneIcon />}
          onClick={nextStep}
        />
      </div>
    </div>
  );
};
