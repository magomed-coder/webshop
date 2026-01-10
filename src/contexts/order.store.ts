import { OrderService } from "@/services/order.service";
import type { CreateOrderDTO, OrderDTO } from "@/types";
import { create } from "zustand";

interface OrderState {
  /** Последний созданный заказ */
  order: OrderDTO | null;
  /** Флаг загрузки при создании заказа */
  isLoading: boolean;
  /** Текст ошибки при создании заказа */
  error: string | null;
  /** Создание нового заказа */
  createOrder: (payload: CreateOrderDTO) => Promise<OrderDTO>;
  /** Очистка состояния заказа */
  clearOrder: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  order: null,
  isLoading: false,
  error: null,

  /**
   * Создаёт заказ на сервере.
   * Используется в форме оформления заказа.
   * Возвращает созданный заказ для дальнейших сценариев (redirect, success screen).
   */
  createOrder: async (payload) => {
    set({ isLoading: true, error: null });

    try {
      const res = await OrderService.create(payload);
      set({ order: res.data });
      return res.data;
    } catch (err: any) {
      const message =
        err.response?.data?.detail ??
        err.response?.data?.message ??
        "Failed to create order";

      set({ error: message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Сбрасывает текущий заказ.
   * Обычно вызывается после успешного завершения сценария.
   */
  clearOrder: () => set({ order: null }),
}));
