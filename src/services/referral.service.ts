import { ENDPOINTS } from "@/constants/main";
import { api } from "@/lib/api";
import type {
  ReferralLinkDTO,
  ReferralOrderDTO,
  PublicReferralRedirectDTO,
} from "@/types";
import type { AxiosResponse } from "axios";

export const ReferralService = {
  /**
   * Получить все реферальные ссылки пользователя
   */
  getMyLinks: (): Promise<AxiosResponse<ReferralLinkDTO[]>> =>
    api.get(ENDPOINTS.REFERRALS.SHARE_LINKS),

  /**
   * Создать новую реферальную ссылку для продукта
   */
  createLink: (product_id: number): Promise<AxiosResponse<ReferralLinkDTO>> =>
    api.post(ENDPOINTS.REFERRALS.SHARE_LINKS, { product_id }),

  /**
   * Получить все заказы пользователя по рефералам
   */
  getMyOrders: (): Promise<AxiosResponse<ReferralOrderDTO[]>> =>
    api.get(ENDPOINTS.REFERRALS.ORDERS),

  /**
   * Получить заказы по конкретной реферальной ссылке
   */
  getOrdersByLink: (id: number): Promise<AxiosResponse<ReferralOrderDTO[]>> =>
    api.get(ENDPOINTS.REFERRALS.SHARE_LINK_ORDERS(id)),

  /**
   * Публичный переход по реферальному коду
   */
  publicRedirect: (
    code: string,
  ): Promise<AxiosResponse<PublicReferralRedirectDTO>> =>
    api.get(ENDPOINTS.REFERRALS.PUBLIC_REDIRECT(code)),
};
