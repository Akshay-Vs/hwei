import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const tagsMetadataSchema = z.object({
  id: z.string().cuid({ message: 'id must be a valid CUID' }),
});

export const tagBaseSchema = z.object({
  name: z.string().min(1),
});

export const tagInputSchema = z.object({
  names: z.string().min(1).array(),
});

export const tagQuerySchema = z.object({
  search: z.string().optional(),
  skip: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: 'Skip must be a non-negative integer',
    })
    .optional(),
  take: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: 'Take must be an integer >= 1',
    })
    .optional(),
});

export const tagUpdateSchema = tagBaseSchema.partial();

export const tagSchema = tagsMetadataSchema.merge(tagBaseSchema);

export type TagCreate = z.infer<typeof tagBaseSchema>;
export type TagUpdate = z.infer<typeof tagUpdateSchema>;
export type TagQuery = z.infer<typeof tagQuerySchema>;
export type TagMetadata = z.infer<typeof tagsMetadataSchema>;
export type Tag = z.infer<typeof tagSchema>;

export class TagInputDto extends createZodDto(tagInputSchema) {}
export class TagUpdateDto extends createZodDto(tagUpdateSchema) {}
export class TagQueryDto extends createZodDto(tagQuerySchema) {}
export class TagMetadataDto extends createZodDto(tagsMetadataSchema) {}
