import { useNavigate } from "react-router-dom";
import { BasicButton } from "../../components/BasicButton/BasicButton";

export const PaginaEmBranco = () => {
  const navigate = useNavigate();
  function logoutSubmit(){
    localStorage.setItem("login", "");
    localStorage.setItem("loginStatus", "Logado com sucesso!");
    navigate("/");
  }
  return (
    <div classNmae="form">
      <h3>OLÁ</h3>
      <BasicButton title="Teste" onClick={logoutSubmit} />
    </div>
  );
};
