import { z } from 'zod';

export const applicationSchema = z.object({
  websiteUrl: z.string().url("Must be a valid URL"),
  pricing: z.string().min(1, "Price must be greater than 0"),
  contactDetails: z.string().min(10, "Please provide detailed contact information"),
});