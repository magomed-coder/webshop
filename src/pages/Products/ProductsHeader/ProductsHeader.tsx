// src/components/products/ProductsHeader.tsx
import React from "react";
import { IoOptionsOutline } from "react-icons/io5";
import styles from "./ProductsHeader.module.css";
import { Title } from "@components/UI/Title/Title";

interface HeaderProps {
  title?: string;
  onOpenFilters?: () => void;
  isLoading?: boolean;
}

export const ProductsHeader: React.FC<HeaderProps> = ({
  title,
  onOpenFilters,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonButton}></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Title title={title || ""} className={styles.title} />
      <button onClick={onOpenFilters} className={styles.filterButton}>
        <IoOptionsOutline size={24} color="#333" />
      </button>
    </div>
  );
};
