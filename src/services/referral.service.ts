import { ENDPOINTS } from "@/constants/main";
import { api } from "@/lib/api";

export const ReferralService = {
  getMyLinks: () => api.get(ENDPOINTS.REFERRALS.SHARE_LINKS),

  createLink: (product_id: number) =>
    api.post(ENDPOINTS.REFERRALS.SHARE_LINKS, { product_id }),

  getMyOrders: () => api.get(ENDPOINTS.REFERRALS.ORDERS),

  getOrdersByLink: (id: number) =>
    api.get(ENDPOINTS.REFERRALS.SHARE_LINK_ORDERS(id)),

  publicRedirect: (code: string) =>
    api.get(ENDPOINTS.REFERRALS.PUBLIC_REDIRECT(code)),
};
