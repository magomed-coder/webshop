import styles from "./style.module.css";

export const Switch = ({
  isToggle,
  onToggle,
  raunded = true,
  disabled = false,
}) => {
  return (
    <label className={`${styles.switch} ${disabled ? styles.disabled : ""}`}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={isToggle}
        onChange={onToggle}
        disabled={disabled}
      />
      <span className={`${styles.slider} ${raunded && styles.raunded}`} />
    </label>
  );
};
