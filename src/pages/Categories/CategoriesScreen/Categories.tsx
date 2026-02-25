import { OfferCard } from "../OfferCard/OfferCard";

import styles from "./Categories.module.css";
import { Container } from "@/components/shared/Container/Container";
import { Title } from "@/components/shared/Title/Title";
import { useCategories } from "@/hooks/useQueries";

const Categories = () => {
  const { data: categories = [] } = useCategories();

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
