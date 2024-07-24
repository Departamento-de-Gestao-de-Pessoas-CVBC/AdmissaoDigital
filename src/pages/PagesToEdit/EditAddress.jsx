import React, { useEffect, useState } from "react";
import styles from "./pagesToEdit.module.css";
import citiesData from "../../../Cidades.json";
import LogoCamara from "../../assets/CamaraSemFundoAzul.png";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Input } from "../../components/Input/Input";
import { BasicSelect } from "../../components/Select/Select";
import { BasicButton } from "../../components/BasicButton/BasicButton";
import { useNavigate } from "react-router-dom";
import { API_DIRECTORY } from "../../../config.js";

export const EditAddress = () => {
  const navigate = useNavigate();
  const [filteredCities, setFilteredCities] = useState([]);
  const [citySelectDisabled, setCitySelectDisabled] = useState(true);
  const [formData, setFormData] = useState({
    cep: "",
    stateOfResidence: "",
    city: "",
    neighborhood: "",
    logradouroSelect: "",
    address: "",
    residenceNumber: "",
    complement: "",
  });
  const [initialFormData, setInitialFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchAddressData(userId);
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchAddressData = (userId) => {
    fetch(`${API_DIRECTORY}getAddress.php?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching address data:", data.error);
          setLoading(false);
        } else {
          setFormData({
            cep: data.cep || "",
            stateOfResidence: data.state || "",
            city: data.city || "",
            neighborhood: data.neighborhood || "",
            logradouroSelect: data.streetType || "",
            address: data.street || "",
            residenceNumber: data.number || "",
            complement: data.complement || "",
          });
          setInitialFormData({
            cep: data.cep || "",
            stateOfResidence: data.state || "",
            city: data.city || "",
            neighborhood: data.neighborhood || "",
            logradouroSelect: data.streetType || "",
            address: data.street || "",
            residenceNumber: data.number || "",
            complement: data.complement || "",
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching address data:", error);
        setLoading(false);
      });
  };

  const stateOfResidenceOptions = [
    { value: "AC", label: "AC" },
    { value: "AL", label: "AL" },
    { value: "AP", label: "AP" },
    { value: "AM", label: "AM" },
    { value: "BA", label: "BA" },
    { value: "CE", label: "CE" },
    { value: "DF", label: "DF" },
    { value: "ES", label: "ES" },
    { value: "GO", label: "GO" },
    { value: "MA", label: "MA" },
    { value: "MT", label: "MT" },
    { value: "MS", label: "MS" },
    { value: "MG", label: "MG" },
    { value: "PA", label: "PA" },
    { value: "PB", label: "PB" },
    { value: "PR", label: "PR" },
    { value: "PE", label: "PE" },
    { value: "PI", label: "PI" },
    { value: "RJ", label: "RJ" },
    { value: "RN", label: "RN" },
    { value: "RS", label: "RS" },
    { value: "RO", label: "RO" },
    { value: "RR", label: "RR" },
    { value: "SC", label: "SC" },
    { value: "SP", label: "SP" },
    { value: "SE", label: "SE" },
    { value: "TO", label: "TO" },
  ];

  useEffect(() => {
    setCitySelectDisabled(!formData.stateOfResidence);
    if (formData.stateOfResidence) {
      const filtered = citiesData.filter(
        (city) => city.Estado === formData.stateOfResidence
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [formData.stateOfResidence]);

  const logradouro = [
    { value: "R", label: "Rua" },
    { value: "AV", label: "Avenida" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      if (JSON.stringify(formData) !== JSON.stringify(initialFormData)) {
        const dataToSend = {
          userId: userId,
          password: password,
          formData: formData
        };

        fetch(`${API_DIRECTORY}updateAddress.php`, {
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
              alert("Erro ao atualizar dados. Verifique sua conexão e tente novamente.");
            } else {
              alert("Dados atualizados com sucesso!");
              navigate("/userInformation");
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
          alt="Logo da Câmara"
          onClick={() => navigate("/userInformation")}
        />
        <h1>Editar Endereço</h1>
      </div>
      <div className={styles.informativeText}>
        <p>Utilize os campos abaixo para atualizar suas informações.</p>
      </div>
      <div className={styles.inputs}>
        <div className={styles.leftInputs}>
          <Input
            mask="99999-999"
            value={formData.cep}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            id="cep"
            label="CEP"
            name="cep"
          />
          <BasicSelect
            label="Estado de Residência"
            name="stateOfResidence"
            options={stateOfResidenceOptions}
            value={formData.stateOfResidence}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <BasicSelect
            label="Cidade de Residência"
            name="city"
            options={filteredCities.map((city) => ({
              value: city.Cidade,
              label: city.Nome,
            }))}
            value={formData.city}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={citySelectDisabled}
          />
          <Input
            type="text"
            id="neighborhood"
            label="Bairro"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.rightInputs}>
          <BasicSelect
            label="Logradouro"
            options={logradouro}
            value={formData.logradouroSelect}
            name="logradouroSelect"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            id="address"
            label="Nome da Rua/Avenida"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="number"
            id="residenceNumber"
            label="Número da Residência"
            name="residenceNumber"
            value={formData.residenceNumber}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="text"
            id="complement"
            label="Complemento"
            name="complement"
            value={formData.complement}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className={styles.button}>
        <BasicButton
          title="Salvar Alterações"
          startIcon={<SaveAltIcon />}
          onClick={handleSave}
        />
      </div>
    </div>
  );
};
