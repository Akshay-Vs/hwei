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
  images: z.array(imageInputSchema.omit({ productId: true })),
  variants: z.array(
    z.object({
      label: labelInputSchema.omit({ productId: true }),
      items: z.array(
        priceInputSchema
          .omit({ combinationId: true })
          .extend(InventoryInputSchema.omit({ combinationId: true }).shape)
          .extend(optionInputSchema.omit({ variantLabelId: true }).shape)
          .extend(combinationInputSchema.omit({ productId: true }).shape),
      ),
    }),
  ),
});

export type ProductTransactionInput = z.infer<typeof productTransactionInput>;

export class ProductTransactionInputDTO extends createZodDto(
  productTransactionInput,
) {}
