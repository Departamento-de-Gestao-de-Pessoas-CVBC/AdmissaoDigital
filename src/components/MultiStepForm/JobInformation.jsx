import * as React from "react";
import styles from "./JobInformation.module.css";

import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { Input } from "../Input/Input";
import { BasicSelect } from "../Select/Select";
import { BasicButton } from "../BasicButton/BasicButton";

export const JobInformation = ({
  formData,
  setFormData,
  prevStep,
  nextStep,
}) => {
  const [responsibilitySelect, setResponsibilitySelect] = React.useState(
    formData.responsibilitySelect || ""
  );
  const [dependentsSelect, setDependentsSelect] = React.useState(
    formData.dependentsSelect || ""
  );
  const [dependents, setDependents] = React.useState(formData.dependents || []);

  const dependentsRef = React.useRef([]);

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

  React.useEffect(() => {
    if (dependentsSelect === "sim" && dependents.length === 0) {
      setDependents([{ name: "", cpf: "", dob: "" }]);
    } else if (dependentsSelect === "nao") {
      setDependents([]);
    }
  }, [dependentsSelect]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "responsibilitySelect") setResponsibilitySelect(value);
    if (name === "dependentsSelect") setDependentsSelect(value);
  };

  const addDependent = () => {
    if (dependents.length < 5) {
      setDependents((prev) => [
        ...prev,
        { dependentName: "", dependentCpf: "", dependentDob: "" },
      ]);
      setTimeout(() => {
        const lastDependentIndex = dependents.length;
        dependentsRef.current[lastDependentIndex].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 0);
    }
  };

  const removeDependent = () => {
    if (dependents.length > 1) {
      setDependents((prev) => prev.slice(0, -1));
    }
  };

  const handleDependentChange = (index, e) => {
    const { name, value } = e.target;
    const newDependents = [...dependents];
    newDependents[index][name] = value;
    setDependents(newDependents);

    setFormData((prev) => ({
      ...prev,
      dependents: newDependents,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1].focus();
    }
  };

  const handlePrevStep = () => {
    prevStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextStep = () => {
    nextStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  React.useEffect(() => {
    if (dependentsSelect === "sim") {
      setTimeout(() => {
        dependentsRef.current[0].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 0);
    }
  }, [dependentsSelect]);

  return (
    <div className={styles.jobInformation}>
      <div className={styles.title}>
        <h1>INFORMAÇÕES DE TRABALHO</h1>
      </div>
      <div className={styles.inputs}>
        <div className={styles.leftInputs}>
          <BasicSelect
            label="Cargo"
            options={responsibility}
            value={responsibilitySelect}
            name="responsibilitySelect"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.rightInputs}>
          <BasicSelect
            label="Dependentes Declarados no Imposto de Renda"
            options={dependentsOptions}
            value={dependentsSelect}
            name="dependentsSelect"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      {dependentsSelect === "sim" && (
        <div className={styles.dependentFields}>
          {dependents.map((dependent, index) => (
            <div
              key={index}
              className={styles.dependentSection}
              ref={(el) => (dependentsRef.current[index] = el)}
            >
              <h3>{`${index + 1}º Dependente:`}</h3>
              <Input
                type="text"
                id={`dependentName-${index}`}
                name="dependentName"
                label="Nome Completo"
                value={dependent.dependentName}
                onChange={(e) => handleDependentChange(index, e)}
                onKeyDown={handleKeyDown}
              />
              <Input
                type="text"
                id={`dependentCPF-${index}`}
                name="dependentCpf"
                label="CPF"
                value={dependent.dependentCpf}
                mask="999.999.999-99"
                onChange={(e) => handleDependentChange(index, e)}
                onKeyDown={handleKeyDown}
              />
              <Input
                type="text"
                id={`dependentDOB-${index}`}
                name="dependentDob"
                label="Data de Nascimento"
                value={dependent.dependentDob}
                mask="99/99/9999"
                onChange={(e) => handleDependentChange(index, e)}
                onKeyDown={handleKeyDown}
              />
            </div>
          ))}
          <div className={styles.dependentButtons}>
            {dependents.length > 1 && (
              <BasicButton
                title="Remover Dependente"
                onClick={removeDependent}
                className={styles.removeDependentButton}
              >
                Remover Dependente
              </BasicButton>
            )}
            {dependents.length < 5 && (
              <BasicButton
                title="Adicionar Dependente"
                onClick={addDependent}
                className={styles.addDependentButton}
              >
                Adicionar Dependente
              </BasicButton>
            )}
          </div>
        </div>
      )}
      <div className={styles.buttons}>
        <BasicButton
          title="Voltar"
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={handlePrevStep}
        />
        <BasicButton
          title="Avançar"
          startIcon={<ArrowForwardOutlinedIcon />}
          onClick={handleNextStep}
        />
      </div>
    </div>
  );
};
