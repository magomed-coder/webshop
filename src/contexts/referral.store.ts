import { ReferralService } from "@/services/referral.service";
import type {
  CreateReferralLinkDTO,
  ReferralLinkDTO,
  ReferralOrderDTO,
} from "@/types";
import { create } from "zustand";

interface ReferralState {
  /** Все реферальные ссылки пользователя */
  links: ReferralLinkDTO[];
  /** Все заказы пользователя по рефералам */
  orders: ReferralOrderDTO[];
  /** Заказы, относящиеся к конкретной ссылке */
  ordersByLink: ReferralOrderDTO[];
  /** Флаг загрузки */
  isLoading: boolean;
  /** Текст ошибки */
  error: string | null;
  /** Загрузка всех реферальных ссылок пользователя */
  fetchMyLinks: () => Promise<void>;
  /** Создание новой реферальной ссылки */
  createLink: (payload: CreateReferralLinkDTO) => Promise<ReferralLinkDTO>;
  /** Загрузка всех заказов пользователя по рефералам */
  fetchMyOrders: () => Promise<void>;
  /** Загрузка заказов по конкретной реферальной ссылке */
  fetchOrdersByLink: (id: number) => Promise<void>;
  /** Очистка заказов по ссылке */
  clearOrdersByLink: () => void;
}

export const useReferralStore = create<ReferralState>((set) => ({
  links: [],
  orders: [],
  ordersByLink: [],

  isLoading: false,
  error: null,

  /**
   * Загружает список всех реферальных ссылок пользователя.
   * Используется на экране "Мои ссылки".
   */
  fetchMyLinks: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await ReferralService.getMyLinks();
      set({ links: res.data });
    } catch (err: any) {
      set({
        error:
          err.response?.data?.detail ??
          err.response?.data?.message ??
          "Failed to load referral links",
      });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Создаёт новую реферальную ссылку для продукта.
   * После успешного создания возвращает ссылку,
   * чтобы UI мог сразу показать её пользователю.
   */
  createLink: async (payload) => {
    set({ isLoading: true, error: null });

    try {
      const res = await ReferralService.createLink(payload.product_id);
      set((state) => ({
        links: [...state.links, res.data],
      }));
      return res.data;
    } catch (err: any) {
      set({
        error:
          err.response?.data?.detail ??
          err.response?.data?.message ??
          "Failed to create referral link",
      });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Загружает все заказы пользователя,
   * которые были оформлены по его реферальным ссылкам.
   */
  fetchMyOrders: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await ReferralService.getMyOrders();
      set({ orders: res.data });
    } catch (err: any) {
      set({
        error:
          err.response?.data?.detail ??
          err.response?.data?.message ??
          "Failed to load referral orders",
      });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Загружает заказы, привязанные к конкретной реферальной ссылке.
   * Используется при просмотре статистики по ссылке.
   */
  fetchOrdersByLink: async (id: number) => {
    set({ isLoading: true, error: null });

    try {
      const res = await ReferralService.getOrdersByLink(id);
      set({ ordersByLink: res.data });
    } catch (err: any) {
      set({
        error:
          err.response?.data?.detail ??
          err.response?.data?.message ??
          "Failed to load orders by link",
      });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Очищает список заказов по выбранной ссылке.
   * Обычно вызывается при выходе со страницы деталей.
   */
  clearOrdersByLink: () => set({ ordersByLink: [] }),
}));
