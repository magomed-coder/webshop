import { CatalogService } from "@/services/catalog.service";
import type { CategoryDTO, ProductDTO } from "@/types";
import { create } from "zustand";

interface CatalogState {
  /** Список категорий каталога (как приходит с backend) */
  categories: CategoryDTO[];
  /** Список активных продуктов каталога */
  products: ProductDTO[];
  /** Текущая выбранная категория (детальный запрос) */
  currentCategory: CategoryDTO | null;
  /** Текущий выбранный продукт (детальный запрос) */
  currentProduct: ProductDTO | null;
  /** Глобальный флаг загрузки для каталога */
  isLoading: boolean;
  /** Текст последней ошибки (если запрос упал) */
  error: string | null;
  /** Загружает список всех категорий */
  fetchCategories: () => Promise<void>;
  /** Загружает одну категорию по id */
  fetchCategory: (id: number) => Promise<void>;
  /** Загружает список всех активных продуктов */
  fetchProducts: () => Promise<ProductDTO[]>;
  /** Загружает один продукт по id */
  fetchProduct: (id: number) => Promise<void>;
  /** Очищает текущую выбранную категорию */
  clearCurrentCategory: () => void;
  /** Очищает текущий выбранный продукт */
  clearCurrentProduct: () => void;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  categories: [],
  products: [],

  currentCategory: null,
  currentProduct: null,

  isLoading: false,
  error: null,

  /**
   * Загружает список категорий каталога.
   * Используется на главном экране и в фильтрах.
   * При ошибке сохраняет сообщение и пробрасывает исключение выше.
   */
  fetchCategories: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await CatalogService.getCategories();

      set({ categories: res.data });
    } catch (err: any) {
      set({
        error:
          err.response?.data?.detail ??
          err.response?.data?.message ??
          "[Failed to load categories]",
      });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Загружает детальную информацию по категории.
   * Обычно вызывается при переходе на экран категории.
   */
  fetchCategory: async (id: number) => {
    set({ isLoading: true, error: null });

    try {
      const res = await CatalogService.getCategory(id);
      set({ currentCategory: res.data });
    } catch (err: any) {
      set({
        error:
          err.response?.data?.detail ??
          err.response?.data?.message ??
          "Failed to load category",
      });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Загружает список всех активных продуктов.
   * Используется на главном экране каталога.
   */
  fetchProducts: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await CatalogService.getProducts();
      set({ products: res.data });
      return res.data;
    } catch (err: any) {
      set({
        error:
          err.response?.data?.detail ??
          err.response?.data?.message ??
          "Failed to load products",
      });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Загружает детальную информацию по продукту.
   * Используется при переходе на экран продукта.
   */
  fetchProduct: async (id: number) => {
    set({ isLoading: true, error: null });

    try {
      const res = await CatalogService.getProduct(id);
      set({ currentProduct: res.data });
    } catch (err: any) {
      set({
        error:
          err.response?.data?.detail ??
          err.response?.data?.message ??
          "Failed to load product",
      });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Сбрасывает выбранную категорию.
   * Обычно вызывается при уходе со страницы категории.
   */
  clearCurrentCategory: () => set({ currentCategory: null }),

  /**
   * Сбрасывает выбранный продукт.
   * Используется при навигации назад или смене контекста.
   */
  clearCurrentProduct: () => set({ currentProduct: null }),
}));
