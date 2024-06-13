import styles from "./Register.module.css";
import {Routes, Route} from 'react-router-dom';

import React, { useState } from "react";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
import { PersonalData } from "../../components/MultiStepForm/PersonalData";
import { MultiStepForm } from "../../components/MultiStepForm/MultiStepForm";

export const Register = () => {
  return (
    <div className={styles.register}>
      <Header />
      <Routes>
        <Route path="/" element={<div className={styles.multiStepForm}><MultiStepForm /></div>} />
      </Routes>
    </div>
  );
};