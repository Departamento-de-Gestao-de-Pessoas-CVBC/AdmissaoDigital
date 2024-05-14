import styles from "./Input.module.css";

export const Input = ({ icone, placeholder, type, ...rest }) => {
  return (
    <div className={styles.input}>
      <div className={styles.icone}>{icone}</div>
      <input type={type} placeholder={placeholder}></input>
    </div>
  );
};
