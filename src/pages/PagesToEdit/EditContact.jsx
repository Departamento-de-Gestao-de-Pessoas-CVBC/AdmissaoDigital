import React, { useEffect, useState } from "react";
import styles from "./pagesToEdit.module.css";
import LogoCamara from "../../assets/CamaraSemFundoAzul.png";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Input } from "../../components/Input/Input";
import { BasicButton } from "../../components/BasicButton/BasicButton";
import { useNavigate } from "react-router-dom";
import { API_DIRECTORY } from "../../../config.js";

export const EditContact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber1: "",
    phoneNumber2: "",
    email1: "",
    email2: ""
  });
  const [initialFormData, setInitialFormData] = useState({}); // Guarda os dados iniciais
  const [locked, setLocked] = useState(true);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchContactData(userId);
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchContactData = (userId) => {
    fetch(`${API_DIRECTORY}getContactData.php?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching contact data:", data.error);
          setLoading(false);
        } else {
          setFormData({
            phoneNumber1: data.phoneNumber1 || "",
            phoneNumber2: data.phoneNumber2 || "",
            email1: data.email1 || "",
            email2: data.email2 || ""
          });
          setInitialFormData({
            phoneNumber1: data.phoneNumber1 || "",
            phoneNumber2: data.phoneNumber2 || "",
            email1: data.email1 || "",
            email2: data.email2 || ""
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
        setLoading(false);
      });
  };

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
    const password = prompt("Por favor, insira sua senha para confirmar:");
    if (password) {
      // Verifica se os dados foram modificados
      if (formData.phoneNumber1 !== initialFormData.phoneNumber1 ||
          formData.phoneNumber2 !== initialFormData.phoneNumber2 ||
          formData.email1 !== initialFormData.email1 ||
          formData.email2 !== initialFormData.email2) {
        // Prepara o objeto de dados para enviar ao backend
        const dataToSend = {
          userId: userId,
          password: password,
          formData: formData
        };

        // Envia os dados para o backend
        fetch(`${API_DIRECTORY}updateContact.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataToSend)
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              console.error("Erro ao atualizar dados:", data.error);
              alert("Erro ao atualizar dados. Verifique sua conexão e tente novamente.");
            } else {
              alert("Dados atualizados com sucesso!");
              navigate("/userInformation"); // Redireciona para a página de informações do usuário
            }
          })
          .catch((error) => {
            console.error("Erro ao enviar requisição:", error);
            alert("Senha Incorreta.");
          });
      } else {
        alert("Nenhuma alteração detectada.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoTitle}>
        <img
          src={LogoCamara}
          alt="Logo da Câmara"
          onClick={() => navigate("/userInformation")}
        />
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
            value={formData.phoneNumber1}
            mask="(99) 9 9999-9999"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            id="phoneNumber2"
            name="phoneNumber2"
            label="Celular 2"
            value={formData.phoneNumber2}
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
            value={formData.email1}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="email"
            id="email2"
            name="email2"
            label="Email 2"
            value={formData.email2}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className={styles.button}>
        <BasicButton
          title="Salvar Alterações"
          startIcon={<SaveAltIcon />}
          onClick={handleSave}
        />
      </div>
    </div>
  );
};
