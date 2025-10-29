import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const wishlistMetadataSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

export const wishlistRelationSchema = z.object({
  storeId: z.string().cuid(),
  userId: z.string().min(1).max(64),
});

// Represents a single WishlistItem
export const wishlistItemSchema = z.object({
  id: z.string().cuid(),
  wishlistId: z.string().cuid(),
  productId: z.string().min(1),
  combinationId: z.string().nullable().optional(),
  addedAt: z.date().or(z.string().datetime()).optional(),
});

// Represents a full Wishlist with items[]
export const wishlistSchema = wishlistMetadataSchema
  .merge(wishlistRelationSchema)
  .extend({
    items: z.array(wishlistItemSchema),
  });

// Input schemas for create/update
export const createWishlistItemSchema = wishlistItemSchema.pick({
  productId: true,
  combinationId: true,
});

export const updateWishlistItemSchema = createWishlistItemSchema.partial();

// Types
export type WishlistItem = z.infer<typeof wishlistItemSchema>;
export type Wishlist = z.infer<typeof wishlistSchema>;
export type CreateWishlistItem = z.infer<typeof createWishlistItemSchema>;
export type UpdateWishlistItem = z.infer<typeof updateWishlistItemSchema>;

// DTOs
export class WishlistItemDto extends createZodDto(wishlistItemSchema) { }
export class WishlistDto extends createZodDto(wishlistSchema) { }
export class CreateWishlistItemDto extends createZodDto(createWishlistItemSchema) { }
export class UpdateWishlistItemDto extends createZodDto(updateWishlistItemSchema) { }

