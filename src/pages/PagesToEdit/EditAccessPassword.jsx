import styles from "./pagesToEdit.module.css";

import LogoCamara from "../../assets/CamaraSemFundoAzul.png";

import SaveAltIcon from "@mui/icons-material/SaveAlt";

import { Input } from "../../components/Input/Input";
import { BasicButton } from "../../components/BasicButton/BasicButton";
import { useNavigate } from "react-router-dom";

export const EditAccessPassword = () => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        <img src={LogoCamara} onClick={() => navigate("/userInformation")} />
        <h1>Editar Senha de Acesso</h1>
      </div>
      <div className={styles.informativeText}>
        <p>Utilize os campos abaixo para atualizar suas informações.</p>
      </div>
      <div className={styles.inputsEditAccessPassword}>
        <Input
          type="password"
          id="oldPassword"
          name="oldPassword"
          label="Senha Atual"
          //   value={formData.password}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="password"
          id="password"
          name="password"
          label="Crie uma Senha"
          //   value={formData.password}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          label="Confirme Senha"
          //   value={formData.confirmPassword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.button}>
        <BasicButton title="Salvar Alterações" startIcon={<SaveAltIcon />} />
      </div>
    </div>
  );
};
