import { createZodDto } from '@anatine/zod-nestjs';
import z from 'zod';

export const categoriesMetadataSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  storeId: z.string(),
});

export const createCategorySchema = z.object({
  name: z.string().min(1).max(255),
});

export const updateCategorySchema = categoriesMetadataSchema.partial();

export const categorySchema =
  categoriesMetadataSchema.merge(createCategorySchema);

export type CreateCategory = z.infer<typeof createCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
export type Category = z.infer<typeof categorySchema>;

export class CreateCategoryDto extends createZodDto(createCategorySchema) {}
export class UpdateCategoryDto extends createZodDto(updateCategorySchema) {}
export class CategoryDto extends createZodDto(categorySchema) {}
