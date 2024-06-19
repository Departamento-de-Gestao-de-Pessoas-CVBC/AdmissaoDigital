import React, { useState } from "react";
import { PersonalData } from "./PersonalData";
import { Documents } from "./Documents";
import { Address } from "./Address";
import { JobInformation } from "./JobInformation";
import { Contact } from "./Contact";
import { AccessPassword } from "./AccessPassword";

export const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    mothersName: "",
    fathersName: "",
    nationality: "",
    gender: "",
    maritalStatus: "",
    dateOfBirth: "",
    cityOfBirth: "",
    stateOfBirth: "",
    levelOfEducation: "",
    breed: "",

    cpf: "",
    pis: "",
    rg: "",
    expRg: "",
    dateExpRg: "",
    ufRg: "",
    reservist: "",
    voterRegistration: "",
    electoralZone: "",
    pollingStation: "",

    cep: "",
    city: "",
    neighborhood: "",
    logradouro: "",
    address: "",
    stateOfResidence: "",
    residenceNumber: "",
    complement: "",

    responsibility: "",
    dependents: [],

    phoneNumber1: "",
    phoneNumber2: "",
    email1: "",
    email2: "",

    password: "",
    confirmPassword: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  switch (step) {
    case 1:
      return (
        <PersonalData
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      );
    case 2:
      return (
        <Documents
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      );
    case 3:
      return (
        <Address
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      );
    case 4:
      return (
        <JobInformation
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      );
    case 5:
      return (
        <Contact
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      );
    case 6:
      return (
        <AccessPassword
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
        />
      );
    default:
      return <div>Erro no formulário</div>;
  }
};
