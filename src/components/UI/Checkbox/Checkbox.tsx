// src/components/ui/Checkbox.tsx
import React from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onPress,
}) => {
  return (
    <label className={styles.checkboxContainer}>
      <input type="checkbox" checked={checked} onChange={onPress} />
      <span className={styles.checkmark}></span>
      {label}
    </label>
  );
};
