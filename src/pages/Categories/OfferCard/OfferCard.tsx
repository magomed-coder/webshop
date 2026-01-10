// src/components/categories/OfferCard.tsx
import { useNavigate } from "react-router-dom";
import React from "react";
import styles from "./OfferCard.module.css";
import { Paragraph } from "@/components/shared/Paragraph/Paragraph";
import type { Category } from "@/types";

interface OfferCardProps {
  item: Category;
}

export const OfferCard: React.FC<OfferCardProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${encodeURIComponent(item.name)}`);
  };

  return (
    <div
      className={styles.offerCard}
      style={{ backgroundColor: item.color }}
      onClick={handleClick}
    >
      <div className={styles.imageContainer}>
        <img src={item.image} alt={item.title} className={styles.image} />
      </div>
      <div className={styles.infoContainer}>
        <Paragraph variant="u500.12" className={styles.title}>
          {item.title}
        </Paragraph>
      </div>
    </div>
  );
};
