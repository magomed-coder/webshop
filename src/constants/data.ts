import building_3 from "@/assets/images/building_3.png";
import car_1 from "@/assets/images/car_1.png";
import concrete_2_mixer from "@/assets/images/concrete_2_mixer-truck-chute-metal.png";
import electronics_1_phone from "@/assets/images/electronics_1_phone.png";
import furniture_1_sofa from "@/assets/images/furniture_1_sofa.png";
// import perfume_2 from "assets/images/perfume_2.png";
import perfume_2 from "@/assets/images/perfume_2.png";

import sports_nutrition from "@/assets/images/sports_nutrition.png";
import { CategoryName, type Category, type Product } from "@/types";

export const images = {
  building_3,
  car_1,
  concrete_2_mixer,
  electronics_1_phone,
  furniture_1_sofa,
  perfume_2,
  sports_nutrition,
};

export const CATEGORIES: Category[] = [
  {
    id: 1,
    title: "Недвижимость",
    name: CategoryName.RealEstate,
    image: building_3,
    color: "#678287",
  },
  {
    id: 2,
    title: "Автомобили\nи запчасти",
    name: CategoryName.AutoParts,
    image: car_1,
    color: "#A1AEB4",
  },
  {
    id: 3,
    title: "Строймате-\nриалы",
    name: CategoryName.BuildingMaterials,
    image: concrete_2_mixer,
    color: "#D3CFC6",
  },
  {
    id: 4,
    title: "Телефоны\nи компьютеры",
    name: CategoryName.PhonesAndComputers,
    image: electronics_1_phone,
    color: "#264352",
  },
  {
    id: 5,
    title: "Духи\nи косметика",
    name: CategoryName.Perfume,
    image: perfume_2,
    color: "#717499",
  },
  {
    id: 6,
    title: "Мебель\nи аксессуары",
    name: CategoryName.Furniture,
    image: furniture_1_sofa,
    color: "#6D9672",
  },
  {
    id: 7,
    title: "Спортивное\nпитание",
    name: CategoryName.SportsNutrition,
    image: sports_nutrition,
    color: "#839ABB",
  },
];

/**
 * Замените эти константы на реальные данные вашей поддержки:
 * - WHATSAPP_PHONE: номер в международном формате без знака "+" и без пробелов, например "79161234567" для +7 916 123-45-67
 * - TELEGRAM_USERNAME: ник в telegram без "@", например "my_support_bot" или "my_support"
 * - DEFAULT_MESSAGE: сообщение которое подставится в чат
 */
export const WHATSAPP_PHONE = "79899149391";
export const TELEGRAM_USERNAME = "thesoundofgoodbye";
export const DEFAULT_MESSAGE = "Здравствуйте! Нужна помощь с приложением.";

// динамические данные
export const IMAGES = [
  "https://images.unsplash.com/photo-1566895291281-ea63efd4bdbc?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fDklM0ExNnxlbnwwfHwwfHx8MA%3D%3D",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToKf50vTauqHg1KzyOqiMLUU0EcTvvvrO3uQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqAS2TRnoim97tqvP0IzCuQxXjJxZEBap7zw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6oXkR5VjWbZ3cnP0bxzzpzVQkpHdOOzG5cw&s",
  "https://images.unsplash.com/photo-1597573337211-e1080012b84b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fDklM0ExNnxlbnwwfHwwfHx8MA%3D%3D",
  "https://media.istockphoto.com/id/1292896611/photo/kogelbay-rugged-coast-line-with-spectacular-mountains-with-copy-space.jpg?s=612x612&w=0&k=20&c=PtBDbwoLldClx-vRSZLzrh0THXTPrY3e6ZD8gK7sdEQ=",
];

