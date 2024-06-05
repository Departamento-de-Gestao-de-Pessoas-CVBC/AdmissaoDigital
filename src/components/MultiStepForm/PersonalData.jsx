import * as React from "react";
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.personalData}>
      <div className={styles.title}>
        <h1>DADOS PESSOAIS</h1>
      </div>
      <div className={styles.inputs}>
        <div className={styles.leftInputs}>
          <Input
            type="text"
            id="name"
            label="Nome Completo"
            onChange={handleChange}
          />
          <Input
            type="text"
            id="mothersName"
            label="Nome da Completo da Mãe"
            onChange={handleChange}
          />
          <Input
            type="text"
            id="fathersName"
            label="Nome Completo do Pai"
            onChange={handleChange}
          />
          <BasicSelect
            label="Nacionalidade"
            options={nationality}
            value={nationalitySelect}
            onChange={(e) => setNationalitySelect(e.target.value)}
          />
          <BasicSelect
            label="Gênero"
            options={gender}
            value={genderSelect}
            onChange={(e) => setGenderSelect(e.target.value)}
          />
        </div>
        <div className={styles.rightInputs}>
          <BasicSelect
            label="Estado Civil"
            options={maritalStatus}
            value={maritalStatusSelect}
            onChange={(e) => setMaritalStatusSelect(e.target.value)}
          />
          <Input
            type="text"
            id="dateOfBirth"
            label="Data de Nascimento"
            mask="99/99/9999"
            onChange={handleChange}
          />
          <Input
            type="text"
            id="cityOfBirth"
            label="Cidade de Nascimento"
            onChange={handleChange}
          />
          <Input
            type="text"
            id="stateOfBirth"
            label="Estado de Nascimento"
            disabled
            onChange={handleChange}
          />
          <BasicSelect
            label="Grau de Instrução"
            options={levelOfEducation}
            value={levelOfEducationSelect}
            onChange={(e) => setLevelOfEducationSelect(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.alone}>
        <BasicSelect
          label="Raça/Cor"
          options={breed}
          value={breedSelect}
          onChange={(e) => setBreedSelect(e.target.value)}
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
  );
};
