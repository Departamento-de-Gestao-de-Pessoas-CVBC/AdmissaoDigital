import React, { useEffect, useState } from "react";
import styles from "./EditJobInformation.module.css";
import LogoCamara from "../../assets/CamaraSemFundoAzul.png";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Input } from "../../components/Input/Input";
import { BasicSelect } from "../../components/Select/Select";
import { BasicButton } from "../../components/BasicButton/BasicButton";
import { useNavigate } from "react-router-dom";
import { API_DIRECTORY } from "../../../config.js";

export const EditJobInformation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    responsibilitySelect: "",
    dependentsSelect: ""
  });
  const [initialFormData, setInitialFormData] = useState({
    responsibilitySelect: "",
    dependentsSelect: ""
  });
  const [dependents, setDependents] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  const responsibility = [
    { value: "0052", label: "Analista de Tecnologia da Informação" },
    { value: "0051", label: "Analista Legislativo" },
    { value: "0117", label: "Assessor(a) Parlamentar" },
    { value: "0062", label: "Auxiliar de Almoxarifado" },
    { value: "0001", label: "Auxiliar de Secretaria" },
    { value: "0054", label: "Contador(a)" },
    { value: "0122", label: "Controlador(a) Geral" },
    { value: "0118", label: "Controlador(a) Interno" },
    { value: "0063", label: "Copeira(o)" },
    { value: "0106", label: "Diretor(a) de Administração e Planejamento" },
    { value: "0107", label: "Diretor(a) de Câmara Mirim" },
    { value: "0108", label: "Diretor(a) de Compras" },
    { value: "0109", label: "Diretor(a) de Comunicação Social e TV" },
    { value: "0124", label: "Diretor(a) de Finanças" },
    { value: "0116", label: "Diretor(a) de Gabinete da Presidência" },
    { value: "0110", label: "Diretor(a) de Gestão de Pessoas" },
    { value: "0111", label: "Diretor(a) de Patrimônio" },
    { value: "0112", label: "Diretor(a) de Plenário" },
    { value: "0113", label: "Diretor(a) de Projetos" },
    { value: "0123", label: "Diretor(a) de Transparência e Ouvidoria" },
    { value: "0121", label: "Estagiário(a) - Educação Especial" },
    { value: "0036", label: "Estagiário(a) - Nível Superior" },
    { value: "0064", label: "Guarda Patrimonial" },
    { value: "0053", label: "Jornalista" },
    { value: "0059", label: "Motorista" },
    { value: "0120", label: "Oficial de Manutenção Predial" },
    { value: "0050", label: "Procurador" },
    { value: "0104", label: "Procurador Geral" },
    { value: "0125", label: "Secretário(a) de Administração e Finanças" },
    { value: "0103", label: "Secretário(a) Parlamentar" },
    { value: "0056", label: "Técnico do Legislativo" },
    { value: "0119", label: "Técnico em Audiovisual" },
    { value: "0058", label: "Técnico em Contabilidade" },
    { value: "0057", label: "Técnico em Informática" },
    { value: "0061", label: "Telefonista" }
  ];

  const dependentsOptions = [
    { value: "sim", label: "Sim" },
    { value: "nao", label: "Não" }
  ];

  useEffect(() => {
    if (userId) {
      fetchJobData(userId);
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchJobData = (userId) => {
    fetch(`${API_DIRECTORY}job_dependents.php?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching job data:", data.error);
          setLoading(false);
        } else {
          const matchedResponsibility = responsibility.find(
            (r) => r.value === data.cargo
          )?.value || "";

          const fetchedFormData = {
            responsibilitySelect: matchedResponsibility,
            dependentsSelect: data.dependents.length > 0 ? "sim" : "nao"
          };

          setFormData(fetchedFormData);
          setInitialFormData(fetchedFormData);
          setDependents(data.dependents || []);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
    }
  };

  const handleSave = () => {
    const password = prompt("Por favor, insira sua senha para confirmar:");
    if (password) {
      // Verifica se os dados foram modificados
      if (formData.responsibilitySelect !== initialFormData.responsibilitySelect ||
          formData.dependentsSelect !== initialFormData.dependentsSelect) {
        // Prepara o objeto de dados para enviar ao backend
        const dataToSend = {
          userId: userId,
          password: password,
          formData: formData
        };

        // Envia os dados para o backend
        fetch(`${API_DIRECTORY}update_job_dependents.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataToSend)
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              console.error("Erro ao atualizar dados:", data.error);
              alert("Senha Incorreta.");
            } else {
              alert("Dados atualizados com sucesso!");
              navigate("/userInformation"); // Redireciona para a página de informações do usuário
            }
          })
          .catch((error) => {
            console.error("Erro ao enviar requisição:", error);
            alert("Senha Incorreta.");
          });
      } else {
        alert("Nenhuma alteração detectada.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoTitle}>
        <img
          src={LogoCamara}
          onClick={() => navigate("/userInformation")}
          alt="Logo da Câmara"
        />
        <h1>Editar Informações de Trabalho</h1>
      </div>
      <div className={styles.informativeText}>
        <p>Utilize os campos abaixo para atualizar suas informações.</p>
      </div>
      <div className={styles.inputs}>
        <div className={styles.leftInputs}>
          <BasicSelect
            label="Cargo"
            options={responsibility}
            value={formData.responsibilitySelect}
            name="responsibilitySelect"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.rightInputs}>
          <BasicSelect
            label="Dependentes Declarados no Imposto de Renda"
            options={dependentsOptions}
            value={formData.dependentsSelect}
            name="dependentsSelect"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <h2>Dependentes Cadastrados</h2>
      <div className={styles.dependentsSection}>
        {dependents.length > 0 ? (
          dependents.map((dependent, index) => (
            <div key={index} className={styles.dependentsWrapper}>
              <div className={styles.dependentInfos}>
                <h3>{`${index + 1}º Dependente:`}</h3>
                <Input
                  type="text"
                  name="dependentName"
                  label="Nome Completo"
                  value={dependent.name}
                  onKeyDown={handleKeyDown}
                  
                />
                <Input
                  type="text"
                  name="dependentCpf"
                  label="CPF"
                  value={dependent.cpf}
                  mask="999.999.999-99"
                  onKeyDown={handleKeyDown}
                  
                />
                <Input
                  type="text"
                  name="dependentDob"
                  label="Data de Nascimento"
                  value={dependent.birthdate}
                  mask="99/99/9999"
                  onKeyDown={handleKeyDown}
                  
                />
              </div>
            </div>
          ))
        ) : (
          <p>Não há dependentes cadastrados.</p>
        )}
      </div>
      <div className={styles.button}>
        <BasicButton title="Salvar Alterações" startIcon={<SaveAltIcon />} onClick={handleSave} />
      </div>
    </div>
  );
};
