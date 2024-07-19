import React, { useEffect, useState } from "react";
import styles from "./pagesToEdit.module.css";
import citiesData from "../../../Cidades.json";

import LogoCamara from "../../assets/CamaraSemFundoAzul.png";

import SaveAltIcon from "@mui/icons-material/SaveAlt";

import { Input } from "../../components/Input/Input";
import { BasicSelect } from "../../components/Select/Select";
import { BasicButton } from "../../components/BasicButton/BasicButton";
import { useNavigate } from "react-router-dom";

export const EditAddress = () => {
  const navigate = useNavigate();
  const [filteredCities, setFilteredCities] = useState([]);
  const [citySelectDisabled, setCitySelectDisabled] = useState(true);

  const [formData, setFormData] = useState({
    cep: "",
    stateOfResidence: "",
    city: "",
    neighborhood: "",
    logradouroSelect: "",
    address: "",
    residenceNumber: "",
    complement: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stateOfResidenceOptions = [
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

  const logradouro = [
    { value: "R", label: "Rua" },
    { value: "AV", label: "Avenida" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.logoTitle}>
        <img src={LogoCamara} onClick={() => navigate("/userInformation")} />
        <h1>Editar Endereço</h1>
      </div>
      <div className={styles.informativeText}>
        <p>Utilize os campos abaixo para atualizar suas informações.</p>
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
            options={stateOfResidenceOptions}
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
            label="Endereço"
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
      <div className={styles.button}>
        <BasicButton title="Salvar Alterações" startIcon={<SaveAltIcon />} />
      </div>
    </div>
  );
};
