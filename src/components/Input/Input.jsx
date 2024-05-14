import { useState } from "react";
import styles from "./Input.module.css";

export const Input = ({ icone, placeholder, type, ...rest }) => {
//   const [isEmpty, setIsEmpty] = useState(true);

//   const handleChange = (event) => {
//     setIsEmpty(event.target.value === "");
//   };

  return (
    <div className={styles.input}>
      <div
        className={styles.icone}
        // style={{ display: isEmpty ? "block" : "none" }}
      >
        {icone}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        {...rest}
        // onChange={handleChange}
      ></input>
    </div>
  );
};
