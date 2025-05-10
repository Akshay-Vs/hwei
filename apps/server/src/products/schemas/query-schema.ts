import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const paginationQuerySchema = z.object({
  search: z.string().optional(),
  skip: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: 'Skip must be a non-negative integer',
    })
    .optional(),
  take: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: 'Take must be an integer >= 1',
    })
    .optional(),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
export class PaginationQueryDTO extends createZodDto(paginationQuerySchema) {}
