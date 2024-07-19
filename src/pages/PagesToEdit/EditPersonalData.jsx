import React, { useEffect, useState } from "react";
import styles from "./pagesToEdit.module.css";
import citiesData from "../../../Cidades.json";

import LogoCamara from "../../assets/CamaraSemFundoAzul.png";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Input } from "../../components/Input/Input";
import { BasicSelect } from "../../components/Select/Select";
import { BasicButton } from "../../components/BasicButton/BasicButton";
import { useNavigate } from "react-router-dom";
import { API_DIRECTORY } from "../../../config.js";

export const EditPersonalData = () => {
  const navigate = useNavigate();
  const [filteredCities, setFilteredCities] = useState([]);
  const [citySelectDisabled, setCitySelectDisabled] = useState(true);
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
  const [initialFormData, setInitialFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchPersonalData(userId);
    } else {
      setLoading(false);
    }
  }, [userId]);

  const stateOfBirthOptions = [
    { value: "AC", label: "AC" },
    { value: "AL", label: "AL" },
    { value: "AP", label: "AP" },
    { value: "AM", label: "AM" },
    { value: "BA", label: "BA" },
    { value: "CE", label: "CE" },
    { value: "DF", label: "DF" },
    { value: "ES", label: "ES" },
    { value: "GO", label: "GO" },
    { value: "MA", label: "MA" },
    { value: "MT", label: "MT" },
    { value: "MS", label: "MS" },
    { value: "MG", label: "MG" },
    { value: "PA", label: "PA" },
    { value: "PB", label: "PB" },
    { value: "PR", label: "PR" },
    { value: "PE", label: "PE" },
    { value: "PI", label: "PI" },
    { value: "RJ", label: "RJ" },
    { value: "RN", label: "RN" },
    { value: "RS", label: "RS" },
    { value: "RO", label: "RO" },
    { value: "RR", label: "RR" },
    { value: "SC", label: "SC" },
    { value: "SP", label: "SP" },
    { value: "SE", label: "SE" },
    { value: "TO", label: "TO" },
  ];

  useEffect(() => {
    setCitySelectDisabled(!formData.stateOfBirth);
    if (formData.stateOfBirth) {
      const filtered = citiesData.filter(
        (city) => city.Estado === formData.stateOfBirth
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [formData.stateOfBirth]);

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
          setInitialFormData({
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
    const password = prompt("Por favor, insira sua senha para confirmar:");
    if (password) {
      // Verifica se os dados foram modificados
      if (
        formData.name !== initialFormData.name ||
        formData.mothersName !== initialFormData.mothersName ||
        formData.fathersName !== initialFormData.fathersName ||
        formData.nationality !== initialFormData.nationality ||
        formData.gender !== initialFormData.gender ||
        formData.maritalStatus !== initialFormData.maritalStatus ||
        formData.dateOfBirth !== initialFormData.dateOfBirth ||
        formData.cityOfBirth !== initialFormData.cityOfBirth ||
        formData.stateOfBirth !== initialFormData.stateOfBirth ||
        formData.levelOfEducation !== initialFormData.levelOfEducation ||
        formData.breed !== initialFormData.breed
      ) {
        // Prepara o objeto de dados para enviar ao backend
        const dataToSend = {
          userId: userId,
          password: password,
          formData: formData,
        };

        // Envia os dados para o backend
        fetch(`${API_DIRECTORY}updatePersonalData.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              console.error("Erro ao atualizar dados:", data.error);
              alert(
                "Senha Incorreta."
              );
            } else {
              alert("Dados atualizados com sucesso!");
              navigate("/userInformation"); // Redireciona para a página de informações do usuário
            }
          })
          .catch((error) => {
            console.error("Erro ao enviar requisição:", error);
            alert(
              "Erro ao enviar requisição. Verifique sua conexão e tente novamente."
            );
          });
      } else {
        alert("Nenhuma alteração detectada.");
      }
    }
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
          <BasicSelect
            label="Estado de Nascimento"
            name="stateOfBirth"
            options={stateOfBirthOptions}
            value={formData.stateOfBirth}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <BasicSelect
            label="Cidade de Nascimento"
            name="cityOfBirth"
            options={filteredCities.map((city) => ({
              value: city.Cidade,
              label: city.Nome,
            }))}
            value={formData.cityOfBirth}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={citySelectDisabled}
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
