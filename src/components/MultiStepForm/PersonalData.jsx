import React from "react";
import styles from "./PersonalData.module.css";

import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { Input } from "../Input/Input";
import { BasicSelect } from "../Select/Select";
import { BasicButton } from "../BasicButton/BasicButton";

export const PersonalData = ({ formData, setFormData, nextStep, prevStep }) => {
  const [nationalitySelect, setNationalitySelect] = React.useState("");
  const [genderSelect, setGenderSelect] = React.useState("");
  const [maritalStatusSelect, setMaritalStatusSelect] = React.useState("");
  const [levelOfEducationSelect, setLevelOfEducationSelect] =
    React.useState("");
  const [breedSelect, setBreedSelect] = React.useState("");

  const nationality = [
    { value: 10, label: "Brasileiro" },
    { value: "paraguaio", label: "Paraguaio" },
  ];

  const gender = [
    { value: "masculino", label: "Masculino" },
    { value: "feminino", label: "Feminino" },
  ];

  const maritalStatus = [
    { value: "solteiro", label: "Solteiro(a)" },
    { value: "casado", label: "Casado(a)" },
    { value: "separado", label: "Separado(a)" },
    { value: "divorciado", label: "Divorciado(a)" },
    { value: "viuvo", label: "Viúvo(a)" },
    { value: "uniaoEstavel", label: "União Estável" },
  ];

  const levelOfEducation = [
    { value: "analfabeto", label: "Analfabeto(a)" },
    { value: "incompleto1", label: "1º Grau Incompleto" },
    { value: "completo1", label: "1º Grau Completo" },
    { value: "incompleto2", label: "2º Grau Incompleto" },
    { value: "completo2", label: "2º Grau Completo" },
    { value: "supIncompleto", label: "Superior Incompleto" },
    { value: "supCompleto", label: "Superior Completo" },
    { value: "posGraduacao", label: "Pós-graduação" },
  ];

  const breed = [
    { value: "branca", label: "Branca" },
    { value: "preta", label: "Preta" },
    { value: "amarela", label: "Amarela" },
    { value: "parda", label: "Parda" },
    { value: "indigena", label: "Indígena" },
    { value: "mameluco", label: "Mameluco" },
    { value: "mulato", label: "Mulato" },
    { value: "cafuzo", label: "Cafuzo" },
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
