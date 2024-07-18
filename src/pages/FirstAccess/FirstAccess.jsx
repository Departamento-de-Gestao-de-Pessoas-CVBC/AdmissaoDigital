import { useState, useEffect } from "react";
import styles from "./FirstAccess.module.css";

import LogoCamara from "../../assets/CamaraSemFundoAzul.png";

import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { Input } from "../../components/Input/Input";
import { BasicButton } from "../../components/BasicButton/BasicButton";

export const FirstAccess = () => {
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logoEtitle}>
          <a onClick={() => navigate("/")}>
            <img src={LogoCamara} />
          </a>
          <h1>Primeiro Acesso</h1>
        </div>
        <div className={styles.login}>
          <Input
            type="password"
            id="password"
            label="Senha"
            // value={user}
            // onChange={(e) => handleInputChange(e, "user")}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="password"
            id="ConfirmPassword"
            label="Confirme Sua Senha"
            // value={pass}
            // onChange={(e) => handleInputChange(e, "pass")}
            onKeyDown={handleKeyDown}
          />
          <BasicButton
            title="Salvar"
            // onClick={loginSubmit}
            startIcon={<SaveAltIcon />}
          />
        </div>
        {/* {errorMsg && (
          <div className={styles.errorMsg}>
            <MdError />
            {errorMsg}
          </div>
        )}
        {aproveMsg && (
          <div className={styles.approveMsg}>
            <FaCheckCircle />
            {aproveMsg}
          </div>
        )} */}
      </div>
    </div>
  );
};
