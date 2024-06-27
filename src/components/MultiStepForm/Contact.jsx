import styles from "./Contact.module.css";
import * as React from "react";

import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { Input } from "../Input/Input";
import { BasicButton } from "../BasicButton/BasicButton";

export const Contact = ({ formData, setFormData, prevStep, nextStep }) => {
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

  return (
    <div className={styles.contact}>
      <div className={styles.title}>
        <h1>CONTATO</h1>
      </div>
      <div className={styles.inputs}>
        <div className={styles.leftInputs}>
          <Input
            type="text"
            id="phoneNumber1"
            name="phoneNumber1"
            label="Celular 1"
            value={formData.phoneNumber1}
            mask="(99) 9 9999-9999"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            id="phoneNumber2"
            name="phoneNumber2"
            label="Celular 2"
            value={formData.phoneNumber2}
            mask="(99) 9 9999-9999"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.rightInputs}>
          <Input
            type="email"
            id="email1"
            name="email1"
            label="Email 1"
            value={formData.email1}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="email"
            id="email2"
            name="email2"
            label="Email 2"
            value={formData.email2}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
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
