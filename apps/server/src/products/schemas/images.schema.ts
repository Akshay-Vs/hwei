import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const ImageMetadataSchema = z.object({
  id: z.string(),
});

export const ImageRelationsSchema = z.object({
  combinationId: z.string(),
});

export const ImageBaseSchema = z.object({
  imageUrl: z.string().min(1).url(),
  imageAtl: z.string().optional(),
  sortOrder: z.number().int(),
});

export const ImageInputSchema = ImageBaseSchema.merge(ImageRelationsSchema);
export const ImageUpdateSchema = ImageBaseSchema.partial();
export const ImageSchema = ImageInputSchema.merge(ImageMetadataSchema);

export type ImageInput = z.infer<typeof ImageInputSchema>;
export type ImageUpdate = z.infer<typeof ImageUpdateSchema>;
export type Image = z.infer<typeof ImageSchema>;

export class ImageInputDTO extends createZodDto(ImageInputSchema) {}
export class ImageUpdateDTO extends createZodDto(ImageUpdateSchema) {}
export class ImageDTO extends createZodDto(ImageSchema) {}
