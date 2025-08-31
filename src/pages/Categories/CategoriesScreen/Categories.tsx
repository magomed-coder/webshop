import { OfferCard } from "../OfferCard/OfferCard";

import styles from "./Categories.module.css";
import { CATEGORIES } from "constants/data";
import { Container } from "@components/UI/Container/Container";
import { Title } from "@components/UI/Title/Title";

const Categories = () => {
  return (
    <Container>
      <div className={styles.categoryPage}>
        <Title title="Категории" />

        <div>
          <div className={styles.categoriesGrid}>
            {CATEGORIES.map((item) => (
              <OfferCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Categories;
