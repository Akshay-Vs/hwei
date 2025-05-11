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
  priceDelta: z.string().min(1),
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
