import React, { useState } from "react";
import styles from "./pagesToEdit.module.css";
import LogoCamara from "../../assets/CamaraSemFundoAzul.png";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Input } from "../../components/Input/Input";
import { BasicButton } from "../../components/BasicButton/BasicButton";
import { useNavigate } from "react-router-dom";
import { API_DIRECTORY } from "../../../config.js";

export const EditAccessPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
    }
  };

  const handleSave = () => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("As novas senhas não coincidem!");
      return;
    }

    const password = prompt("Por favor, insira sua senha atual para confirmar:");
    if (password) {
      const dataToSend = {
        userId: localStorage.getItem("userId"),
        oldPassword: password, // Senha atual para verificar
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmNewPassword,
      };

      fetch(`${API_DIRECTORY}updatePassword.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Senha atualizada com sucesso!");
            navigate("/userInformation");
          } else {
            alert(data.error);
          }
        })
        .catch((error) => {
          console.error("Erro ao enviar requisição:", error);
          alert("Erro ao enviar requisição. Verifique sua conexão e tente novamente.");
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSave();
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
      <form className={styles.inputsEditAccessPassword} onSubmit={handleSubmit}>
        <Input
          type="password"
          id="newPassword"
          name="newPassword"
          label="Nova Senha"
          value={formData.newPassword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          label="Confirme a Nova Senha"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <div className={styles.button}>
          <BasicButton
            title="Salvar Alterações"
            startIcon={<SaveAltIcon />}
            onClick={handleSave}
          />
        </div>
      </form>
    </div>
  );
};
