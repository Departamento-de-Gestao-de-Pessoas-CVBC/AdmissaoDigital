import React from "react";
import styles from "./EditJobInformation.module.css";

import LogoCamara from "../../assets/CamaraSemFundoAzul.png";

import SaveAltIcon from "@mui/icons-material/SaveAlt";

import { Input } from "../../components/Input/Input";
import { BasicSelect } from "../../components/Select/Select";
import { BasicButton } from "../../components/BasicButton/BasicButton";
import { useNavigate } from "react-router-dom";

export const EditJobInformation = () => {
  const navigate = useNavigate();

  const responsibility = [
    { value: "analistaTI", label: "Analista de Tecnologia da Informação" },
    { value: "analistaLE", label: "Analista Legislativo" },
    { value: "assessorPA", label: "Assessor(a) Parlamentar" },
    { value: "auxiliarAU", label: "Auxiliar de Almoxarifado" },
    { value: "auxiliarSE", label: "Auxiliar de Secretaria" },
    { value: "contador", label: "Contador(a)" },
    { value: "controladorGE", label: "Controlador(a) Geral" },
    { value: "controladorIN", label: "Controlador(a) Interno" },
    { value: "copeira", label: "Copeira(o)" },
    { value: "diretorAP", label: "Diretor(a) de Administração e Planejamento" },
    { value: "diretorCM", label: "Diretor(a) de Câmara Mirim" },
    { value: "diretorCO", label: "Diretor(a) de Compras" },
    { value: "diretorCS", label: "Diretor(a) de Comunicação Social e TV" },
    { value: "diretorFI", label: "Diretor(a) de Finanças" },
    { value: "diretorGP", label: "Diretor(a) de Gabinete da Presidência" },
    { value: "diretorDGP", label: "Diretor(a) de Gestão de Pessoas" },
    { value: "diretorP", label: "Diretor(a) de Patrimônio" },
    { value: "diretorPL", label: "Diretor(a) de Plenário" },
    { value: "diretorPJ", label: "Diretor(a) de Projetos" },
    { value: "diretorTO", label: "Diretor(a) de Transparência e Ouvidoria" },
    { value: "estagiarioES", label: "Estagiário(a) - Educação Especial" },
    { value: "0036", label: "Estagiário(a) - Nível Superior" },
    { value: "guardaPM", label: "Guarda Patrimonial" },
    { value: "jornalista", label: "Jornalista" },
    { value: "motorista", label: "Motorista" },
    { value: "oficialMP", label: "Oficial de Manutenção Predial" },
    { value: "procurador", label: "Procurador" },
    { value: "procuradorGE", label: "Procurador Geral" },
    {
      value: "secretarioAF",
      label: "Secretário(a) de Administração e Finanças",
    },
    { value: "secretarioP", label: "Secretário(a) Parlamentar" },
    { value: "tecnicoLE", label: "Técnico do Legislativo" },
    { value: "tecnicoAV", label: "Técnico em Audiovisual" },
    { value: "tecnicoCB", label: "Técnico em Contabilidade" },
    { value: "tecnicoIF", label: "Técnico em Informática" },
    { value: "telefonista", label: "Telefonista" },
  ];

  const dependentsOptions = [
    { value: "sim", label: "Sim" },
    { value: "nao", label: "Não" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "responsibilitySelect") setResponsibilitySelect(value);
    if (name === "dependentsSelect") setDependentsSelect(value);
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
      <div className={styles.logoTitle}>
        <img src={LogoCamara} onClick={() => navigate("/userInformation")} />
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
            // value={responsibilitySelect}
            name="responsibilitySelect"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.rightInputs}>
          <BasicSelect
            label="Dependentes Declarados no Imposto de Renda"
            options={dependentsOptions}
            // value={dependentsSelect}
            name="dependentsSelect"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <h2>Dependentes Cadastrados</h2>
      <div className={styles.dependentsSection}>
        <div className={styles.dependentsWrapper}>
          <div
            // key={index}
            className={styles.dependentInfos}
            // ref={(el) => (dependentsRef.current[index] = el)}
          >
            <h3>{`Xº Dependente:`}</h3>
            <Input
              type="text"
              // id={`dependentName-${index}`}
              name="dependentName"
              label="Nome Completo"
              // value={dependent.dependentName}
              // onChange={(e) => handleDependentChange(index, e)}
              onKeyDown={handleKeyDown}
            />
            <Input
              type="text"
              // id={`dependentCPF-${index}`}
              name="dependentCpf"
              label="CPF"
              // value={dependent.dependentCpf}
              mask="999.999.999-99"
              // onChange={(e) => handleDependentChange(index, e)}
              onKeyDown={handleKeyDown}
            />
            <Input
              type="text"
              // id={`dependentDOB-${index}`}
              name="dependentDob"
              label="Data de Nascimento"
              // value={dependent.dependentDob}
              mask="99/99/9999"
              // onChange={(e) => handleDependentChange(index, e)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className={styles.dependentsWrapper}>
          <div
            // key={index}
            className={styles.dependentInfos}
            // ref={(el) => (dependentsRef.current[index] = el)}
          >
            <h3>{`Yº Dependente:`}</h3>
            <Input
              type="text"
              // id={`dependentName-${index}`}
              name="dependentName"
              label="Nome Completo"
              // value={dependent.dependentName}
              // onChange={(e) => handleDependentChange(index, e)}
              onKeyDown={handleKeyDown}
            />
            <Input
              type="text"
              // id={`dependentCPF-${index}`}
              name="dependentCpf"
              label="CPF"
              // value={dependent.dependentCpf}
              mask="999.999.999-99"
              // onChange={(e) => handleDependentChange(index, e)}
              onKeyDown={handleKeyDown}
            />
            <Input
              type="text"
              // id={`dependentDOB-${index}`}
              name="dependentDob"
              label="Data de Nascimento"
              // value={dependent.dependentDob}
              mask="99/99/9999"
              // onChange={(e) => handleDependentChange(index, e)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className={styles.dependentsWrapper}>
          <div
            // key={index}
            className={styles.dependentInfos}
            // ref={(el) => (dependentsRef.current[index] = el)}
          >
            <h3>{`Zº Dependente:`}</h3>
            <Input
              type="text"
              // id={`dependentName-${index}`}
              name="dependentName"
              label="Nome Completo"
              // value={dependent.dependentName}
              // onChange={(e) => handleDependentChange(index, e)}
              onKeyDown={handleKeyDown}
            />
            <Input
              type="text"
              // id={`dependentCPF-${index}`}
              name="dependentCpf"
              label="CPF"
              // value={dependent.dependentCpf}
              mask="999.999.999-99"
              // onChange={(e) => handleDependentChange(index, e)}
              onKeyDown={handleKeyDown}
            />
            <Input
              type="text"
              // id={`dependentDOB-${index}`}
              name="dependentDob"
              label="Data de Nascimento"
              // value={dependent.dependentDob}
              mask="99/99/9999"
              // onChange={(e) => handleDependentChange(index, e)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
      <div className={styles.button}>
        <BasicButton title="Salvar Alterações" startIcon={<SaveAltIcon />} />
      </div>
    </div>
  );
};
