import { ENDPOINTS } from "@/constants/main";
import { api } from "@/lib/api";

export const CatalogService = {
  getCategories: () => api.get(ENDPOINTS.CATALOG.CATEGORIES),

  getCategory: (id: number) => api.get(ENDPOINTS.CATALOG.CATEGORY_DETAIL(id)),

  getProducts: () => api.get(ENDPOINTS.CATALOG.PRODUCTS),

  getProduct: (id: number) => api.get(ENDPOINTS.CATALOG.PRODUCT_DETAIL(id)),
};
