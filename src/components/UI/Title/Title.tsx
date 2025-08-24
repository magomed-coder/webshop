// src/components/ui/Title.tsx
import React from "react";
import styles from "./Title.module.css";

interface TitleProps {
  title: string;
  className?: string;
  center?: boolean;
}

export const Title: React.FC<TitleProps> = ({
  title,
  className = "",
  center = false,
}) => {
  return (
    <h1
      className={`${styles.title} ${center ? styles.center : ""} ${className}`}
    >
      {title}
    </h1>
  );
};
