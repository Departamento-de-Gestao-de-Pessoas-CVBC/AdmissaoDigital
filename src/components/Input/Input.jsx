import styles from "./Input.module.css";
import ReactInputMask from "react-input-mask";

export const Input = ({ icone, placeholder, type, id, mask, ...rest }) => {
  return (
    <div className={styles.input}>
      <div className={styles.icone}>{icone}</div>
      {mask ? (
        <ReactInputMask mask={mask} placeholder={placeholder} id={id} {...rest}>
          {(inputProps) => <input type="text" {...inputProps} />}
        </ReactInputMask>
      ) : (
        <input type={type} id={id} placeholder={placeholder}></input>
      )}
    </div>
  );
};
