import { createZodDto } from '@anatine/zod-nestjs';
import { paginationQuerySchema } from './query-schema';
import { z } from 'zod';

export const currencyMetadataSchema = z.object({
  id: z.string().cuid(),
});

export const currencyRelationSchema = z.object({
  storeId: z.string().cuid(),
});

export const currencyBaseSchema = z.object({
  code: z.string().min(1).max(3),
  label: z.string().min(1),
});

export const currencyInputSchema = currencyBaseSchema;
export const currencyInputManySchema = currencyBaseSchema.array();

export const currencyUpdateSchema = currencyBaseSchema.partial();
export const currencySchema = currencyInputSchema.merge(currencyMetadataSchema);

export const currencyPaginationSchema = paginationQuerySchema.merge(
  currencyBaseSchema.partial(),
);

export type Currency = z.infer<typeof currencySchema>;
export type CurrencyInput = z.infer<typeof currencyInputSchema>;
export type CurrencyUpdate = z.infer<typeof currencyUpdateSchema>;
export type CurrencyPagination = z.infer<typeof currencyPaginationSchema>;

export class currencyDTO extends createZodDto(currencySchema) { }
export class currencyInputDTO extends createZodDto(currencyInputSchema) { }
export class currencyUpdateDTO extends createZodDto(currencyUpdateSchema) { }
export class currencyPaginationDTO extends createZodDto(
  currencyPaginationSchema,
) { }
