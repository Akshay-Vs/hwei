import { Prisma } from '@/generated';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { handleInternalError } from 'src/errors/handlers/internal.error.handler';
import { Tag, TagInputDto, TagQueryDto } from '../schemas/tags.schema';

@Injectable()
export class TagsService {
  private readonly logger = new Logger(TagsService.name);
  private readonly entity = 'Tag';

  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: TagQueryDto): Promise<Tag[]> {
    try {
      return await this.prisma.tag.findMany({
        where: {
          name: {
            contains: query.search,
          },
        },
        skip: query.skip,
        take: query.take,
      });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async findOne(id: string): Promise<Tag | null> {
    try {
      return await this.prisma.tag.findUnique({ where: { id } });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async createMany(tags: TagInputDto): Promise<Prisma.BatchPayload> {
    try {
      return await this.prisma.tag.createMany({
        data: tags.names.map((name) => ({ name })),
      });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async resolveTagIds(names: string[]): Promise<string[]> {
    try {
      const existing = await this.prisma.tag.findMany({
        where: { name: { in: names } },
      });

      const existingMap = new Map(existing.map((t) => [t.name, t.id]));
      const missing = names.filter((name) => !existingMap.has(name));

      await this.prisma.tag.createMany({
        data: missing.map((name) => ({ name })),
        skipDuplicates: true,
      });

      const final = await this.prisma.tag.findMany({
        where: { name: { in: names } },
      });
      return final.map((t) => t.id);
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async getProductTags(productId: string): Promise<
    ({ tag: Tag } & {
      productId: string;
    })[]
  > {
    try {
      return await this.prisma.productTag.findMany({
        where: { productId },
        include: { tag: true },
      });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async removeTagFromProduct(
    tx: Prisma.TransactionClient,
    productId: string,
    tagIds: string[],
  ): Promise<Prisma.BatchPayload> {
    try {
      return await tx.productTag.createMany({
        data: tagIds.map((tagId) => ({ productId, tagId })),
        skipDuplicates: true,
      });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async attatchTagsToProduct(
    productId: string,
    tagIds: string[],
  ): Promise<Prisma.BatchPayload> {
    try {
      return await this.prisma.productTag.createMany({
        data: tagIds.map((tagId) => ({ productId, tagId })),
      });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async deleteOne(id: string): Promise<Tag> {
    try {
      return await this.prisma.tag.delete({ where: { id } });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }
}
