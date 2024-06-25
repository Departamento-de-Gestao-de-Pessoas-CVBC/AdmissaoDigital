import React, { useEffect, useState } from 'react';
import styles from "./UserInformation.module.css";
import { useNavigate } from "react-router-dom";
import { IoPrintOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { FaFile, FaHouse, FaSuitcase, FaPhoneFlip } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

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
    fetch(`http://localhost/teste/ADMISSAODIGITAL/api/getUserData.php?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Error fetching user data:', data.error);
          setLoading(false);
          // Handle error appropriately, e.g., redirect to an error page or show a message
        } else {
          setUserData(data);
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  };

  function logoutSubmit() {
    localStorage.setItem("login", "");
    localStorage.setItem("loginStatus", "Logado com sucesso!");
    navigate("/");
  }

  const handleFichaCadastralClick = () => {
    fetch(`http://localhost/teste/ADMISSAODIGITAL/api/FichaCadastral.php?id=${userId}`)
      .then(response => response.json())
      .then(data => {
        // Open a new window to print the returned HTML
        const newWindow = window.open('', '_blank');
        newWindow.document.open();
        newWindow.document.write(data.html);
        newWindow.document.close();
        newWindow.print();
      })
      .catch(error => {
        console.error('Error fetching or printing document:', error);
        // Handle error as needed
      });
  };
  const handleAptidaoClick = () => {
    fetch(`http://localhost/teste/ADMISSAODIGITAL/api/aptidao_legal.php?id=${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Retorna o JSON da resposta
      })
      .then(data => {
        // Verifica se há um erro na resposta
        if (data.error) {
          throw new Error(data.error);
        }
        // Abre uma nova janela para imprimir o HTML retornado
        const newWindow = window.open('', '_blank');
        newWindow.document.open();
        newWindow.document.write(data.html); // Escreve o HTML na nova janela
        newWindow.document.close();
        newWindow.print();
      })
      .catch(error => {
        console.error('Error fetching or printing document:', error);
        // Handle error as needed
      });
  };
  const handleInexistenciaClick = () => {
    fetch(`http://localhost/teste/ADMISSAODIGITAL/api/inexistencia.php?id=${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Retorna o JSON da resposta
      })
      .then(data => {
        // Verifica se há um erro na resposta
        if (data.error) {
          throw new Error(data.error);
        }
        // Abre uma nova janela para imprimir o HTML retornado
        const newWindow = window.open('', '_blank');
        newWindow.document.open();
        newWindow.document.write(data.html); // Escreve o HTML na nova janela
        newWindow.document.close();
        newWindow.print();
      })
      .catch(error => {
        console.error('Error fetching or printing document:', error);
        // Handle error as needed
      });
  };
  const handleLomClick = () => {
    fetch(`http://localhost/teste/ADMISSAODIGITAL/api/Lom.php?id=${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Retorna o JSON da resposta
      })
      .then(data => {
        // Verifica se há um erro na resposta
        if (data.error) {
          throw new Error(data.error);
        }
        // Abre uma nova janela para imprimir o HTML retornado
        const newWindow = window.open('', '_blank');
        newWindow.document.open();
        newWindow.document.write(data.html); // Escreve o HTML na nova janela
        newWindow.document.close();
        newWindow.print();
      })
      .catch(error => {
        console.error('Error fetching or printing document:', error);
        // Handle error as needed
      });
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error loading user data.</div>;
  }

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
          <div className={styles.forms}>
            <button className={styles.option} onClick={handleFichaCadastralClick}>
              <IoPrintOutline />
              Ficha Cadastral
            </button>
            <button className={styles.option}>
              <IoPrintOutline />
              Declaração de Bens e Renda
            </button>
            <button className={styles.option}  onClick={handleAptidaoClick}>
              <IoPrintOutline />
              Aptidão Legal
            </button>
            <button className={styles.option}  onClick={handleInexistenciaClick}>
              <IoPrintOutline />
              Inexistência de Parentesco
            </button>
            <button className={styles.option} onClick={handleLomClick}>
              <IoPrintOutline />
              Declaração LOM (Apenas vereadores)
            </button>
            <button className={styles.option}>
              <IoPrintOutline />
              Lista de Documentação (Comissionados)
            </button>
            <button className={styles.option}>
              <IoPrintOutline />
              Lista de Documentação (Estagiários)
            </button>
            <button className={styles.option}>
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
        <div className={styles.additionalCard}>
          <div className={styles.forms}>
            <button className={styles.option}>
              <IoMdPerson />
              Dados Pessoais
            </button>
            <button className={styles.option}>
              <FaFile />
              Documentos
            </button>
            <button className={styles.option}>
              <FaHouse />
              Endereço
            </button>
            <button className={styles.option}>
              <FaSuitcase />
              Profissional
            </button>
            <button className={styles.option}>
              <FaPhoneFlip />
              Contatos
            </button>
            <button className={styles.option}>
              <MdPassword />
              Senha
            </button>
            <button className={styles.option} onClick={logoutSubmit}>
              <ExitToAppIcon />
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
