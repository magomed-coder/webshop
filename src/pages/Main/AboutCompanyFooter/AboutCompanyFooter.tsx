// src/components/MainScreen/AboutCompanyFooter.tsx
import { useNavigate } from "react-router-dom";
import React from "react";
import styles from "./AboutCompanyFooter.module.css";
import { Paragraph } from "@/components/shared/Paragraph/Paragraph";
import { MdArrowForward, MdShare } from "react-icons/md";
import { IoCashOutline, IoPeopleOutline } from "react-icons/io5";

export const AboutCompanyFooter: React.FC = () => {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate("/about");
  };

  return (
    <div className={styles.container}>
      <Paragraph variant="u700.16" className={styles.title}>
        Делись. Рекомендуй. Зарабатывай.
      </Paragraph>

      <div className={styles.benefitsContainer}>
        <div className={styles.benefitItem}>
          <MdShare size={24} color="#4B5563" />
          <Paragraph variant="r700.14" className={styles.benefitText}>
            Делись товарами
          </Paragraph>
        </div>

        <div className={styles.benefitItem}>
          <IoPeopleOutline size={24} color="#28303E" />
          <Paragraph variant="r700.14" className={styles.benefitText}>
            Приводи друзей
          </Paragraph>
        </div>

        <div className={styles.benefitItem}>
          <IoCashOutline size={24} color="#28303E" />
          <Paragraph variant="r700.14" className={styles.benefitText}>
            Получай бонусы
          </Paragraph>
        </div>
      </div>

      <div className={styles.button} onClick={goToAbout}>
        <div className={styles.buttonTextWrapper}>
          <Paragraph variant="u700.14" className={styles.buttonText}>
            Начать зарабатывать
          </Paragraph>
          <MdArrowForward size={17} color="white" />
        </div>
      </div>
    </div>
  );
};
