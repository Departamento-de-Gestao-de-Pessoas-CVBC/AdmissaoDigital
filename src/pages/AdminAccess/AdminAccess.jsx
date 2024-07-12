import React, { useState, useEffect } from "react";
import styles from "./AdminAccess.module.css";
import { useNavigate } from "react-router-dom";
import LogoCamara from "../../assets/CamaraSemFundoBranco.png";
import { Input } from "../../components/Input/Input";
import { StickyHeadTable } from "../../components/StickyHeadTable/StickyHeadTable";
import { RxExit } from "react-icons/rx";
import { FaRegFileAlt } from "react-icons/fa";

import { API_DIRECTORY } from "../../../config.js";

export const AdminAccess = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [adminData, setAdminData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    let login = localStorage.getItem("adminLogin");
    if (!login) {
      navigate("/");
    } else {
      fetchAdminData();
    }
  }, []);

  const fetchAdminData = () => {
    fetch(`${API_DIRECTORY}getADM.php`)
      .then((response) => response.json())
      .then((data) => setAdminData(data))
      .catch((error) => console.error("Erro ao buscar dados de admin:", error));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
    }
  };

  const handleLogout = () => {
    localStorage.setItem("adminLogin", "");
    localStorage.setItem("loginStatus", "Deslogado com sucesso!");
    navigate("/");
  };

  const handleGenerateReport = () => {
    const reportStartId = prompt("Informe o ID inicial para o relatório:");
    if (reportStartId) {
      window.open(`${API_DIRECTORY}generateReport.php?startId=${reportStartId}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={LogoCamara} alt="Logo" />
        <button className={styles.exitButton} onClick={handleLogout}>
          <RxExit />
          Sair
        </button>
      </div>
      <div className={styles.main}>
        <div className={styles.title}>
          <h1>Consulta de Cadastros</h1>
        </div>
        <div className={styles.search}>
          <Input
            type="text"
            label="Pesquisar"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button className={styles.reportButton} onClick={handleGenerateReport}>
          <FaRegFileAlt />
          Relatório
        </button>
        <StickyHeadTable
          searchTerm={searchTerm}
          data={adminData}
          setSelectedId={setSelectedId}
        />
      </div>
    </div>
  );
};
