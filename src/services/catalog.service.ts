import { ENDPOINTS } from "@/constants/main";
import { api } from "@/lib/api";
import type { CategoryDTO, ProductDTO } from "@/types";
import type { AxiosResponse } from "axios";

export const CatalogService = {
  /**
   * Получить все категории
   */
  getCategories: (): Promise<AxiosResponse<CategoryDTO[]>> =>
    api.get(ENDPOINTS.CATALOG.CATEGORIES),

  /**
   * Получить детали категории по ID
   */
  getCategory: (id: number): Promise<AxiosResponse<CategoryDTO>> =>
    api.get(ENDPOINTS.CATALOG.CATEGORY_DETAIL(id)),

  /**
   * Получить все продукты
   */
  getProducts: (): Promise<AxiosResponse<ProductDTO[]>> =>
    api.get(ENDPOINTS.CATALOG.PRODUCTS),

  /**
   * Получить детали продукта по ID
   */
  getProduct: (id: number): Promise<AxiosResponse<ProductDTO>> =>
    api.get(ENDPOINTS.CATALOG.PRODUCT_DETAIL(id)),
};
