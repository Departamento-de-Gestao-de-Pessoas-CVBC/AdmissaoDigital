import styles from "./Register.module.css";

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
        <Button 
          // icone={}
          title="Voltar"
        />
        <Button 
          // icone={}
          title="Avançar"
        />
      </div>
    </div>
  );
};
