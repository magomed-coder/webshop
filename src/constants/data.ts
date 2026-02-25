import type { ProductDTO } from "@/types";

export const skeletonProducts: ProductDTO[] = Array.from({ length: 8 }).map(
  (_, i) => ({
    id: i,
    title: "",
    description: "",
    price: "",
    is_active: false,
    bonus: "",
    extra_bonus: "",
    total_bonus: "",
    category: i,
    category_name: "",
    images: [],
    isPromo: false,
  }),
);
