import { z } from 'zod';

export const storeMetadataSchema = z.object({
  id: z.string().uuid({ message: 'Store ID must be a valid UUID' }),
  version: z.string(),
  createdAt: z
    .string()
    .datetime({ offset: true, message: 'CreatedAt is required' }),
  updatedAt: z
    .string()
    .datetime({ offset: true, message: 'UpdatedAt is required' }),
});

export const createStoreSchema = z.object({
  name: z.string().min(1, { message: 'Store name is required' }),
  icon: z.string().min(1, { message: 'Icon is required' }),
  userId: z.string().uuid({ message: 'User ID must be a valid UUID' }),
});
