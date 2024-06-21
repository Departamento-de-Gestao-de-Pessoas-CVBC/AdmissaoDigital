import styles from "./ReturnButton.module.css";

import { IoMdArrowBack } from "react-icons/io";

export const ReturnButton = () => {
  return (
    <div className={styles.container}>
      <IoMdArrowBack />
      Voltar
    </div>
  );
};
