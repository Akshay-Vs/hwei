import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const cartMetadataSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

export const cartRelationSchema = z.object({
  storeId: z.string().cuid(),
  userId: z.string().min(1).max(64),
});

// Represents a single CartItem
export const cartItemSchema = z.object({
  id: z.string().cuid(),
  cartId: z.string().cuid(),
  productId: z.string().min(1),
  combinationId: z.string().min(1),
  quantity: z.number().int().positive(),
  addedAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

// Represents a full Cart with items[]
export const cartSchema = cartMetadataSchema
  .merge(cartRelationSchema)
  .extend({
    items: z.array(cartItemSchema),
  });

// Input schemas for create/update
export const createCartItemSchema = cartItemSchema.pick({
  productId: true,
  combinationId: true,
  quantity: true,
});

export const updateCartItemSchema = createCartItemSchema.pick({ quantity: true }).partial();

// Types
export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof cartSchema>;
export type CreateCartItem = z.infer<typeof createCartItemSchema>;
export type UpdateCartItem = z.infer<typeof updateCartItemSchema>;

// DTOs
export class CartItemDto extends createZodDto(cartItemSchema) { }
export class CartDto extends createZodDto(cartSchema) { }
export class CreateCartItemDto extends createZodDto(createCartItemSchema) { }
export class UpdateCartItemDto extends createZodDto(updateCartItemSchema) { }
