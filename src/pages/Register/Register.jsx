import styles from "./Register.module.css";

import React, { useState } from "react";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
import { PersonalData } from "../../components/MultiStepForm/PersonalData";


export const Register = () => {
  return (
    <div className={styles.register}>
      <Header />
      <div className={styles.multiStepForm}>
        <PersonalData/>
      </div>
      {/* <div className={styles.buttons}>
        <Button icone={<GoArrowLeft />} title="Voltar" />
        <Button icone={<GoArrowRight />} title="Avançar" />
      </div> */}
    </div>
  );
};
