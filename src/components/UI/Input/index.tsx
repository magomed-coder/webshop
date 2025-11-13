// src/components/ui/Input/Input.tsx
import React from "react";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightIcon?: React.ReactNode;
  onIconClick?: () => void;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  iconContainerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  rightIcon,
  onIconClick,
  containerClassName,
  labelClassName,
  inputClassName,
  iconContainerClassName,
  ...rest
}) => {
  return (
    <div className={`${styles.wrapper} ${containerClassName || ""}`}>
      {label && (
        <label className={`${styles.label} ${labelClassName || ""}`}>
          {label}
        </label>
      )}

      <div className={`${styles.container} ${error ? styles.error : ""}`}>
        <input
          className={`${styles.input} ${inputClassName || ""}`}
          {...rest}
        />
        {rightIcon && (
          <button
            type="button"
            className={`${styles.iconContainer} ${
              iconContainerClassName || ""
            }`}
            onClick={onIconClick}
          >
            {rightIcon}
          </button>
        )}
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
