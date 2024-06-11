import styles from "./AccessPassword.module.css";

import DoneIcon from "@mui/icons-material/Done";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { BasicButton } from "../BasicButton/BasicButton";
import { Input } from "../Input/Input";

import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const AccessPassword = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) => {
  const navigate= useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit =async(e)=>{
    e.preventDefault();
   // console.log(formData);
    const formValue= {usuario:formData.name, senha:formData.password};
    const [message, setMessage]= useState('');
    const res=  await axios.post("http://localhost/teste/ADMISSAODIGITAL/api/user.php", formValue);

      if(res.data.success){
        setTimeout( ()=>{
          setMessage(res.data.success); /// crie um alerta que apareça depois do clique, mostrando message 
          navigate(''); ////// MUDA AQUI LUIZ PRAIR PRA ALGUMA PAGINA DEPOIS DO CADASTRO
        },2000,);
       
      }
  }
  return (
    <form onSubmit={ handleSubmit}>
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
