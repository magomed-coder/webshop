// src/components/categories/OfferCard.tsx
import { useNavigate } from "react-router-dom";
import React from "react";
import styles from "./OfferCard.module.css";
import { Paragraph } from "@/components/shared/Paragraph/Paragraph";
import type { CategoryDTO } from "@/types";

interface OfferCardProps {
  item: CategoryDTO;
}

export const OfferCard: React.FC<OfferCardProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${encodeURIComponent(item.id)}`);
  };

  return (
    <div
      className={styles.offerCard}
      style={{ backgroundColor: item.backgroundColor }}
      onClick={handleClick}
    >
      <div className={styles.imageContainer}>
        <img
          src={item.images[0].image}
          alt={item.name}
          className={styles.image}
        />
      </div>
      <div className={styles.infoContainer}>
        <Paragraph variant="u500.12" className={styles.title}>
          {item.name}
        </Paragraph>
      </div>
    </div>
  );
};
