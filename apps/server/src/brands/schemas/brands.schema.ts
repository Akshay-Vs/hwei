import { z } from 'zod';

export const brandSchema = z.object({
  brandName: z.string(),
});
