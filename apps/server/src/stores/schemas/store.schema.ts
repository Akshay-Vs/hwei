import { z } from 'zod';

export const createStoreInputSchema = z.object({
  version: z.number({ required_error: 'Version is required' }),
  name: z
    .string({ required_error: 'Store name is required' })
    .min(1, { message: 'Store name is required' }),
  icon: z
    .string({ required_error: 'Icon is required' })
    .min(1, { message: 'Icon is required' }),
  userId: z.string({ required_error: 'User ID is required' }),
});

export type CreateStoreInput = z.infer<typeof createStoreInputSchema>;
