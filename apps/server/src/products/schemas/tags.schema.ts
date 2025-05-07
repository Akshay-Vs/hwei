import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const tagsMetadataSchema = z.object({
  id: z.string(),
});

const tagBaseSchema = z.object({
  name: z.string().min(1),
});

const tagQuerySchema = z.object({
  search: z.string().optional(),
  skip: z.number().int().min(1).optional(),
  take: z.number().int().min(1).optional(),
});

const tagUpdateSchema = tagBaseSchema.partial();

const tagSchema = tagsMetadataSchema.merge(tagBaseSchema);

type TagCreate = z.infer<typeof tagBaseSchema>;
type TagUpdate = z.infer<typeof tagUpdateSchema>;
type TagQuery = z.infer<typeof tagQuerySchema>;
type TagMetadata = z.infer<typeof tagsMetadataSchema>;
type Tag = z.infer<typeof tagSchema>;

class TagCreateDto extends createZodDto(tagBaseSchema) {}
class TagUpdateDto extends createZodDto(tagUpdateSchema) {}
class TagQueryDto extends createZodDto(tagQuerySchema) {}
class TagMetadataDto extends createZodDto(tagsMetadataSchema) {}

export {
  TagCreate,
  TagUpdate,
  TagQuery,
  TagMetadata,
  tagSchema,
  Tag,
  TagCreateDto,
  TagUpdateDto,
  TagQueryDto,
  TagMetadataDto,
};
