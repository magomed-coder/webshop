// src/pages/ProductListScreen.tsx
import { useParams, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";

import { MdSearchOff } from "react-icons/md";
import styles from "./ProductsScreen.module.css";
import FilterModal from "../FilterModal/FilterModal";
import { ProductCard } from "../ProductCard/ProductCard";
import { skeletonProducts } from "@/constants/data";
import { getCategoryTitle } from "@/lib/utils/category.utils";
import { Paragraph } from "@/components/shared/Paragraph/Paragraph";
import { fetchProductsByCategory } from "@/services/productService";
import { LOCATIONS } from "@/constants/main";
import type { CategoryNameValue, FilterType, Product } from "@/types";
import { ProductsHeader } from "../ProductsHeader/ProductsHeader";
import { Container } from "@/components/shared/Container/Container";

const ProductListScreen: React.FC = () => {
  const { categoryName } = useParams<{
    categoryName: CategoryNameValue;
  }>();
  const navigate = useNavigate();

  /* ----------------------------- State & Refs ----------------------------- */
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterType>({
    minPrice: "",
    maxPrice: "",
    sortBy: "default",
    withExtraBonus: false,
  });
  const [selectedLocations, setSelectedLocations] = useState<any[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  /* ----------------------------- Handlers ----------------------------- */

  const openFilters = useCallback(() => {
    setIsFilterModalOpen(true);
  }, []);

  const closeFilters = useCallback(() => {
    setIsFilterModalOpen(false);
  }, []);

  const applyFilters = useCallback(() => {
    let result = [...products];

    if (filters.minPrice) {
      const min = parseFloat(filters.minPrice);
      result = result.filter((p) => p.price >= min);
    }

    if (filters.maxPrice) {
      const max = parseFloat(filters.maxPrice);
      result = result.filter((p) => p.price <= max);
    }

    if (filters.withExtraBonus) {
      result = result.filter((p) => (p.extraBonus ?? 0) > 0);
    }

    switch (filters.sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "referral_desc":
        result.sort((a, b) => (b.extraBonus ?? 0) - (a.extraBonus ?? 0));
        break;
      case "referral_asc":
        result.sort((a, b) => (a.extraBonus ?? 0) - (b.extraBonus ?? 0));
        break;
      default:
        break;
    }

    setVisibleProducts(result);
    closeFilters();
  }, [filters, products, closeFilters]);

  const resetFilters = useCallback(() => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      sortBy: "default",
      withExtraBonus: false,
    });
    setVisibleProducts(products);
  }, [products]);

  const openProduct = useCallback(
    (id: number) => {
      navigate(`/products/${categoryName}/${id}`);
    },
    [navigate]
  );

  const toggleLocation = useCallback((item: any) => {
    setSelectedLocations((prev) => {
      const exists = prev.some((p) => p.key === item.key);
      if (exists) return prev.filter((p) => p.key !== item.key);
      return [...prev, item];
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectedLocations.length === LOCATIONS.length) setSelectedLocations([]);
    else setSelectedLocations(LOCATIONS.slice());
  }, [selectedLocations.length]);

  /* ----------------------------- Effect on data load ----------------------------- */

  useEffect(() => {
    if (!categoryName) return;

    setIsLoading(true);
    fetchProductsByCategory(categoryName).then((data) => {
      setProducts(data);
      setVisibleProducts(data);
      setIsLoading(false);
    });
  }, [categoryName]);

  /* ----------------------------- Render states ----------------------------- */

  const categoryTitle = getCategoryTitle(categoryName || "") || "Категория";
  console.log(categoryName, categoryTitle);

  if (!products.length && !isLoading) {
    return (
      <div className={styles.screen}>
        <ProductsHeader
          title={categoryTitle}
          onOpenFilters={openFilters}
          isLoading={isLoading}
        />
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIconContainer}>
            <MdSearchOff size={96} color="#9CA3AF" />
          </div>
          <Paragraph variant="u500.16" className={styles.emptyStateTitle}>
            Товары не найдены
          </Paragraph>
          <Paragraph variant="u400.14" className={styles.emptyStateText}>
            Попробуйте изменить параметры фильтрации или выберите другую
            категорию
          </Paragraph>
        </div>
      </div>
    );
  }

  return (
    <Container>
      <ProductsHeader
        title={categoryTitle}
        onOpenFilters={openFilters}
        isLoading={isLoading}
      />
      <div className={styles.productsWrapper}>
        <div className={styles.productsContainer}>
          {(isLoading ? skeletonProducts : visibleProducts).map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onPress={() => openProduct(item.id)}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={closeFilters}
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
        selectedLocations={selectedLocations}
        onToggleLocation={toggleLocation}
        onToggleSelectAll={toggleSelectAll}
      />
    </Container>
  );
};

export default ProductListScreen;
