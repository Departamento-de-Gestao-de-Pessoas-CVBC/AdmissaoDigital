import styles from "./UserInformation.module.css";

import { useNavigate } from "react-router-dom";

import { IoPrintOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { FaFile, FaHouse, FaSuitcase, FaPhoneFlip } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { BasicButton } from "../../components/BasicButton/BasicButton";
import { ReturnButton } from "../../components/ReturnButton/ReturnButton";

export const UserInformation = () => {
  const navigate = useNavigate();

  function logoutSubmit() {
    localStorage.setItem("login", "");
    localStorage.setItem("loginStatus", "Logado com sucesso!");
    navigate("/");
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
              <strong>João Paulo Luiz Ramos</strong>
            </p>
            <p>
              <strong>Data de Nasc.</strong>: XX/XX/XXXX
            </p>
            <p>
              <strong>CPF</strong>: 999.999.999-99
            </p>
            <p>
              <strong>PIS</strong>: 999.99999.99.9
            </p>
            <p>
              <strong>Cargo</strong>: Assessor Parlamentar
            </p>
            <p>
              <strong>Celular</strong>: (XX) X XXXX-XXXX
            </p>
            <p>
              <strong>E-mail</strong>: dgp@cambc.sc.gov.br
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
            <button className={styles.option}>
              <IoPrintOutline />
              Ficha Cadastral
            </button>
            <button className={styles.option}>
              <IoPrintOutline />
              Declaração de Bens e Renda
            </button>
            <button className={styles.option}>
              <IoPrintOutline />
              Aptidão Legal
            </button>
            <button className={styles.option}>
              <IoPrintOutline />
              Inexistência de Parentesco
            </button>
            <button className={styles.option}>
              <IoPrintOutline />
              Declaração LOM
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
        <div className={styles.additionalSelections}>
          <div className={styles.leftSelections}>
            <button className={styles.selection}>
              <IoMdPerson />
              Editar Dados Pessoais
            </button>
            <button className={styles.selection}>
              <FaFile />
              Editar Documentos
            </button>
            <button className={styles.selection}>
              <FaHouse />
              Editar Endereço
            </button>
          </div>
          <div className={styles.rightSelections}>
            <button className={styles.selection}>
              <FaSuitcase />
              Editar Informações de Trabalho
            </button>
            <button className={styles.selection}>
              <FaPhoneFlip />
              Editar Contato
            </button>
            <button className={styles.selection}>
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
