import * as React from "react";
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
    if (id === "expRg") {
      setExpRg(value.toUpperCase());
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
            id="cpf"
            label="CPF"
            mask="999.999.999-99"
            onChange={handleChange}
          />
          <Input
            type="number"
            id="pis"
            label="PIS"
            mask="999.99999.99.9"
            onChange={handleChange}
          />
          <Input type="number" id="rg" label="RG" onChange={handleChange} />
          <Input
            type="text"
            id="expRg"
            label="Expedidor do RG"
            value={expRg}
            onChange={handleChange}
          />
        </div>
        <div className={styles.rightInputs}>
          <BasicSelect
            label="UF RG"
            options={UFRG}
            value={UFRGSelect}
            onChange={(e) => setUFRGSelect(e.target.value)}
          />
          <Input
            type="number"
            id="reservist"
            label="Nº Reservista"
            mask="999999999999"
            onChange={handleChange}
          />
          <Input
            type="number"
            id="voterRegistration"
            label="Título de Eleitor"
            mask="999999999999"
            onChange={handleChange}
          />
          <Input
            type="text"
            id="electoralZone"
            label="Zona Eleitoral"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.alone}>
        <Input
          type="text"
          id="pollingStation"
          label="Seção Eleitoral"
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
