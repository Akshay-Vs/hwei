import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

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
    .min(1, {
      message: 'Store name cannot be empty',
    })
    .max(100, {
      message: 'Store name is too long (maximum 100 characters allowed)',
    }),
  icon: z
    .string({
      required_error: 'Store icon identifier is required',
    })
    .trim()
    .min(1, {
      message: 'Store icon identifier cannot be empty',
    })
    .max(40, {
      message:
        'Store icon identifier is too long (maximum 40 characters allowed)',
    }),
  userId: z.string({
    required_error: 'User ID is required for store creation',
  }),
});

export type TCreateStore = z.infer<typeof createStoreSchema>;
export class CreateStoreDTO extends createZodDto(createStoreSchema) {}
