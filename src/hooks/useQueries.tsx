import { QUERY_KEYS, STALE_TIME } from "@/constants/main";
import { useAuthStore } from "@/contexts/auth.store";
import { CatalogService } from "@/services/catalog.service";
import { OrderService } from "@/services/order.service";
import { ReferralService } from "@/services/referral.service";
import type {
  CategoryDTO,
  CreateOrderDTO,
  CreateReferralLinkDTO,
  OrderDTO,
  ProductDTO,
  PublicReferralRedirectDTO,
  ReferralLinkDTO,
  ReferralOrderDTO,
} from "@/types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

// Хук для создания заказа (мутация)
export const useCreateOrder = () => {
  return useMutation<OrderDTO, Error, CreateOrderDTO>({
    mutationFn: async (payload: CreateOrderDTO) => {
      const response = await OrderService.create(payload);
      return response.data;
    },
  });
};

// Хук для создания реферальной ссылки (мутация)
export const useCreateReferralLink = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation<ReferralLinkDTO, Error, CreateReferralLinkDTO>({
    mutationFn: async (payload: CreateReferralLinkDTO) => {
      const response = await ReferralService.createLink(payload.product_id);
      return response.data;
    },
    onSuccess: (newLink) => {
      // Обновляем кеш реферальных ссылок
      queryClient.setQueryData(
        QUERY_KEYS.REFERRAL_LINKS(user?.id),
        (old: ReferralLinkDTO[] | undefined) => {
          return old ? [...old, newLink] : [newLink];
        },
      );
    },
  });
};

// Хук для получения заказов по конкретной реферальной ссылке
export const useOrdersByReferralLink = (linkId: number) => {
  return useQuery<ReferralOrderDTO[]>({
    queryKey: QUERY_KEYS.REFERRAL_ORDERS_BY_LINK(linkId),
    queryFn: async () => {
      const response = await ReferralService.getOrdersByLink(linkId);
      return response.data;
    },
    enabled: !!linkId,
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

/**
 * React Query хук для получения публичных данных реферального перехода
 * @param code Реферальный код
 * @param enabled Включить или отключить автоматическое выполнение запроса
 */
export const usePublicRedirect = (code: string, enabled = true) => {
  return useQuery<PublicReferralRedirectDTO>({
    queryKey: ["publicReferralRedirect", code],
    queryFn: async () => {
      const response = await ReferralService.publicRedirect(code);
      return response.data;
    },
    enabled: enabled && !!code, // Выполняем запрос только если есть код и enabled=true
    staleTime: STALE_TIME.SHORT, // 5 минут кеш
  });
};
