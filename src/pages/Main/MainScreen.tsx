import React, { useRef } from "react";
import styles from "./MainScreen.module.css";
import { Container } from "@components/UI/Container/Container";
import { Title } from "@components/UI/Title/Title";
import { OfferCard } from "../Categories/OfferCard/OfferCard";
import { CATEGORIES } from "constants/data";
import { ShowMoreCard } from "./ShowMoreCard/ShowMoreCard";
import { AboutCompanyFooter } from "./AboutCompanyFooter/AboutCompanyFooter";

// Максимальное количество категорий для отображения
const MAX_VISIBLE_CATEGORIES = 5;

const categoryData = () => {
  // Если категорий больше максимума - добавляем кнопку "Все категории"
  if (CATEGORIES.length > MAX_VISIBLE_CATEGORIES) {
    return [
      ...CATEGORIES.slice(0, MAX_VISIBLE_CATEGORIES),
      { id: "show-more", type: "show-more" },
    ];
  }
  return CATEGORIES;
};

const MainScreen: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);
  // const [isLoading] = useState(false);

  // Рендер элемента списка
  const renderItem = (item: any) => {
    // Для кнопки "Показать все"
    if (item.type === "show-more") {
      return <ShowMoreCard key={item.id} />;
    }
    // Для обычной категории
    return <OfferCard key={item.id} item={item} />;
  };

  return (
    <Container>
      <div className={styles.content}>
        <Title title="Категории" className={styles.categoriesTitle} />

        <div className={styles.categoriesGrid} ref={listRef}>
          {categoryData().map((item) => renderItem(item))}
        </div>

        <div className={styles.footerComponent}>
          <AboutCompanyFooter />
        </div>
      </div>
    </Container>
  );
};

export default MainScreen;
