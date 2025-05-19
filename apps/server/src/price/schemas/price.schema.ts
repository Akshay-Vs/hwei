import { z } from 'zod';

export const priceMetadataSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export const priceRelationSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid(),
});

export const priceBaseSchema = z.object({
  label: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
});
