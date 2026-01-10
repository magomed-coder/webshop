import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  icon?: React.ReactNode;
  label?: string;
  // onClick?: () => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "danger";
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  label,
  onClick,
  className = "",
  variant = "default",
}) => {
  // Формируем класс для варианта
  const variantClass = styles[variant] || "";

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${variantClass} ${className} ${
        !onClick ? styles.disabled : ""
      }`}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {label && <span className={styles.label}>{label}</span>}
    </button>
  );
};
