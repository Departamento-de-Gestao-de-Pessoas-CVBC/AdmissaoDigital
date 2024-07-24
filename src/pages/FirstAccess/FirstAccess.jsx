import { useState } from "react";
import styles from "./FirstAccess.module.css";

import LogoCamara from "../../assets/CamaraSemFundoAzul.png";

import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { Input } from "../../components/Input/Input";
import { BasicButton } from "../../components/BasicButton/BasicButton";

import { API_DIRECTORY } from "../../../config.js";

export const FirstAccess = () => {
  const navigate = useNavigate();
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorMsg, setError] = useState("");
  const [aproveMsg, setMsg] = useState("");

  const handleInputChange = (e, type) => {
    if (type === "newPass") {
      setError("");
      setNewPass(e.target.value);
    } else if (type === "confirmPass") {
      setError("");
      setConfirmPass(e.target.value);
    }
  };

  const handleSave = () => {
    if (newPass !== "" && confirmPass !== "") {
      if (newPass === confirmPass) {
        const userId = localStorage.getItem("adminUserId");
        const url = `${API_DIRECTORY}updateAdmPass.php`;

        const headers = {
          Accept: "application/json",
          "Content-type": "application/json",
        };
        const Data = {
          userId: userId,
          newPass: newPass,
        };
        fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(Data),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.success) {
              setMsg(response.message);
              setTimeout(() => {
                navigate("/adminAccess");
              }, 5000);
            } else {
              setError(response.message);
            }
          })
          .catch((err) => {
            setError(err.toString());
            console.log(err);
          });
      } else {
        setError("As senhas não coincidem!");
      }
    } else {
      setError("Preencha todos os campos!");
    }
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
            value={newPass}
            onChange={(e) => handleInputChange(e, "newPass")}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="password"
            id="ConfirmPassword"
            label="Confirme Sua Senha"
            value={confirmPass}
            onChange={(e) => handleInputChange(e, "confirmPass")}
            onKeyDown={handleKeyDown}
          />
          <BasicButton
            title="Salvar"
            onClick={handleSave}
            startIcon={<SaveAltIcon />}
          />
        </div>
        {errorMsg && (
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
        )}
      </div>
    </div>
  );
};
