// src/components/products/ProductCard.tsx

import { IoPricetagOutline } from "react-icons/io5";
import React from "react";
import styles from "./ProductCard.module.css";
import { Paragraph } from "@/components/shared/Paragraph/Paragraph";
import type { ProductDTO } from "@/types";
import { formatPrice } from "@/lib/utils/formatters";

interface ProductCardProps {
  product: ProductDTO;
  onPress: () => void;
  isLoading: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ product, onPress, isLoading }) => {
    if (isLoading) {
      return (
        <div className={styles.card}>
          <div className={styles.productImageWrapper}>
            <div className={styles.skeletonImage}></div>
          </div>

          <div className={styles.skeletonText}></div>

          <div className={styles.productMetaRow}>
            <div className={styles.priceBlock}>
              <div className={styles.skeletonPrice}></div>
            </div>
          </div>
        </div>
      );
    }

    const secondaryImage =
      product.images.find((img) => !img.is_main) || product.images[0];

    return (
      <div className={styles.card} onClick={onPress}>
        <div className={styles.productImageWrapper}>
          <img
            src={secondaryImage.image}
            alt={product.title}
            className={styles.productImage}
          />
        </div>

        <Paragraph variant="u500.15" className={styles.productName}>
          {product.title}
        </Paragraph>

        <div className={styles.productMetaRow}>
          <div className={styles.priceBlock}>
            <div className={styles.priceItem}>
              <IoPricetagOutline size={14} color="#6B7280" />
              <Paragraph variant="u500.14" className={styles.priceText}>
                {formatPrice(product.price)}₽
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";
