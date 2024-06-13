import React from "react";
import styles from "./Register.module.css";
<<<<<<< HEAD
=======

import React, { useState } from "react";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
>>>>>>> parent of da475b1 (Get e Post php usando o user_adm)

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
