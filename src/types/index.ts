/**
 * Перечисление возможных идентификаторов категорий.
 */
export const CategoryName = {
  RealEstate: "real_estate",
  AutoParts: "auto_parts",
  BuildingMaterials: "building_materials",
  PhonesAndComputers: "phones_and_computers",
  Perfume: "perfume",
  Furniture: "furniture",
  SportsNutrition: "sports_nutrition",
} as const;

export type CategoryName = keyof typeof CategoryName; // "RealEstate" | "AutoParts"
// или
export type CategoryNameValue =
  (typeof CategoryName)[keyof typeof CategoryName];

/**
 * Описание структуры категории.
 */
export interface Category {
  id: number;
  title: string;
  name: CategoryNameValue;
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
  category: CategoryNameValue; // Категория товара, соответствует enum
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
export interface ReferralStats {
  productId: number;
  productName: string;
  clicks: number;
  transactions: number;
  totalEarnings: number;
  images: string[];
}
