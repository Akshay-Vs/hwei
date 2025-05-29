import { z } from 'zod';
import { productInputSchema } from './products.schema';
import {
  combinationInputSchema,
  labelInputSchema,
  optionInputSchema,
} from './variants.schema';
import { imageInputSchema } from './images.schema';
import { InventoryInputSchema } from './inventory.schema';
import { priceInputSchema } from './price.schema';
import { createZodDto } from '@anatine/zod-nestjs';

export const productTransactionInput = z.object({
  metadata: productInputSchema,
  images: imageInputSchema.omit({ productId: true }).array(),
  variants: z.array(
    z.object({
      label: labelInputSchema,
      items: z.array(
        z.object({
          pricing: priceInputSchema.omit({ combinationId: true }),
          inventory: InventoryInputSchema.omit({ combinationId: true }),
          options: z.array(optionInputSchema.omit({ variantLabelId: true })),
          combinations: z.array(
            combinationInputSchema.omit({ productId: true }),
          ),
        }),
      ),
    }),
  ),
});

export type ProductTransactionInput = z.infer<typeof productTransactionInput>;

export class ProductTransactionInputDTO extends createZodDto(
  productTransactionInput,
) {}
