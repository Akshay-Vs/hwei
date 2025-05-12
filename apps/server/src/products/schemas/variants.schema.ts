import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

//#region Combination
export const combinationMetadataSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export const combinationRelationSchema = z.object({
  productId: z.string().uuid(),
});

export const combinationBaseSchema = z.object({
  stock: z.number().min(0),
  sku: z.string().min(1),
  priceDelta: z.number().min(1),
});

export const combinationInputSchema = combinationBaseSchema.merge(
  combinationRelationSchema,
);

export const combinationUpdateSchema = combinationInputSchema
  .omit({ productId: true })
  .partial();

export type CombinationBase = z.infer<typeof combinationBaseSchema>;
export type CombinationMetadata = z.infer<typeof combinationMetadataSchema>;
export type CombinationRelation = z.infer<typeof combinationRelationSchema>;
export type CombinationInput = z.infer<typeof combinationInputSchema>;
export type CombinationUpdate = z.infer<typeof combinationUpdateSchema>;

export class CombinationBaseDto extends createZodDto(combinationBaseSchema) {}
export class CombinationMetadataDto extends createZodDto(
  combinationMetadataSchema,
) {}
export class CombinationRelationDto extends createZodDto(
  combinationRelationSchema,
) {}
export class CombinationInputDto extends createZodDto(combinationInputSchema) {}
export class CombinationUpdateDto extends createZodDto(
  combinationUpdateSchema,
) {}
//#endregion

//#region label
export const labelMetadataSchema = z.object({
  id: z.string().uuid(),
});

export const labelRelationSchema = z.object({
  productId: z.string().uuid(),
});

export const labelBaseSchema = z.object({
  name: z.string().min(1),
  hasThumbnail: z.boolean(),
  sortOrder: z.number().int().min(0),
});

export const labelInputSchema = labelBaseSchema.merge(labelRelationSchema);
export const labelUpdateSchema = labelBaseSchema.partial();
export const labelSchema = labelMetadataSchema.merge(labelInputSchema);

export type LabelBase = z.infer<typeof labelBaseSchema>;
export type LabelMetadata = z.infer<typeof labelMetadataSchema>;
export type LabelRelation = z.infer<typeof labelRelationSchema>;
export type LabelInput = z.infer<typeof labelInputSchema>;
export type LabelUpdate = z.infer<typeof labelUpdateSchema>;
export type Label = z.infer<typeof labelSchema>;

export class LabelBaseDto extends createZodDto(labelBaseSchema) {}
export class LabelMetadataDto extends createZodDto(labelMetadataSchema) {}
export class LabelRelationDto extends createZodDto(labelRelationSchema) {}
export class LabelInputDto extends createZodDto(labelInputSchema) {}
export class LabelUpdateDto extends createZodDto(labelUpdateSchema) {}
export class LabelDto extends createZodDto(labelSchema) {}
//#endregion
