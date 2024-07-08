import React, { useEffect, useState } from "react";
import styles from "./pagesToEdit.module.css";
import LogoCamara from "../../assets/CamaraSemFundoAzul.png";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Input } from "../../components/Input/Input";
import { BasicSelect } from "../../components/Select/Select";
import { BasicButton } from "../../components/BasicButton/BasicButton";
import { useNavigate } from "react-router-dom";
import { API_DIRECTORY } from "../../../config.js";

export const EditPersonalData = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mothersName: "",
    fathersName: "",
    nationality: "",
    gender: "",
    maritalStatus: "",
    dateOfBirth: "",
    cityOfBirth: "",
    stateOfBirth: "",
    levelOfEducation: "",
    breed: "",
  });
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchPersonalData(userId);
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchPersonalData = (userId) => {
    fetch(`${API_DIRECTORY}getPersonalData.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching personal data:", data.error);
          setLoading(false);
        } else {
          setFormData({
            name: data.name || "",
            mothersName: data.mothersName || "",
            fathersName: data.fathersName || "",
            nationality: data.nationality || "",
            gender: data.gender || "",
            maritalStatus: data.maritalStatus || "",
            dateOfBirth: data.dateOfBirth || "",
            cityOfBirth: data.cityOfBirth || "",
            stateOfBirth: data.stateOfBirth || "",
            levelOfEducation: data.levelOfEducation || "",
            breed: data.breed || "",
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching personal data:", error);
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
    // Implement your save logic here
    alert("Implementar lógica de salvar aqui.");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const nationalityOptions = [
    { value: "10", label: "Brasileiro" },
    { value: "20", label: "Brasileiro Naturalizado" },
    { value: "50", label: "Outros" },
  ];

  const genderOptions = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Feminino" },
  ];

  const maritalStatusOptions = [
    { value: "1", label: "Solteiro(a)" },
    { value: "2", label: "Casado(a)" },
    { value: "6", label: "Separado(a)" },
    { value: "3", label: "Divorciado(a)" },
    { value: "4", label: "Viúvo(a)" },
    { value: "7", label: "União Estável" },
    { value: "5", label: "Concubinato" },
    { value: "9", label: "Outros" },
  ];

  const levelOfEducationOptions = [
    { value: "01", label: "Analfabeto(a)" },
    { value: "02", label: "4ª Série Incompleto" },
    { value: "03", label: "4ª Série Completa" },
    { value: "04", label: "5ª a 8ª Série Completa" },
    { value: "05", label: "1º Grau Incompleto" },
    { value: "06", label: "1º Grau Completo" },
    { value: "07", label: "2º Grau Incompleto" },
    { value: "08", label: "2º Grau Completo" },
    { value: "09", label: "Superior Incompleto" },
    { value: "10", label: "Superior Completo" },
    { value: "11", label: "Pós-graduação" },
  ];

  const breedOptions = [
    { value: "1", label: "Branca" },
    { value: "2", label: "Preta" },
    { value: "3", label: "Amarela" },
    { value: "4", label: "Parda" },
    { value: "5", label: "Indígena" },
    { value: "6", label: "Mameluco" },
    { value: "7", label: "Mulato" },
    { value: "8", label: "Cafuzo" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.logoTitle}>
        <img
          src={LogoCamara}
          alt="Logo da Câmara"
          onClick={() => navigate("/userInformation")}
        />
        <h1>Editar Dados Pessoais</h1>
      </div>
      <div className={styles.informativeText}>
        <p>Utilize os campos abaixo para atualizar suas informações.</p>
      </div>
      <div className={styles.inputs}>
        <div className={styles.leftInputs}>
          <Input
            type="text"
            name="name"
            label="Nome Completo"
            value={formData.name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            name="mothersName"
            label="Nome Completo da Mãe"
            value={formData.mothersName}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            name="fathersName"
            label="Nome Completo do Pai"
            value={formData.fathersName}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <BasicSelect
            label="Nacionalidade"
            name="nationality"
            options={nationalityOptions}
            value={formData.nationality}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <BasicSelect
            label="Gênero"
            name="gender"
            options={genderOptions}
            value={formData.gender}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.rightInputs}>
          <BasicSelect
            label="Estado Civil"
            name="maritalStatus"
            options={maritalStatusOptions}
            value={formData.maritalStatus}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            name="dateOfBirth"
            label="Data de Nascimento"
            mask="99/99/9999"
            value={formData.dateOfBirth}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            name="cityOfBirth"
            label="Cidade de Nascimento"
            value={formData.cityOfBirth}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            name="stateOfBirth"
            label="Estado de Nascimento"
            value={formData.stateOfBirth}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled
          />
          <BasicSelect
            label="Grau de Instrução"
            name="levelOfEducation"
            options={levelOfEducationOptions}
            value={formData.levelOfEducation}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className={styles.alone}>
        <BasicSelect
          label="Raça/Cor"
          name="breed"
          options={breedOptions}
          value={formData.breed}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.saveButton}>
        <BasicButton
          title="Salvar Alterações"
          startIcon={<SaveAltIcon />}
          onClick={handleSave}
        />
      </div>
    </div>
  );
};
