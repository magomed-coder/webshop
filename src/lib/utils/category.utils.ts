import { CATEGORIES } from "constants/data";

export function getCategoryTitle(categoryName: string): string | null {
  const category = CATEGORIES.find((c) => c.name === categoryName);
  if (!category) return null;

  return category.title.replace(/\n/g, " ").replace(/- /g, "");
}
