import styles from "./AccessPassword.module.css";

import DoneIcon from "@mui/icons-material/Done";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { BasicButton } from "../BasicButton/BasicButton";
import { Input } from "../Input/Input";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AccessPassword = ({ formData, setFormData, prevStep }) => {
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValue = {
      nome: formData.name,
      sexo: formData.gender,
      estado_civil: formData.maritialStatus,
      cpf: formData.cpf,
      data_nascimento: formData.dateOfBirth,
      cidade_nascimento: formData.cityOfBirth,
      estado_nascimento: formData.stateOfBirth,
      nacionalidade: formData.nationality,
      grau_instrucao: formData.levelOfEducation,
      raca_cor: formData.breed,
      nome_pai: formData.fathersName,
      nome_mae: formData.mothersName,
      cep: formData.cep,
      cidade_residencia: formData.city,
      estado_residencia: formData.stateOfResidence,
      bairro: formData.neighborhood,
      tipo_logradouro: formData.logradouro,
      logradouro_residencia: formData.address,
      numero_residencia: formData.residenceNumber,
      complemento_residencia: formData.complement,
      numero_pis: formData.pis,
      numero_rg: formData.rg,
      expedidor_rg: formData.expRg,
      data_expedicao_rg: formData.dateExpRg,
      uf_expedicao_rg: formData.ufRg,
      titulo_eleitor: formData.voterRegistration,
      titulo_eleitor_zona: formData.electoralZone,
      titulo_eleitor_secao: formData.pollingStation,
      reservista: formData.reservist,
      ddd_telefone_1: formData.phoneNumber1,
      telefone_1: formData.phoneNumber1,
      ddd_telefone_2: formData.phoneNumber2,
      telefone_2: formData.phoneNumber2,
      email_1: formData.email1,
      email_2: formData.email1,
      cargo: formData.responsibility,
      senha: formData.password,
      csenha: formData.confirmPassword,
    };

    try {
      const res = await axios.post(
        "http://localhost/ADMISSAODIGITAL/API/user.php", // Luiz Path

        // "http://localhost/teste/ADMISSAODIGITAL/api/user.php", // Gus Path
        formValue
      );

      if (res.data.success) {
        console.log(formData); // *** USO PRA TESTAR
        navigate("/");
      } else {
        setMessage("Falha ao criar usuário. Tente novamente.");
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      setMessage("Erro ao enviar o formulário. Tente novamente.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.accessPassword}>
        <div className={styles.title}>
          <h1>SENHA DE ACESSO</h1>
        </div>
        <div className={styles.inputs}>
          <Input
            type="password"
            id="password"
            name="password"
            label="Crie uma Senha"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirme Senha"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className={styles.buttons}>
          <BasicButton
            title="Voltar"
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={prevStep}
          />
          <BasicButton
            title="Finalizar"
            startIcon={<DoneIcon />}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </form>
  );
};
