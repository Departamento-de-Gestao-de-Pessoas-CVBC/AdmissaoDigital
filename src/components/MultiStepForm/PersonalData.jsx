import React from "react";
import styles from "./PersonalData.module.css";
import citiesData from "../../../Cidades.json";

import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { Input } from "../Input/Input";
import { BasicSelect } from "../Select/Select";
import { BasicButton } from "../BasicButton/BasicButton";
import Autosuggest from "react-autosuggest";

export const PersonalData = ({ formData, setFormData, nextStep, prevStep }) => {
  const nationality = [
    { value: 10, label: "Brasileiro" },
    { value: 20, label: "Brasileiro Naturalizado" },
    { value: 50, label: "Outros" },
  ];

  const gender = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Feminino" },
  ];

  const maritalStatus = [
    { value: "1", label: "Solteiro(a)" },
    { value: "2", label: "Casado(a)" },
    { value: "6", label: "Separado(a)" },
    { value: "3", label: "Divorciado(a)" },
    { value: "4", label: "Viúvo(a)" },
    { value: "7", label: "União Estável" },
    { value: "5", label: "Concubinato" },
    { value: "9", label: "Outros" },
  ];

  const levelOfEducation = [
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

  const breed = [
    { value: "01", label: "Branca" },
    { value: "02", label: "Preta" },
    { value: "03", label: "Amarela" },
    { value: "04", label: "Parda" },
    { value: "05", label: "Indígena" },
    { value: "06", label: "Mameluco" },
    { value: "07", label: "Mulato" },
    { value: "08", label: "Cafuzo" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.personalData}>
        <div className={styles.title}>
          <h1>DADOS PESSOAIS</h1>
        </div>
        <div className={styles.inputs}>
          <div className={styles.leftInputs}>
            <Input
              type="text"
              name="name"
              label="Nome Completo"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="mothersName"
              label="Nome Completo da Mãe"
              value={formData.mothersName}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="fathersName"
              label="Nome Completo do Pai"
              value={formData.fathersName}
              onChange={handleChange}
            />
            <BasicSelect
              label="Nacionalidade"
              name="nationality"
              options={nationality}
              value={formData.nationality}
              onChange={handleChange}
            />
            <BasicSelect
              label="Gênero"
              name="gender"
              options={gender}
              value={formData.gender}
              onChange={handleChange}
            />
          </div>
          <div className={styles.rightInputs}>
            <BasicSelect
              label="Estado Civil"
              name="maritalStatus"
              options={maritalStatus}
              value={formData.maritalStatus}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="dateOfBirth"
              label="Data de Nascimento"
              mask="99/99/9999"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="cityOfBirth"
              label="Cidade de Nascimento"
              value={formData.cityOfBirth}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="stateOfBirth"
              label="Estado de Nascimento"
              value={formData.stateOfBirth}
              onChange={handleChange}
              disabled
            />
            <BasicSelect
              label="Grau de Instrução"
              name="levelOfEducation"
              options={levelOfEducation}
              value={formData.levelOfEducation}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.alone}>
          <BasicSelect
            label="Raça/Cor"
            name="breed"
            options={breed}
            value={formData.breed}
            onChange={handleChange}
          />
        </div>
        <div className={styles.buttons}>
          <BasicButton
            title="Voltar"
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={prevStep}
            disabled
          />
          <BasicButton
            title="Avançar"
            startIcon={<ArrowForwardOutlinedIcon />}
            onClick={nextStep}
          />
        </div>
      </div>
    </form>
  );
};
