// export const fetchProductsByCategory = async (category: CategoryName) => {
//   return new Promise((resolve) =>
//     setTimeout(() => resolve(mockProducts[category] || []), 500)
//   );
// };

import { mockProducts } from "@/constants/data";
import type { CategoryName, ReferralStats } from "@/types";

export const fetchProductsByCategory = async (
  category?: CategoryName
): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!category) {
        // Return all products
        const allProducts = Object.values(mockProducts).flat();
        resolve(allProducts);
      } else {
        resolve(mockProducts[category] || []);
      }
    }, 5000);
  });
};

export const fetchProductById = async (productId: number) => {
  const all = Object.values(mockProducts).flat();
  const product = all.find((p) => p.id === productId);
  return new Promise((resolve) => setTimeout(() => resolve(product), 5000));
};

export const fetchPopularProducts = async (
  category?: CategoryName
): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!category) {
        const allProducts = Object.values(mockProducts)
          .flat()
          .filter((p) => p.isPromo);
        resolve(allProducts);
      } else {
        const categoryProducts = (mockProducts[category] || []).filter(
          (p) => p.isPromo
        );
        resolve(categoryProducts);
      }
    }, 5000);
  });
};

export const generateMockReferralStats = (
  limit: number = 10
): Promise<ReferralStats[]> => {
  const allProducts = Object.values(mockProducts).flat();
  return new Promise((resolve) => {
    setTimeout(() => {
      const statsProducts = allProducts
        .map((product) => ({
          productId: product.id,
          productName: product.name,
          images: product.images,
          clicks: Math.floor(Math.random() * 100), // Random clicks (0-99)
          transactions: Math.floor(Math.random() * 10), // Random transactions (0-9)
          totalEarnings: product.referralBonus * Math.floor(Math.random() * 10),
        }))
        .slice(0, limit);

      resolve(statsProducts);
    }, 5000);
  });
};
