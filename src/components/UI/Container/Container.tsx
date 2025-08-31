import React from "react";
import styles from "./Container.module.css";
import { useIsMobile } from "hooks/useIsMobile";

type ContainerProps = {
  children: React.ReactNode;
};

export const Container: React.FC<ContainerProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`
        ${styles.container} ${isMobile ? "mobile-content" : "desktop-content"}`}
    >
      {children}
    </div>
  );
};
