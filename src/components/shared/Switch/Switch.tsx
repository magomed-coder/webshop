import styles from "./style.module.css";

type SwitchProps = {
  isToggle: boolean;
  onToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  raunded?: boolean;
  disabled?: boolean;
};

export const Switch = ({
  isToggle,
  onToggle,
  raunded = true,
  disabled = false,
}: SwitchProps) => {
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
