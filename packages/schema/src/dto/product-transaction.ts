import { z } from 'zod';
import { productInputSchema } from './products.schema';
import { variantTransactionInput } from './variants.schema';
import { imageInputSchema } from './images.schema';
import { createZodDto } from '@anatine/zod-nestjs';
import { tagInputSchema } from './tags.schema';

export const productTransactionInput = z.object({
  metadata: productInputSchema,
  images: z.array(imageInputSchema.omit({ productId: true })),
  tags: tagInputSchema,
  variants: z.array(variantTransactionInput),
});

export type ProductTransactionInput = z.infer<typeof productTransactionInput>;

export class ProductTransactionInputDTO extends createZodDto(
  productTransactionInput,
) { }
