import { QUERY_KEYS, STALE_TIME } from "@/constants/main";
import { useAuthStore } from "@/contexts/auth.store";
import { CatalogService } from "@/services/catalog.service";
import { ReferralService } from "@/services/referral.service";
import type {
  CategoryDTO,
  ProductDTO,
  ReferralLinkDTO,
  ReferralOrderDTO,
} from "@/types";
import { useQuery } from "@tanstack/react-query";

// Хук для получения реферальных ссылок
export const useReferralLinks = () => {
  const { user } = useAuthStore();

  return useQuery<ReferralLinkDTO[]>({
    queryKey: QUERY_KEYS.REFERRAL_LINKS(user?.id),
    queryFn: async () => {
      const response = await ReferralService.getMyLinks();
      return response.data;
    },
    enabled: !!user,
    staleTime: STALE_TIME.SHORT,
    refetchOnWindowFocus: true,
  });
};

// Хук для получения реферальных заказов
export const useReferralOrders = () => {
  const { user } = useAuthStore();

  return useQuery<ReferralOrderDTO[]>({
    queryKey: QUERY_KEYS.REFERRAL_ORDERS(user?.id),
    queryFn: async () => {
      const response = await ReferralService.getMyOrders();
      return response.data;
    },
    enabled: !!user,
    staleTime: STALE_TIME.SHORT,
    refetchOnWindowFocus: true,
  });
};

// Хук для получения продуктов
export const useProducts = () => {
  return useQuery<ProductDTO[]>({
    queryKey: QUERY_KEYS.PRODUCTS,
    queryFn: async () => {
      const response = await CatalogService.getProducts();
      return response.data;
    },
    staleTime: STALE_TIME.HOUR,
    refetchOnWindowFocus: true,
  });
};

// Хук для получения продуктов по категории
export const useProductsByCategory = (categoryId: number) => {
  const productsQuery = useProducts();

  const filteredProducts = (productsQuery.data || []).filter(
    (p) => p.category === categoryId,
  );

  return {
    products: filteredProducts,
    allProducts: productsQuery.data || [],
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,
    error: productsQuery.error,
    refetch: productsQuery.refetch,
  };
};

// Хук для получения одного продукта по ID
export const useProduct = (productId: number) => {
  const productsQuery = useProducts();

  // Сначала пытаемся найти в кэше всех продуктов
  const cachedProduct = (productsQuery.data || []).find(
    (p) => p.id === productId,
  );

  // Если нет в кэше — делаем отдельный запрос
  const productQuery = useQuery<ProductDTO>({
    queryKey: QUERY_KEYS.PRODUCT(productId),
    queryFn: async () => {
      const response = await CatalogService.getProduct(productId);
      return response.data;
    },
    enabled: !cachedProduct && !!productId,
    staleTime: STALE_TIME.LONG,
  });

  return {
    product: cachedProduct || productQuery.data || null,
    isLoading: !cachedProduct && productQuery.isLoading,
    isError: productQuery.isError,
    error: productQuery.error,
    refetch: productQuery.refetch,
  };
};

// Хук для получения категорий
export const useCategories = () => {
  return useQuery<CategoryDTO[]>({
    queryKey: QUERY_KEYS.CATEGORIES,
    queryFn: async () => {
      const response = await CatalogService.getCategories();
      return response.data;
    },
    staleTime: STALE_TIME.DAY,
    refetchOnWindowFocus: true,
  });
};

// Хук для получения популярных (promo) продуктов
export const usePopularProducts = () => {
  const productsQuery = useProducts();

  const promoProducts = (productsQuery.data || []).filter((p) => p.isPromo);

  return {
    products: promoProducts,
    isLoading: productsQuery.isLoading,
    isStale: productsQuery.isStale,
    isError: productsQuery.isError,
    error: productsQuery.error,
    refetch: productsQuery.refetch,
  };
};

// Комбинированный хук для всех данных экрана активности
export const useActivityData = () => {
  const linksQuery = useReferralLinks();
  const ordersQuery = useReferralOrders();
  const productsQuery = useProducts();

  return {
    links: linksQuery.data || [],
    orders: ordersQuery.data || [],
    products: productsQuery.data || [],
    isLoading: linksQuery.isLoading || ordersQuery.isLoading,
    isLinksLoading: linksQuery.isLoading,
    isOrdersLoading: ordersQuery.isLoading,
    refetchAll: () => {
      linksQuery.refetch();
      ordersQuery.refetch();
      productsQuery.refetch();
    },
    refetchLinks: linksQuery.refetch,
    refetchOrders: ordersQuery.refetch,
    refetchProducts: productsQuery.refetch,
  };
};