export const PORDUCTS_IMGS = [
  "https://i.pinimg.com/736x/38/09/16/380916b7ee4e9f9e598acf531a6513f7.jpg",
  "https://i.pinimg.com/736x/f4/0d/0e/f40d0eea06f917372beddf4350f27fc4.jpg",
  "https://i.pinimg.com/1200x/02/e0/9c/02e09cdee76123ad692012f575021999.jpg",
  "https://i.pinimg.com/1200x/7d/32/82/7d3282ee454622cb5d9c8475f1ba3639.jpg",
  "https://i.pinimg.com/736x/96/a2/47/96a247ece5eac7a003df80dcc6699ce1.jpg",
  "https://i.pinimg.com/736x/fa/b6/0b/fab60b5e517d9851e187323b71d8d508.jpg",
  "https://i.pinimg.com/736x/7f/76/fd/7f76fd3ec1d7331b166bd0e973d06c3f.jpg",
  "https://i.pinimg.com/736x/b5/9e/02/b59e02a1c2840f4b9c5f83d380d175d3.jpg",
  "https://i.pinimg.com/736x/11/a9/65/11a965a029822ffca347faff9ea0ac3b.jpg",
  "https://i.pinimg.com/1200x/4c/9f/8b/4c9f8beb414e556badb9bb9a8d684533.jpg",
  "https://i.pinimg.com/1200x/be/37/7c/be377cbb5213d798af895f508eebd58d.jpg",
  "https://i.pinimg.com/1200x/26/04/48/2604487ef6fd8922c88eb31887a5db9f.jpg",
  "https://i.pinimg.com/1200x/3f/0c/ec/3f0cec9e359003d87af79d124b3591a9.jpg",
  "https://i.pinimg.com/736x/37/9a/96/379a963f5c8f4a7bf0f5159ab13245ec.jpg",
  "https://i.pinimg.com/736x/08/fb/53/08fb53d38c9b4e5b4eddbb40fdab333c.jpg",
  "https://i.pinimg.com/736x/0a/6d/2f/0a6d2f15613b43476930316115d148a0.jpg",
  "https://i.pinimg.com/1200x/d7/1c/4a/d71c4abd7cdf14306e84b953decac987.jpg",
  "https://i.pinimg.com/1200x/41/ef/bf/41efbff178a8c74bfb7f211e2035f016.jpg",
  "https://i.pinimg.com/1200x/9a/e7/e5/9ae7e5d440a4d2e7c668a776189b8349.jpg",
  "https://i.pinimg.com/1200x/08/ee/0a/08ee0a969ecd233aa048cc074981514f.jpg",
  "https://i.pinimg.com/736x/e3/04/21/e304215d4811cc60954b155f4ac439be.jpg",
  "https://i.pinimg.com/1200x/b1/60/59/b160597a96f54eb22f9c4d0f26f7887c.jpg",
];

/**
 * Словарь продуктов по категории.
 */

/**
 * Генерация массива mock товаров для категории.
 * @param categoryKey Числовой префикс для id (1–7 соответствует категории)
 * @param baseUrl Базовый URL для изображений
 */
/**
 * Генерация массива mock товаров для категории.
 * @param categoryKey Числовой префикс для id (1–7 соответствует категории)
 * @param baseUrl Базовый URL для изображений
 */
function generateMockProducts(categoryKey: number): Product[] {
  // Определяем категорию по ключу
  const categoryValues = Object.values(CategoryName) as CategoryName[];
  const category = categoryValues[categoryKey - 1];

  return Array.from({ length: 30 }, (_, idx) => {
    const id = categoryKey * 100 + idx + 1;
    const inStock = Math.random() > 0.2; // в 80% случаев в наличии

    // Генерация реферального бонуса (3-15% от цены товара)
    const price = Math.floor(Math.random() * 10_0000_000) + 50;
    const referralBonusPercentage = Math.floor(Math.random() * 13) + 3; // 3-15%
    const referralBonus = Math.round(
      (price * referralBonusPercentage) / 10_000
    );

    // НОВОЕ: extra referral — дополнительный бонус (например 0–7%)
    const extraReferralPercentage = Math.floor(Math.random() * 8); // 0-7%
    const extraBonus = Math.round((price * extraReferralPercentage) / 100_000);

    // 5 случайных картинок
    const images = Array.from(
      { length: 5 },
      () => PORDUCTS_IMGS[Math.floor(Math.random() * PORDUCTS_IMGS.length)]
    );

    // Новое поле
    const isPromo = Math.random() < 0.1; // 10% товаров будут популярными

    // const discount = Math.floor(Math.random() * 50); // скидка до 49%
    // const rating = +(Math.random() * 4 + 1).toFixed(1); // рейтинг 1.0–5.0
    // const reviewsCount = Math.floor(Math.random() * 500); // до 499 отзывов
    // const sku = `SKU-${id}`;

    return {
      id,
      price,
      referralBonus,
      extraBonus,
      images,
      inStock,
      category,
      isPromo,
      description: `Подробное описание товара ${id}. Это качественный продукт с отличными характеристиками и долгим сроком службы.`,
      referralUrl: IMAGES[Math.floor(Math.random() * IMAGES.length)],
      name: `Товартоварто${id}`,

      // discount,
      // rating,
      // reviewsCount,
      // sku,
    };
  });
}

/**
 * Словарь продуктов по категории (30 товаров в каждой).
 */
export const mockProducts: Record<CategoryName, Product[]> = {
  [CategoryName.RealEstate]: generateMockProducts(1),
  [CategoryName.AutoParts]: generateMockProducts(2),
  [CategoryName.BuildingMaterials]: generateMockProducts(3),
  [CategoryName.PhonesAndComputers]: generateMockProducts(4),
  [CategoryName.Perfume]: generateMockProducts(5),
  [CategoryName.Furniture]: generateMockProducts(6),
  [CategoryName.SportsNutrition]: generateMockProducts(7),
};

export const skeletonProducts: Product[] = Array.from({ length: 8 }).map(
  (_, i) => ({
    id: i,
    name: "",
    price: 0,
    images: ["", ""],
    description: "",
    referralUrl: "",
    referralBonus: 0,
    extraBonus: 0,
    category: CategoryName.RealEstate,
    inStock: false,
    isPromo: false,
  })
);
