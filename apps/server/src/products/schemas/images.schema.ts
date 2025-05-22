import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const ImageMetadataSchema = z.object({
  id: z.string().cuid(),
});

export const ImageRelationsSchema = z.object({
  @variantId: z.string().cuid(),
});

export const ImageBaseSchema = z.object({
  imageUrl: z.string().min(1).url(),
  imageAlt: z.string().nullable(),
  sortOrder: z.number().int(),
});

export const ImageInputSchema = ImageBaseSchema.merge(ImageRelationsSchema);
export const ImageUpdateSchema = ImageBaseSchema.partial();
export const ImageSchema = ImageInputSchema.merge(ImageMetadataSchema);

export type ImageInput = z.infer<typeof ImageInputSchema>;
export type ImageUpdate = z.infer<typeof ImageUpdateSchema>;
export type Image = z.infer<typeof ImageSchema>;

export class ImageCombinationDTO extends createZodDto(ImageRelationsSchema) {}
export class Image@variantIdDTO extends createZodDto(
  ImageMetadataSchema.merge(ImageRelationsSchema),
) {}
export class ImageInputDTO extends createZodDto(ImageInputSchema) {}
export class ImageUpdateDTO extends createZodDto(ImageUpdateSchema) {}
export class ImageDTO extends createZodDto(ImageSchema) {}
