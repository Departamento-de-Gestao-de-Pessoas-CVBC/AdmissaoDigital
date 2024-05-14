import styles from "./Input.module.css";

export const Input = ({ icone, placeholder, type, id, ...rest }) => {
  return (
    <div className={styles.input}>
      <div className={styles.icone}>{icone}</div>
      <input type={type} id={id} placeholder={placeholder}></input>
    </div>
  );
};
