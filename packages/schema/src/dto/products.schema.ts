import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const productsMetadataSchema = z.object({
  id: z.string().cuid({ message: 'id must be a valid CUID' }),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export const productsRelationSchema = z.object({
  storeId: z.string().cuid({ message: 'storeId must be a valid CUID' }),
  categoryId: z.string().cuid({ message: 'categoryId must be a valid CUID' }),
  brandId: z.string().cuid({ message: 'brandId must be a valid CUID' }),
});

export const productBaseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  minOrder: z
    .number()
    .int()
    .min(1, { message: 'Minimum order must be greater than 0' })
    .nonnegative({ message: 'Minimum order cannot be negative' }),
  maxOrder: z
    .number()
    .int({ message: 'Maximum order must be an integer' })
    .nonnegative({ message: 'Maximum order cannot be negative' }),
});

const productFields = productBaseSchema.merge(productsRelationSchema);

export const productInputSchema = productFields
  .omit({ storeId: true })
  .refine(({ minOrder, maxOrder }) => maxOrder >= minOrder, {
    message: 'Maximum order must be greater than or equal to minimum order',
    path: ['maximumOrder'],
  });

export const productUpdateSchema = productFields
  .partial()
  .superRefine((data, ctx) => {
    const { minOrder, maxOrder } = data;

    if (minOrder !== undefined && maxOrder === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['maxOrder'],
        message: 'maxOrder is required when minOrder is provided',
      });
    }

    if (maxOrder !== undefined && minOrder === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['minOrder'],
        message: 'minOrder is required when maxOrder is provided',
      });
    }

    if (
      minOrder !== undefined &&
      maxOrder !== undefined &&
      maxOrder < minOrder
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['maxOrder'],
        message: 'Maximum order must be greater than or equal to minimum order',
      });
    }
  });

export const productSchema = productsMetadataSchema.and(productInputSchema);

export type ProductInput = z.infer<typeof productInputSchema>;
export type ProductUpdate = z.infer<typeof productUpdateSchema>;
export type ProductMetadata = z.infer<typeof productsMetadataSchema>;
export type Product = z.infer<typeof productSchema>;

export class ProductInputDto extends createZodDto(productInputSchema) {}
export class ProductUpdateDto extends createZodDto(productUpdateSchema) {}
export class ProductMetadataDto extends createZodDto(productsMetadataSchema) {}
export class ProductDto extends createZodDto(productSchema) {}
