import { z } from 'zod';

export const applicationSchema = z.object({
  website_url: z.string().url("Must be a valid URL"),
  pricing: z.string().min(1, "Price must be greater than 0"),
  contact_details: z.string().min(10, "Please provide detailed contact information"),
  product_description : z.string().min(10, "Please provide a detailed product description"),
});