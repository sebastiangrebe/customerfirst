import { z } from 'zod';

export const requirementSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  category: z.string().min(3, "Category is required"),
  tags: z.array(z.object({
    id: z.string(),
    text: z.string(),
  })).transform(tags => tags.map(tag => tag.text)).optional(),
  ideal_price: z.string().min(1, "Expected price is required"),
});