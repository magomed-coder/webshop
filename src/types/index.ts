/**
 * Перечисление возможных идентификаторов категорий.
 */
export enum CategoryName {
  RealEstate = "real_estate",
  AutoParts = "auto_parts",
  BuildingMaterials = "building_materials",
  PhonesAndComputers = "phones_and_computers",
  Perfume = "perfume",
  Furniture = "furniture",
  SportsNutrition = "sports_nutrition",
}

/**
 * Описание структуры категории.
 */
export interface Category {
  id: number;
  title: string;
  name: CategoryName;
  image: string;
  color: string;
}

/**
 * Описание структуры продукта.
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  referralUrl: string;
  referralBonus: number;
  extraBonus?: number;
  category: CategoryName; // Категория товара, соответствует enum
  inStock: boolean; // Наличие на складе
  isPromo: boolean;

  // Дополнительные поля для карточки товара
  // discount: number; // Скидка в процентах
  // rating: number; // Средний рейтинг (1–5)
  // reviewsCount: number; // Количество отзывов
  // sku: string; // Артикул товара
}

export type FilterType = {
  minPrice: string;
  maxPrice: string;
  sortBy:
    | "default"
    | "price_asc"
    | "price_desc"
    | "referral_desc"
    | "referral_asc";
  withExtraBonus: boolean;
};
