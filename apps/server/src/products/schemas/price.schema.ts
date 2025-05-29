import { createZodDto } from '@anatine/zod-nestjs';
import { number, z } from 'zod';

export const priceMetadataSchema = z.object({
  id: z.string().cuid(),
});

export const priceRelationSchema = z.object({
  combinationId: z.string().uuid(),
  currencyId: z.string().uuid(),
});

export const priceBaseSchema = z.object({
  price: number().min(0).int({
    message: 'Price must be a number',
  }),
});

export const priceInputSchema = priceBaseSchema.merge(priceRelationSchema);
export const priceUpdateSchema = priceInputSchema
  .omit({ combinationId: true })
  .partial();

export type PriceMetadata = z.infer<typeof priceMetadataSchema>;
export type PriceRelation = z.infer<typeof priceRelationSchema>;
export type PriceBase = z.infer<typeof priceBaseSchema>;
export type PriceInput = z.infer<typeof priceInputSchema>;
export type PriceUpdate = z.infer<typeof priceUpdateSchema>;

export class PriceMetadataDto extends createZodDto(priceMetadataSchema) {}
export class PriceRelationDto extends createZodDto(priceRelationSchema) {}
export class PriceBaseDto extends createZodDto(priceBaseSchema) {}
export class PriceInputDto extends createZodDto(priceInputSchema) {}
export class PriceUpdateDto extends createZodDto(priceUpdateSchema) {}
