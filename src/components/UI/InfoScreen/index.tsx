// src/components/UI/InfoScreen/InfoScreen.tsx
import React from "react";
import styles from "./InfoScreen.module.css";
import { Paragraph } from "@components/UI/Paragraph/Paragraph";
import { Button } from "@components/UI/Button";

interface InfoScreenProps {
  icon?: React.ReactNode;
  title: string;
  text?: string;
  buttonLabel?: string;
  buttonIcon?: React.ReactNode;
  onButtonClick?: () => void;
  className?: string;
}

export const InfoScreen: React.FC<InfoScreenProps> = ({
  icon,
  title,
  text,
  buttonLabel,
  buttonIcon,
  onButtonClick,
  className,
}) => {
  return (
    <div className={`${styles.infoScreen} ${className || ""}`}>
      <div className={styles.container}>
        {icon && <div className={styles.iconWrapper}>{icon}</div>}

        <Paragraph variant="u500.16" className={styles.title}>
          {title}
        </Paragraph>

        {text && (
          <Paragraph variant="u400.14" className={styles.text}>
            {text}
          </Paragraph>
        )}

        {buttonLabel && onButtonClick && (
          <Button
            icon={buttonIcon}
            label={buttonLabel}
            onClick={onButtonClick}
            className={styles.button}
            variant="primary"
          />
        )}
      </div>
    </div>
  );
};
