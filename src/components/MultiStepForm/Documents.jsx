import React from "react";
import styles from "./Documents.module.css";

import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { Input } from "../Input/Input";
import { BasicSelect } from "../Select/Select";
import { BasicButton } from "../BasicButton/BasicButton";

export const Documents = ({ formData, setFormData, prevStep, nextStep }) => {
  const [UFRGSelect, setUFRGSelect] = React.useState("");
  const [expRg, setExpRg] = React.useState("");

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

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    if (name === "expRg") {
      setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className={styles.documents}>
      <div className={styles.title}>
        <h1>DOCUMENTOS</h1>
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
          />
          <Input
            type="number"
            name="pis"
            label="PIS"
            mask="999.99999.99.9"
            value={formData.pis}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="rg"
            label="RG"
            value={formData.rg}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="expRg"
            label="Expedidor do RG"
            value={formData.expRg}
            onChange={handleChange}
          />
        </div>
        <div className={styles.rightInputs}>
          <BasicSelect
            label="UF RG"
            name="ufRg"
            options={UFRG}
            value={formData.ufRg}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="reservist"
            label="Nº Reservista"
            mask="999999999999"
            value={formData.reservist}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="voterRegistration"
            label="Título de Eleitor"
            mask="999999999999"
            value={formData.voterRegistration}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="electoralZone"
            label="Zona Eleitoral"
            value={formData.electoralZone}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.alone}>
        <Input
          type="number"
          name="pollingStation"
          label="Seção Eleitoral"
          value={formData.pollingStation}
          onChange={handleChange}
        />
      </div>
      <div className={styles.buttons}>
        <BasicButton
          title="Voltar"
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={prevStep}
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
