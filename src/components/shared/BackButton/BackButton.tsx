import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import React, { memo } from "react";
import styles from "./BackButton.module.css";

type Props = {
  to?: string; // конкретный путь (если нужно перейти)
  fallback?: string; // fallback маршрут (если истории нет)
  className?: string; // кастомные стили
};

const BackButton: React.FC<Props> = ({ to, fallback = "/", className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button
      className={`${styles.backButton} ${className || ""}`}
      onClick={handleClick}
      aria-label="Назад"
    >
      <IoChevronBack size={24} />
    </button>
  );
};

export default memo(BackButton);
