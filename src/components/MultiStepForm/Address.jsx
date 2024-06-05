import * as React from "react";
import styles from "./Address.module.css";

import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { Input } from "../Input/Input";
import { BasicSelect } from "../Select/Select";
import { BasicButton } from "../BasicButton/BasicButton";

export const Address = ({ formData, setFormData, prevStep, nextStep }) => {
  const [logradouroSelect, setLogradouroSelect] = React.useState("");

  const logradouro = [
    { value: "R", label: "Rua" },
    { value: "AV", label: "Avenida" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.address}>
      <div className={styles.title}>
        <h1>ENDEREÇO</h1>
      </div>
      <div className={styles.inputs}>
        <div className={styles.leftInputs}>
          <Input
            type="number"
            id="cep"
            label="CEP"
            mask="99999-999"
            onChange={handleChange}
          />
          <Input type="text" id="city" label="Cidade" onChange={handleChange} />
          <Input
            type="text"
            id="neighborhood"
            label="Bairro"
            onChange={handleChange}
          />
          <BasicSelect
            label="Logradouro"
            options={logradouro}
            value={logradouroSelect}
            onChange={(e) => setLogradouroSelect(e.target.value)}
          />
        </div>
        <div className={styles.rightInputs}>
          <Input
            type="text"
            id="address"
            label="Endereço"
            onChange={handleChange}
          />
          <Input
            type="text"
            id="stateOfResidence"
            label="Estado de Residência"
            onChange={handleChange}
          />
          <Input
            type="text"
            id="residenceNumber"
            label="Número da Residência"
            onChange={handleChange}
          />
          <Input
            type="text"
            id="complement"
            label="Complemento"
            onChange={handleChange}
          />
        </div>
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
