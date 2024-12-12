import { categories } from "@/constants/categories"

export const findCategory = (category: string): any => {
    return categories.find((c) => c.value === category);
}