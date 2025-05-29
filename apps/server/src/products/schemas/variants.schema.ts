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
  sku: z.string().min(1),
});

export const combinationInputSchema = combinationBaseSchema.merge(
  combinationRelationSchema,
);

export const combinationUpdateSchema = combinationInputSchema
  .omit({ productId: true })
  .partial();

export const combinationSchema = combinationMetadataSchema.merge(
  combinationInputSchema,
);

export type CombinationBase = z.infer<typeof combinationBaseSchema>;
export type CombinationMetadata = z.infer<typeof combinationMetadataSchema>;
export type CombinationRelation = z.infer<typeof combinationRelationSchema>;
export type CombinationInput = z.infer<typeof combinationInputSchema>;
export type CombinationUpdate = z.infer<typeof combinationUpdateSchema>;
export type Combination = z.infer<typeof combinationSchema>;
export class CombinationBaseDTO extends createZodDto(combinationBaseSchema) {}
export class CombinationMetadataDTO extends createZodDto(
  combinationMetadataSchema,
) {}
export class CombinationRelationDTO extends createZodDto(
  combinationRelationSchema,
) {}
export class CombinationInputDTO extends createZodDto(combinationInputSchema) {}
export class CombinationUpdateDTO extends createZodDto(
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

export class LabelBaseDTO extends createZodDto(labelBaseSchema) {}
export class LabelMetadataDTO extends createZodDto(labelMetadataSchema) {}
export class LabelRelationDTO extends createZodDto(labelRelationSchema) {}
export class LabelInputDTO extends createZodDto(labelInputSchema) {}
export class LabelUpdateDTO extends createZodDto(labelUpdateSchema) {}
export class LabelDTO extends createZodDto(labelSchema) {}
//#endregion

//#region Option
export const optionMetadataSchema = z.object({
  id: z.string().uuid(),
});

export const optionRelationSchema = z.object({
  variantLabelId: z.string().uuid(),
});

export const optionBaseSchema = z.object({
  name: z.string().min(1),
  thumbnail: z.string().url().nullable(),
  sortOrder: z.number().int().min(0),
});

export const optionInputSchema = optionBaseSchema.merge(optionRelationSchema);
export const optionUpdateSchema = optionInputSchema
  .omit({ variantLabelId: true })
  .partial();

export const optionSchema = optionMetadataSchema.merge(optionInputSchema);

export type OptionBase = z.infer<typeof optionBaseSchema>;
export type OptionMetadata = z.infer<typeof optionMetadataSchema>;
export type OptionRelation = z.infer<typeof optionRelationSchema>;
export type OptionInput = z.infer<typeof optionInputSchema>;
export type OptionUpdate = z.infer<typeof optionUpdateSchema>;
export type Option = z.infer<typeof optionSchema>;

export class OptionBaseDTO extends createZodDto(optionBaseSchema) {}
export class OptionMetadataDTO extends createZodDto(optionMetadataSchema) {}
export class OptionRelationDTO extends createZodDto(optionRelationSchema) {}
export class OptionInputDTO extends createZodDto(optionInputSchema) {}
export class OptionUpdateDTO extends createZodDto(optionUpdateSchema) {}
export class OptionDTO extends createZodDto(optionSchema) {}
//#endregion
