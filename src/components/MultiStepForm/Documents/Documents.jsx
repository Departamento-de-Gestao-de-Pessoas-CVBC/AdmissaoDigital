import styles from "./Documents.module.css";

import { PiIdentificationCard } from "react-icons/pi";
import { TiDocumentText } from "react-icons/ti";

import { Input } from "../../Input/Input";

export const Documents = () => {
  return (
    <div className={styles.documents}>
      <h1>DOCUMENTOS</h1>
      <div className={styles.form}>
        <div className={styles.wrapper}>
          <Input
            icone={<PiIdentificationCard />}
            type="number"
            id="cpf"
            placeholder="CPF"
            mask={"999.999.999-99"}
          />
          <Input
            icone={<PiIdentificationCard />}
            type="number"
            id="pis"
            placeholder="PIS"
            mask={"999.99999.99.9"}
          />
          <Input
            icone={<PiIdentificationCard />}
            type="number"
            id="rg"
            placeholder="RG"
          />
          <Input
            icone={<PiIdentificationCard />}
            type="text"
            id="rg"
            placeholder="Expedidor do RG"
          />
        </div>
        <div className={styles.wrapper}>
          <Input
            icone={<PiIdentificationCard />}
            type="text"
            id="rg"
            placeholder="UF do RG"
          />
          <Input
            icone={<PiIdentificationCard />}
            type="number"
            id="rg"
            placeholder="Data de Expedição do RG"
            mask={"99/99/9999"}
          />
          <Input
            icone={<TiDocumentText />}
            type="number"
            id="rg"
            placeholder="Título de Eleitor"
            mask={"999999999999"}
          />
          <Input
            icone={<TiDocumentText />}
            type="number"
            id="rg"
            placeholder="Nº Reservista"
            mask={"999999999999"}
          />
        </div>
      </div>
    </div>
  );
};
