import styles from "./SmallerInput.module.css";

export const SmallerInput = ({ icone, type, id, placeholder, ...rest }) => {
  return (
    <div className={styles.smallerInput}>
      <div className={styles.icone}>{icone}</div>
      <input type={type} id={id} placeholder={placeholder}></input>
    </div>
  );
};
