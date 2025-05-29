import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const imageMetadataSchema = z.object({
  id: z.string().cuid(),
});

export const imageRelationsSchema = z.object({
  productId: z.string().cuid(),
});

export const imageBaseSchema = z.object({
  imageUrl: z.string().min(1).url(),
  imageAlt: z.string().nullable(),
  sortOrder: z.number().int(),
});

export const imageInputSchema = imageBaseSchema.merge(imageRelationsSchema);
export const imageUpdateSchema = imageBaseSchema.partial();
export const imageSchema = imageInputSchema.merge(imageMetadataSchema);

export type ImageInput = z.infer<typeof imageInputSchema>;
export type ImageUpdate = z.infer<typeof imageUpdateSchema>;
export type Image = z.infer<typeof imageSchema>;

export class ImageInputDTO extends createZodDto(imageInputSchema) {}
export class ImageUpdateDTO extends createZodDto(imageUpdateSchema) {}
export class ImageMetadataDTO extends createZodDto(imageMetadataSchema) {}
export class ImageRelationsDTO extends createZodDto(imageRelationsSchema) {}
export class ImageDTO extends createZodDto(imageSchema) {}
