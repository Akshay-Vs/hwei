import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

// Enums
export const userStatusEnum = z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'DELETED']);
export const roleEnum = z.enum(['USER', 'ADMIN', 'SUPER_ADMIN']);

export const userMetadataSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
  deletedAt: z.date().or(z.string().datetime()).nullable().optional(),
});

export const userBaseSchema = z.object({
  clerkId: z.string().min(1).max(64),
  email: z.string().email().max(255),
  avatar: z.string().url().max(255).nullable().optional(),
  status: userStatusEnum.optional().default('ACTIVE'),
  role: roleEnum.optional().default('USER'),
  fullName: z.string().max(255).nullable(),
});

// Represents a full User
export const userSchema = userMetadataSchema.merge(userBaseSchema);

// Input schemas for create/update
export const createUserSchema = userBaseSchema.pick({
  clerkId: true,
  email: true,
  fullName: true,
  avatar: true,
});

export const updateUserSchema = userBaseSchema
  .pick({
    email: true,
    fullName: true,
    avatar: true,
  })
  .partial();

export const updateRoleSchema = userSchema.pick({ role: true });


// Types
export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type RoleEnum = z.infer<typeof roleEnum>;
export type UpdateRole = z.infer<typeof updateRoleSchema>;

// DTOs
export class UserDto extends createZodDto(userSchema) { }
export class CreateUserDto extends createZodDto(createUserSchema) { }
export class UpdateUserDto extends createZodDto(updateUserSchema) { }
export class UpdateRoleDto extends createZodDto(updateRoleSchema) { }
