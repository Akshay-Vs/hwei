import { z } from 'zod';

export const productSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    brand: z.string().min(1, { message: 'Brand is required' }),
    category: z.string().min(1, { message: 'Category is required' }),
    unitPrice: z
      .number()
      .positive({ message: 'Unit price must be greater than 0' }),
    salePrice: z
      .number()
      .positive({ message: 'Sale price must be greater than 0' }),
    minimumOrder: z
      .number()
      .int()
      .nonnegative({ message: 'Minimum order cannot be negative' }),
    maximumOrder: z
      .number()
      .int()
      .nonnegative({ message: 'Maximum order cannot be negative' }),
    tags: z.array(z.string()),
  })
  .refine(({ minimumOrder, maximumOrder }) => maximumOrder >= minimumOrder, {
    message: 'Maximum order must be greater than or equal to minimum order',
    path: ['maximumOrder'],
  });
