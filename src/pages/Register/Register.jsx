import styles from "./Register.module.css";

import { GoArrowRight, GoArrowLeft } from "react-icons/go";

import React, { useState } from "react";
import { PersonalData } from "../../components/MultiStepForm/PersonalData/PersonalData";
import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";

export const Register = () => {
  return (
    <div className={styles.register}>
      <Header />
      <PersonalData />
      <div className={styles.buttons}>
        <Button icone={<GoArrowLeft />} title="Voltar" />
        <Button icone={<GoArrowRight />} title="Avançar" />
      </div>
    </div>
  );
};
