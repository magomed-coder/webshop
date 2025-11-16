// src/components/Loader/Loader.tsx
import { Paragraph } from "../Paragraph/Paragraph";
import styles from "./Loader.module.css";

interface LoaderProps {
  text?: string;
  size?: number; // px
  border?: number; // px — толщина линии
}

export const Loader = ({
  text = "Загрузка…",
  size = 48,
  border = 5,
}: LoaderProps) => {
  return (
    <div className={styles.loader_wrapper}>
      <div
        className={styles.loader}
        style={{
          width: size,
          height: size,
          borderWidth: border,
        }}
      />
      {text && <Paragraph>{text}</Paragraph>}
    </div>
  );
};
