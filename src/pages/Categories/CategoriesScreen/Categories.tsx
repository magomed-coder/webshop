import { OfferCard } from "../OfferCard/OfferCard";

import styles from "./Categories.module.css";
import { Container } from "@/components/shared/Container/Container";
import { Title } from "@/components/shared/Title/Title";
import { useEffect } from "react";
import { useCatalogStore } from "@/contexts/catalog.store";

const Categories = () => {
  const { fetchCategories, categories } = useCatalogStore();

  useEffect(() => {
    // Запрашиваем категории только если их ещё нет (массив пустой)
    if (categories.length === 0) {
      fetchCategories()
        .then((data) => console.log("fetchCategories data", data))
        .catch((err) => console.log("fetchCategories error", err));
    }
  }, [categories, fetchCategories]);

  return (
    <Container>
      <div className={styles.categoryPage}>
        <Title title="Категории" />

        <div>
          <div className={styles.categoriesGrid}>
            {categories.map((item) => (
              <OfferCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Categories;
