import styles from "./pagesToEdit.module.css";

import LogoCamara from "../../assets/CamaraSemFundoAzul.png";

import SaveAltIcon from "@mui/icons-material/SaveAlt";

import { Input } from "../../components/Input/Input";
import { BasicSelect } from "../../components/Select/Select";
import { BasicButton } from "../../components/BasicButton/BasicButton";
import { useNavigate } from "react-router-dom";

export const EditPersonalData = () => {
  const navigate = useNavigate();

  const nationality = [
    { value: 10, label: "Brasileiro" },
    { value: 20, label: "Brasileiro Naturalizado" },
    { value: 50, label: "Outros" },
  ];

  const gender = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Feminino" },
  ];

  const maritalStatus = [
    { value: "1", label: "Solteiro(a)" },
    { value: "2", label: "Casado(a)" },
    { value: "6", label: "Separado(a)" },
    { value: "3", label: "Divorciado(a)" },
    { value: "4", label: "Viúvo(a)" },
    { value: "7", label: "União Estável" },
    { value: "5", label: "Concubinato" },
    { value: "9", label: "Outros" },
  ];

  const levelOfEducation = [
    { value: "01", label: "Analfabeto(a)" },
    { value: "02", label: "4ª Série Incompleto" },
    { value: "03", label: "4ª Série Completa" },
    { value: "04", label: "5ª a 8ª Série Completa" },
    { value: "05", label: "1º Grau Incompleto" },
    { value: "06", label: "1º Grau Completo" },
    { value: "07", label: "2º Grau Incompleto" },
    { value: "08", label: "2º Grau Completo" },
    { value: "09", label: "Superior Incompleto" },
    { value: "10", label: "Superior Completo" },
    { value: "11", label: "Pós-graduação" },
  ];

  const breed = [
    { value: "01", label: "Branca" },
    { value: "02", label: "Preta" },
    { value: "03", label: "Amarela" },
    { value: "04", label: "Parda" },
    { value: "05", label: "Indígena" },
    { value: "06", label: "Mameluco" },
    { value: "07", label: "Mulato" },
    { value: "08", label: "Cafuzo" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <img src={LogoCamara} onClick={() => navigate("/teste")} />
        <h1>Editar Dados Pessoais</h1>
      </div>
      <div className={styles.informativeText}>
        <p>Utilize os campos abaixo para atualizar suas informações.</p>
      </div>
      <div className={styles.inputs}>
        <div className={styles.leftInputs}>
          <Input
            type="text"
            name="name"
            label="Nome Completo"
            //   value={formData.name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            name="mothersName"
            label="Nome Completo da Mãe"
            //   value={formData.mothersName}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            name="fathersName"
            label="Nome Completo do Pai"
            //   value={formData.fathersName}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <BasicSelect
            label="Nacionalidade"
            name="nationality"
            options={nationality}
            //   value={formData.nationality}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <BasicSelect
            label="Gênero"
            name="gender"
            options={gender}
            //   value={formData.gender}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.rightInputs}>
          <BasicSelect
            label="Estado Civil"
            name="maritalStatus"
            options={maritalStatus}
            //   value={formData.maritalStatus}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            name="dateOfBirth"
            label="Data de Nascimento"
            mask="99/99/9999"
            //   value={formData.dateOfBirth}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            name="cityOfBirth"
            label="Cidade de Nascimento"
            //   value={formData.cityOfBirth}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            name="stateOfBirth"
            label="Estado de Nascimento"
            //   value={formData.stateOfBirth}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled
          />
          <BasicSelect
            label="Grau de Instrução"
            name="levelOfEducation"
            options={levelOfEducation}
            //   value={formData.levelOfEducation}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className={styles.alone}>
        <BasicSelect
          label="Raça/Cor"
          name="breed"
          options={breed}
          // value={formData.breed}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.button}>
        <BasicButton title="Salvar" startIcon={<SaveAltIcon />} />
      </div>
    </div>
  );
};
