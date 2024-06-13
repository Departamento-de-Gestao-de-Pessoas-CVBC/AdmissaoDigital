import React from "react";
import styles from "./Register.module.css";

import { Header } from "../../components/Header/Header";
import { MultiStepForm } from "../../components/MultiStepForm/MultiStepForm";

export const Register = () => {
  return (
    <div className={styles.register}>
      <Header />
      <div className={styles.multiStepForm}>
        <MultiStepForm />
      </div>
    </div>
  );
};
