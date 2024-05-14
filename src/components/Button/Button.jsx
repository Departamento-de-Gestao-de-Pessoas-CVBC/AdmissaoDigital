import styles from "./Button.module.css";

export const Button = ({ title, icone, ...rest }) => {
  return (
    <div className={styles.button}>
      <p>
        {icone}
        {title}
      </p>
    </div>
  );
};
