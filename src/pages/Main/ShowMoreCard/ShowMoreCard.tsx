// src/components/categories/ShowMoreCard.tsx

import { useNavigate } from "react-router-dom";
import React from "react";
import styles from "./ShowMoreCard.module.css";
import { Paragraph } from "@components/UI/Paragraph/Paragraph";
import { MdArrowForward } from "react-icons/md";

export const ShowMoreCard: React.FC = () => {
  const navigate = useNavigate();

  const handleShowMore = () => {
    navigate("/categories");
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.moreButton} onClick={handleShowMore}>
        <div className={styles.infoContainer}>
          <Paragraph variant="u500.12" className={styles.title}>
            Все категории
          </Paragraph>
        </div>
        <div className={styles.moreButtonCircle}>
          <MdArrowForward size={40} color="white" />
        </div>
      </div>
    </div>
  );
};
