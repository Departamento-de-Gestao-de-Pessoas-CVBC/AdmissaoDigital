import React, { useState } from "react";
import styles from "./AdminAccess.module.css";
import { useNavigate } from "react-router-dom";
import LogoCamara from "../../assets/CamaraSemFundoBranco.png";
import { Input } from "../../components/Input/Input";
import { StickyHeadTable } from "../../components/StickyHeadTable/StickyHeadTable";
import { RxExit } from "react-icons/rx";
import { FaRegFileAlt } from "react-icons/fa";

export const AdminAccess = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={LogoCamara} />
        <a onClick={() => navigate("/")}>
          <button className={styles.exitButton}>
            <RxExit />
            Sair
          </button>
        </a>
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
          />
        </div>
        <StickyHeadTable searchTerm={searchTerm} />
        {/* <button className={styles.reportButton}>
          <FaRegFileAlt />
          Relatório
        </button> */}
      </div>
    </div>
  );
};
