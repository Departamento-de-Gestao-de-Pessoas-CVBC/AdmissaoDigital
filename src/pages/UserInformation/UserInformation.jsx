import React, { useEffect, useState } from "react";
import styles from "./UserInformation.module.css";

import { useNavigate } from "react-router-dom";
import { BasicButton } from "../../components/BasicButton/BasicButton";

import { IoPrintOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { FaFile, FaHouse, FaSuitcase, FaPhoneFlip } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { API_DIRECTORY } from "../../../config.js";

export const UserInformation = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchUserData = (userId) => {
    fetch(`${API_DIRECTORY}getUserData.php?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching user data:", data.error);
          setLoading(false);
          // Handle error appropriately, e.g., redirect to an error page or show a message
        } else {
          setUserData(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  };

  function logoutSubmit() {
    localStorage.setItem("login", "");
    localStorage.setItem("loginStatus", "Logado com sucesso!");
    navigate("/");
  }

  const fetchAndPrintDocument = (endpoint) => {
    fetch(`${API_DIRECTORY}${endpoint}?id=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Retorna o JSON da resposta
      })
      .then((data) => {
        // Verifica se há um erro na resposta
        if (data.error) {
          throw new Error(data.error);
        }
        // Abre uma nova janela para imprimir o HTML retornado
        const newWindow = window.open("", "_blank");
        newWindow.document.open();
        newWindow.document.write(data.html); // Escreve o HTML na nova janela
        newWindow.document.close();
        newWindow.print();
      })
      .catch((error) => {
        console.error("Error fetching or printing document:", error);
        // Handle error as needed
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error loading user data.</div>;
  }

  const openPDF = (pdfUrl) => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className={styles.container}>
      <div className={styles.userSummary}>
        <div className={styles.summaryTitle}>
          <p>Informações do Usuário</p>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryInfos}>
            <p className={styles.fullName}>
              <strong>{userData.fullName}</strong>
            </p>
            <p>
              <strong>Data de Nasc.</strong>: {userData.birthDate}
            </p>
            <p>
              <strong>CPF</strong>: {userData.cpf}
            </p>
            <p>
              <strong>PIS</strong>: {userData.pis}
            </p>
            <p>
              <strong>Cargo</strong>: {userData.position}
            </p>
            <p>
              <strong>Celular</strong>: {userData.phone}
            </p>
            <p>
              <strong>E-mail</strong>: {userData.email}
            </p>
          </div>
          <div className={styles.summaryExtraInfos}></div>
        </div>
      </div>
      <div className={styles.documents}>
        <div className={styles.documentsTitle}>
          <p>Documentação</p>
        </div>
        <div className={styles.documentsCard}>
          <div className={styles.documentsWarning}>
            <p>Faça o download e imprima sua documentação por aqui!</p>
          </div>
          <div className={styles.forms}>
            <button
              className={styles.option}
              onClick={() => fetchAndPrintDocument("FichaCadastral.php")}
            >
              <IoPrintOutline />
              Ficha de Cadastro de Colaborador
            </button>
            <button
              className={styles.option}
              onClick={() => fetchAndPrintDocument("DeclaracaoDeBens.php")}
            >
              <IoPrintOutline />
              Declaração de Bens e Renda
            </button>
            <button
              className={styles.option}
              onClick={() => fetchAndPrintDocument("aptidao_legal.php")}
            >
              <IoPrintOutline />
              Declaração de Aptidão Legal
            </button>
            <button
              className={styles.option}
              onClick={() => fetchAndPrintDocument("inexistencia.php")}
            >
              <IoPrintOutline />
              Inexistência de Parentesco
            </button>
            <button
              className={styles.option}
              onClick={() => fetchAndPrintDocument("Lom.php")}
            >
              <IoPrintOutline />
              Declaração LOM (Apenas vereadores)
            </button>
            <button
              className={styles.option}
              onClick={() =>
                openPDF("/src/PDFs/Lista Documentação Comissionados.pdf")
              }
            >
              <IoPrintOutline />
              Lista de Documentação (Comissionados)
            </button>
            <button
              className={styles.option}
              onClick={() =>
                openPDF("/src/PDFs/Lista Documentação Estagiários.pdf")
              }
            >
              <IoPrintOutline />
              Lista de Documentação (Estagiários)
            </button>
            <button
              className={styles.option}
              onClick={() =>
                openPDF("/src/PDFs/Lista Documentação Vereadores.pdf")
              }
            >
              <IoPrintOutline />
              Lista de Documentação (Vereadores)
            </button>
          </div>
        </div>
      </div>
      <div className={styles.additionalOptions}>
        <div className={styles.additionalTitle}>
          <p>Opções Adicionais</p>
        </div>
        <div className={styles.additionalSelections}>
          <div className={styles.leftSelections}>
            <button
              className={styles.selection}
              onClick={() => navigate("/editPersonalData")}
            >
              <IoMdPerson />
              Editar Dados Pessoais
            </button>
            <button
              className={styles.selection}
              onClick={() => navigate("/editDocuments")}
            >
              <FaFile />
              Editar Documentos
            </button>
            <button
              className={styles.selection}
              onClick={() => navigate("/editAddress")}
            >
              <FaHouse />
              Editar Endereço
            </button>
          </div>
          <div className={styles.rightSelections}>
            <button
              className={styles.selection}
              onClick={() => navigate("/editJobInformation")}
            >
              <FaSuitcase />
              Editar Informações de Trabalho
            </button>
            <button
              className={styles.selection}
              onClick={() => navigate("/editContact")}
            >
              <FaPhoneFlip />
              Editar Contato
            </button>
            <button
              className={styles.selection}
              onClick={() => navigate("/editAccessPassword")}
            >
              <MdPassword />
              Editar Senha de Acesso
            </button>
          </div>
        </div>
      </div>
      <BasicButton
        title="Sair"
        onClick={logoutSubmit}
        startIcon={<ExitToAppIcon />}
      />
    </div>
  );
};
