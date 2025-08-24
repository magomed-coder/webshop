import { OfferCard } from "../OfferCard/OfferCard";
import { Paragraph } from "@components/UI/Paragraph/Paragraph";

import styles from "./Categories.module.css";
import { CATEGORIES } from "constants/data";

const Categories = () => {
  return (
    <div className={styles.categoryPage}>
      <div className={styles.categoryHeader}>
        <Paragraph>Категории</Paragraph>
      </div>

      <div className={styles.categoryContainer}>
        <div className={styles.categoriesGrid}>
          {CATEGORIES.map((item, index) => (
            <OfferCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
