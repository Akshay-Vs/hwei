import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const addressMetadataSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

export const addressRelationSchema = z.object({
  userId: z.string().min(1).max(64),
});

export const addressBaseSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  address1: z.string().min(1).max(255),
  address2: z.string().max(255).nullable().optional(),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  zip: z.string().min(1).max(20),
  country: z.string().length(2).toUpperCase(), // ISO 3166-1 alpha-2
  phone: z.string().min(1).max(20), // E.164 format
  isDefault: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

// Represents a full Address
export const addressSchema = addressMetadataSchema
  .merge(addressRelationSchema)
  .merge(addressBaseSchema);

// Input schemas for create/update
export const createAddressSchema = addressBaseSchema.omit({
  isActive: true,
});

export const updateAddressSchema = addressBaseSchema.partial();

// Types
export type Address = z.infer<typeof addressSchema>;
export type CreateAddress = z.infer<typeof createAddressSchema>;
export type UpdateAddress = z.infer<typeof updateAddressSchema>;

// DTOs
export class AddressDto extends createZodDto(addressSchema) { }
export class CreateAddressDto extends createZodDto(createAddressSchema) { }
export class UpdateAddressDto extends createZodDto(updateAddressSchema) { }
