import styles from "./pagesToEdit.module.css";

import LogoCamara from "../../assets/CamaraSemFundoAzul.png";

import SaveAltIcon from "@mui/icons-material/SaveAlt";

import { Input } from "../../components/Input/Input";
import { BasicSelect } from "../../components/Select/Select";
import { BasicButton } from "../../components/BasicButton/BasicButton";
import { useNavigate } from "react-router-dom";

export const EditContact = () => {
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
        <h1>Editar Contato</h1>
      </div>
      <div className={styles.informativeText}>
        <p>Utilize os campos abaixo para atualizar suas informações.</p>
      </div>
      <div className={styles.inputs}>
        <div className={styles.leftInputs}>
          <Input
            type="text"
            id="phoneNumber1"
            name="phoneNumber1"
            label="Celular 1"
            // value={formData.phoneNumber1}
            mask="(99) 9 9999-9999"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            id="phoneNumber2"
            name="phoneNumber2"
            label="Celular 2"
            // value={formData.phoneNumber2}
            mask="(99) 9 9999-9999"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.rightInputs}>
          <Input
            type="email"
            id="email1"
            name="email1"
            label="Email 1"
            // value={formData.email1}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="email"
            id="email2"
            name="email2"
            label="Email 2"
            // value={formData.email2}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className={styles.button}>
        <BasicButton title="Salvar" startIcon={<SaveAltIcon />} />
      </div>
    </div>
  );
};
