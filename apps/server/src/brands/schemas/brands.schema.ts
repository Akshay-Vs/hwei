import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

// Metadata part
const brandMetadataSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  storeId: z.string(),
});

// Create input
export const createBrandSchema = z.object({
  name: z.string(),
  image: z.string().url(),
  description: z.string(),
});

// Update input (partial of create)
export const updateBrandSchema = createBrandSchema.partial();

// Full brand object
export const brandSchema = brandMetadataSchema.merge(createBrandSchema);

// Types
export type CreateBrand = z.infer<typeof createBrandSchema>;
export type UpdateBrand = z.infer<typeof updateBrandSchema>;
export type Brand = z.infer<typeof brandSchema>;

// DTO classes
export class CreateBrandDto extends createZodDto(createBrandSchema) {}
export class UpdateBrandDto extends createZodDto(updateBrandSchema) {}
export class BrandDto extends createZodDto(brandSchema) {}
