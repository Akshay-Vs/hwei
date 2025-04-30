import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

// Base schema for store creation
export const createStoreSchema = z.object({
  version: z
    .number({
      required_error: 'Store version number is required',
    })
    .positive({
      message: 'Version must be a positive number',
    }),
  name: z
    .string({
      required_error: 'Store name is required',
    })
    .trim()
    .min(1, { message: 'Store name cannot be empty' })
    .max(100, {
      message: 'Store name is too long (maximum 100 characters allowed)',
    }),
  icon: z
    .string({
      required_error: 'Store icon identifier is required',
    })
    .trim()
    .min(1, { message: 'Store icon identifier cannot be empty' })
    .max(40, {
      message:
        'Store icon identifier is too long (maximum 40 characters allowed)',
    }),
});

// Update schema: partial version of create
export const updateStoreSchema = createStoreSchema.partial();

// Full Store schema (with extra fields like id, createdAt, etc. — you can adjust later)
export const storeSchema = createStoreSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Types
export type CreateStore = z.infer<typeof createStoreSchema>;
export type UpdateStore = z.infer<typeof updateStoreSchema>;
export type Store = z.infer<typeof storeSchema>;

// DTO classes
export class CreateStoreDto extends createZodDto(createStoreSchema) {}
export class UpdateStoreDto extends createZodDto(updateStoreSchema) {}
export class StoreDto extends createZodDto(storeSchema) {}
