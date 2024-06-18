import styles from "./AccessPassword.module.css";

import DoneIcon from "@mui/icons-material/Done";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { BasicButton } from "../BasicButton/BasicButton";
import { Input } from "../Input/Input";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AccessPassword = ({ formData, setFormData, prevStep }) => {
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValue = { usuario: formData.name, senha: formData.password };

    try {
      const res = await axios.post(
        "http://localhost/ADMISSAODIGITAL/API/user.php", // LUIZ PATH
        formValue
      );

      if (res.data.success) {
        navigate("/");
      } else {
        setMessage("Falha ao criar usuário. Tente novamente.");
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      setMessage("Erro ao enviar o formulário. Tente novamente.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
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
            onClick={handleSubmit}
          />
        </div>
      </div>
    </form>
  );
};
