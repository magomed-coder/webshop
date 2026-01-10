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

// ===== Images =====
export interface ImageDTO {
  id: number;
  image: string;
  is_main: boolean;
  position: number;
}

// ===== Categories =====
export interface CategoryDTO {
  id: number;
  name: string;
  slug: string;
  images: ImageDTO[];
}

// ===== Products =====
export interface ProductDTO {
  id: number;
  title: string;
  description: string;
  price: string; // деньги — строка
  is_active: boolean;

  bonus: string;
  extra_bonus: string | null;
  total_bonus: string;

  category: number;
  category_name: string;

  images: ImageDTO[];
  // нет
  isPromo: boolean;
}

export interface CreateOrderDTO {
  referral_code: string | null;
  customer_name: string;
  customer_phone: string;
  comment?: string;
}

/** Ответ сервера после создания заказа */
export interface OrderDTO {
  id: number;
  referral_code: string;
  customer_name: string;
  customer_phone: string;
  comment?: string;
  status: string;
  created_at: string;
}

export interface ReferralLinkDTO {
  id: number;
  product_id: number;
  referral_code: string;
  status: string;
  created_at: string;
}

/** Заказ, пришедший по реферальной ссылке */
export interface ReferralOrderDTO {
  id: number;
  referral_code: string;
  customer_name: string;
  customer_phone: string;
  status: string;
  created_at: string;
}

/** Payload для создания реферальной ссылки */
export interface CreateReferralLinkDTO {
  product_id: number;
}

export interface PublicReferralRedirectDTO {
  product_id: number;
  product_title: string;
  referral_code: string;
}
