import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const InventoryMetadataSchema = z.object({
  id: z.string().cuid(),
});

export const InventoryRelationsSchema = z.object({
  combinationId: z.string().cuid(),
});

export const InventoryBaseSchema = z.object({
  stock: z.number().int(),
});

export const InventoryInputSchema = InventoryBaseSchema.merge(
  InventoryRelationsSchema,
);

export const InventoryCombinationSchema = InventoryMetadataSchema.merge(
  InventoryRelationsSchema,
);

export const InventoryUpdateSchema = InventoryBaseSchema.partial();

export const InventoryFilterSchema = z.object({
  stock: z.number().int().optional(),
});

export type InventoryInput = z.infer<typeof InventoryInputSchema>;
export type InventoryUpdate = z.infer<typeof InventoryUpdateSchema>;
export type Inventory = z.infer<typeof InventoryInputSchema>;
export type InventoryCombination = z.infer<typeof InventoryCombinationSchema>;
export type InventoryFilter = z.infer<typeof InventoryFilterSchema>;

export class InventoryCombinationDTO extends createZodDto(
  InventoryCombinationSchema,
) {}
export class InventoryInputDTO extends createZodDto(InventoryInputSchema) {}
export class InventoryUpdateDTO extends createZodDto(InventoryUpdateSchema) {}
export class InventoryFilterDTO extends createZodDto(InventoryFilterSchema) {}
export class InventoryDTO extends createZodDto(InventoryInputSchema) {}
