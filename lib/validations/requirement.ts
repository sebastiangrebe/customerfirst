import { z } from 'zod';

export const requirementSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  category: z.string().min(3, "Category is required"),
  tags: z.string().transform(str => str.split(',').map(s => s.trim())),
});