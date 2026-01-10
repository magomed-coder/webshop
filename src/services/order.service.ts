import { ENDPOINTS } from "@/constants/main";
import { api } from "@/lib/api";

export const OrderService = {
  create: (payload: {
    referral_code: string | null;
    customer_name: string;
    customer_phone: string;
    comment?: string;
  }) => api.post(ENDPOINTS.ORDERS.CREATE, payload),
};
