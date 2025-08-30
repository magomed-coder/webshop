import React, { type ChangeEvent } from "react";
import styles from "./styles.module.css";

interface RadioButtonProps {
  label?: string;
  value?: string;
  isSelected: boolean;
  changed: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  isSelected,
  changed,
}) => (
  <label className={styles.container}>
    <div className={styles.label}>{label}</div>
    <input type="radio" value={value} checked={isSelected} onChange={changed} />
    <div className={styles.checkmark} />
  </label>
);
