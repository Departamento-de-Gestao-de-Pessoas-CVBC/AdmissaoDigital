import styles from "./Documents.module.css";

import { IoSchool } from "react-icons/io5";

import { Input } from "../../Input/Input";
import { SmallerInput } from "../../SmallerInput/SmallerInput";

export const Documents = () => {
  return (
    <div className={styles.documents}>
      <h1>DOCUMENTOS</h1>
      <div className={styles.form}>
        <div className={styles.wrapper}>
          <Input
            // icone={}
            type="number"
            id="cpf"
            placeholder="CPF"
          />
          <Input
            // icone={}
            type="number"
            id="pis"
            placeholder="PIS"
          />
          <Input
            // icone={}
            type="number"
            id="rg"
            placeholder="RG"
          />
        </div>
      </div>
    </div>
  );
};
