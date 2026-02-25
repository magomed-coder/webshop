import React, { useRef } from "react";
import styles from "./MainScreen.module.css";
import { Container } from "@/components/shared/Container/Container";
import { Title } from "@/components/shared/Title/Title";
import { OfferCard } from "../Categories/OfferCard/OfferCard";
import { ShowMoreCard } from "./ShowMoreCard/ShowMoreCard";
import { AboutCompanyFooter } from "./AboutCompanyFooter/AboutCompanyFooter";
import type { CategoryDTO } from "@/types";
import { useCategories } from "@/hooks/useQueries";

const MAX_VISIBLE_CATEGORIES = 5;

const categoryData = (
  categories: CategoryDTO[],
): (CategoryDTO | { id: string; type: string })[] => {
  // Если категорий больше максимума - добавляем кнопку "Все категории"
  if (categories.length > MAX_VISIBLE_CATEGORIES) {
    return [
      ...categories.slice(0, MAX_VISIBLE_CATEGORIES),
      { id: "show-more", type: "show-more" },
    ];
  }
  return categories;
};

const MainScreen: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const { data: categories = [] } = useCategories();

  // Рендер элемента списка
  const renderItem = (item: CategoryDTO | { id: string; type: string }) => {
    // Для кнопки "Показать все"
    if ("type" in item && item.type === "show-more") {
      return <ShowMoreCard key={item.id} />;
    }
    // Для обычной категории
    return <OfferCard key={item.id} item={item as CategoryDTO} />;
  };

  return (
    <Container>
      <div className={styles.content}>
        <Title title="Категории" className={styles.categoriesTitle} />

        <div className={styles.categoriesGrid} ref={listRef}>
          {categoryData(categories).map((item) => renderItem(item))}
        </div>

        <div className={styles.footerComponent}>
          <AboutCompanyFooter />
        </div>
      </div>
    </Container>
  );
};

export default MainScreen;
