import styles from "./PersonalData.module.css";

import { Input } from "../../Input/Input";
import { SmallerInput } from "../../SmallerInput/SmallerInput";

import {
  MdDriveFileRenameOutline,
  MdOutlineWoman,
  MdMan,
  MdLocationCity,
} from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { FaFlag } from "react-icons/fa6";

export const PersonalData = () => {
  return (
    <div className={styles.personalData}>
      <h1>DADOS PESSOAIS</h1>
      <div className={styles.form}>
        <Input
          icone={<MdDriveFileRenameOutline />}
          type="text"
          id="nome"
          placeholder="Nome completo"
        />
        <Input
          icone={<MdOutlineWoman />}
          type="text"
          id="nome"
          placeholder="Nome da mãe"
        />
        <Input
          icone={<MdMan />}
          type="text"
          id="nome"
          placeholder="Nome do pai"
        />
        <Input
          icone={<BiWorld />}
          type="text"
          id="nome"
          placeholder="Nacionalidade"
        />
        <div className={styles.inputWrapper}>
          <SmallerInput
            icone={<FaFlag />}
            type="text"
            id="nome"
            placeholder="UF de nasc."
          />
          <Input
            icone={<MdLocationCity />}
            type="text"
            id="nome"
            placeholder="Cidade de nascimento"
          />
        </div>
      </div>
    </div>
  );
};
