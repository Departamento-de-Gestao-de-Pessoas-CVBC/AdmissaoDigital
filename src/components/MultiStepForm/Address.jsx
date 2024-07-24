import React, { useEffect, useState } from "react";
import styles from "./Address.module.css";
import citiesData from "../../../Cidades.json";

import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { Input } from "../Input/Input";
import { BasicSelect } from "../Select/Select";
import { BasicButton } from "../BasicButton/BasicButton";

export const Address = ({ formData, setFormData, prevStep, nextStep }) => {
  const [filteredCities, setFilteredCities] = useState([]);
  const [citySelectDisabled, setCitySelectDisabled] = useState(true);
  const [logradouroSelect, setLogradouroSelect] = React.useState("");

  const logradouro = [
    { value: "R", label: "Rua" },
    { value: "AV", label: "Avenida" },
  ];

  const stateOfResidence = [
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
    setCitySelectDisabled(!formData.stateOfResidence);
    if (formData.stateOfResidence) {
      const filtered = citiesData.filter(
        (city) => city.Estado === formData.stateOfResidence
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [formData.stateOfResidence]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
    }
  };

  const handlePrevStep = () => {
    prevStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextStep = () => {
    nextStep();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  return (
    <div className={styles.address}>
      <div className={styles.title}>
        <h1>ENDEREÇO</h1>
      </div>
      <div className={styles.inputs}>
        <div className={styles.leftInputs}>
          <Input
            mask="99999-999"
            value={formData.cep}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            id="cep"
            label="CEP"
            name="cep"
          />
          <BasicSelect
            label="Estado de Residência"
            name="stateOfResidence"
            options={stateOfResidence}
            value={formData.stateOfResidence}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <BasicSelect
            label="Cidade de Residência"
            name="city"
            options={filteredCities.map((city) => ({
              value: city.Cidade,
              label: city.Nome,
            }))}
            value={formData.city}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={citySelectDisabled}
          />
          <Input
            type="text"
            id="neighborhood"
            label="Bairro"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.rightInputs}>
          <BasicSelect
            label="Logradouro"
            options={logradouro}
            value={formData.logradouroSelect}
            name="logradouroSelect"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            id="address"
            label="Nome da Rua ou Avenida"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="number"
            id="residenceNumber"
            label="Número da Residência"
            name="residenceNumber"
            value={formData.residenceNumber}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            id="complement"
            label="Complemento"
            name="complement"
            value={formData.complement}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <BasicButton
          title="Voltar"
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={handlePrevStep}
        />
        <BasicButton
          title="Avançar"
          startIcon={<ArrowForwardOutlinedIcon />}
          onClick={handleNextStep}
        />
      </div>
    </div>
  );
};
