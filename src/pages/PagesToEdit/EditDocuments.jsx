import React, { useEffect, useState } from "react";
import styles from "./pagesToEdit.module.css";
import LogoCamara from "../../assets/CamaraSemFundoAzul.png";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Input } from "../../components/Input/Input";
import { BasicSelect } from "../../components/Select/Select";
import { BasicButton } from "../../components/BasicButton/BasicButton";
import { useNavigate } from "react-router-dom";
import { API_DIRECTORY } from "../../../config.js";

export const EditDocuments = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cpf: "",
    pis: "",
    rg: "",
    expRg: "",
    dateExpRg: "",
    ufRg: "",
    reservist: "",
    voterRegistration: "",
    electoralZone: "",
    pollingStation: ""
  });
  const UFRG = [
    { value: "acre", label: "AC" },
    { value: "alagoas", label: "AL" },
    { value: "amapa", label: "AP" },
    { value: "amazonas", label: "AM" },
    { value: "bahia", label: "BA" },
    { value: "ceara", label: "CE" },
    { value: "distritoFederal", label: "DF" },
    { value: "espiritoSanto", label: "ES" },
    { value: "goias", label: "GO" },
    { value: "maranhao", label: "MA" },
    { value: "matoGrosso", label: "MT" },
    { value: "matoGrossoDoSul", label: "MS" },
    { value: "minasGerais", label: "MG" },
    { value: "para", label: "PA" },
    { value: "paraiba", label: "PB" },
    { value: "parana", label: "PR" },
    { value: "pernambuco", label: "PE" },
    { value: "piaui", label: "PI" },
    { value: "rioDeJaneiro", label: "RJ" },
    { value: "rioGrandeDoNorte", label: "RN" },
    { value: "rioGrandeDoSul", label: "RS" },
    { value: "rondonia", label: "RO" },
    { value: "roraima", label: "RR" },
    { value: "santaCatarina", label: "SC" },
    { value: "saoPaulo", label: "SP" },
    { value: "sergipe", label: "SE" },
    { value: "tocantins", label: "TO" },
  ];
  const [initialFormData, setInitialFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchDocumentsData(userId);
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchDocumentsData = (userId) => {
    fetch(`${API_DIRECTORY}getDocuments.php?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching documents data:", data.error);
          setLoading(false);
        } else {
          setFormData({
            cpf: data.cpf || "",
            pis: data.pis || "",
            rg: data.rg || "",
            expRg: data.expRg || "",
            dateExpRg: data.dateExpRg || "",
            ufRg: data.ufRg || "",
            reservist: data.reservist || "",
            voterRegistration: data.voterRegistration || "",
            electoralZone: data.electoralZone || "",
            pollingStation: data.pollingStation || ""
          });
          setInitialFormData({
            cpf: data.cpf || "",
            pis: data.pis || "",
            rg: data.rg || "",
            expRg: data.expRg || "",
            dateExpRg: data.dateExpRg || "",
            ufRg: data.ufRg || "",
            reservist: data.reservist || "",
            voterRegistration: data.voterRegistration || "",
            electoralZone: data.electoralZone || "",
            pollingStation: data.pollingStation || ""
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching documents data:", error);
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
      if (JSON.stringify(formData) !== JSON.stringify(initialFormData)) {
        // Prepara o objeto de dados para enviar ao backend
        const dataToSend = {
          userId: userId,
          password: password,
          formData: formData
        };

        // Envia os dados para o backend
        fetch(`${API_DIRECTORY}updateDocuments.php`, {
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
            alert("Erro ao enviar requisição. Verifique sua conexão e tente novamente.");
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
        <img src={LogoCamara} onClick={() => navigate("/userInformation")} />
        <h1>Editar Documentos</h1>
      </div>
      <div className={styles.informativeText}>
        <p>Utilize os campos abaixo para atualizar suas informações.</p>
      </div>
      <div className={styles.inputs}>
        <div className={styles.leftInputs}>
          <Input
            type="number"
            name="cpf"
            label="CPF"
            mask="999.999.999-99"
            value={formData.cpf}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="number"
            name="pis"
            label="PIS"
            mask="999.99999.99.9"
            value={formData.pis}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="number"
            name="rg"
            label="RG"
            value={formData.rg}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            name="expRg"
            label="Expedidor do RG"
            value={formData.expRg}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            name="dateExpRg"
            label="Data de Expedição do RG"
            mask="99/99/9999"
            value={formData.dateExpRg}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.rightInputs}>
          <BasicSelect
            label="UF RG"
            name="ufRg"
            options={UFRG}
            value={formData.ufRg}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="number"
            name="reservist"
            label="Nº Reservista"
            mask="999999999999"
            value={formData.reservist}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="number"
            name="voterRegistration"
            label="Título de Eleitor"
            mask="999999999999"
            value={formData.voterRegistration}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="number"
            name="electoralZone"
            label="Zona Eleitoral"
            mask="999"
            value={formData.electoralZone}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="number"
            name="pollingStation"
            label="Seção Eleitoral"
            mask="9999"
            value={formData.pollingStation}
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
