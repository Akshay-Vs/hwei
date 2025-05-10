import { Prisma } from '@/generated';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { handleInternalError } from 'src/errors/handlers/internal.error.handler';
import {
  Tag,
  TagInputDto,
  TagMetadataDto,
  TagUpdateDto,
} from '../schemas/tags.schema';
import { PaginationQueryDTO } from '../schemas/query-schema';

@Injectable()
export class TagsService {
  private readonly logger = new Logger(TagsService.name);
  private readonly entity = 'Tag';

  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: PaginationQueryDTO): Promise<Tag[]> {
    try {
      return await this.prisma.tag.findMany({
        where: {
          name: {
            contains: query.search,
            mode: 'insensitive',
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

  async findOne(params: TagMetadataDto): Promise<Tag | null> {
    try {
      return await this.prisma.tag.findUnique({ where: { id: params.id } });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async createMany(input: TagInputDto): Promise<Tag[]> {
    try {
      await this.prisma.tag.createMany({
        data: input.names.map((name) => ({ name })),
        skipDuplicates: true,
      });
      return await this.prisma.tag.findMany({
        where: { name: { in: input.names } },
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
      await this.prisma.$transaction(async (tx) => {
        const existing = await tx.tag.findMany({
          where: { name: { in: names } },
        });
        const existingNames = new Set(existing.map((t) => t.name));
        const missing = names.filter((name) => !existingNames.has(name));
        if (missing.length > 0) {
          await tx.tag.createMany({
            data: missing.map((name) => ({ name })),
            skipDuplicates: true,
          });
        }
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

  async getProductTags(
    productId: string,
  ): Promise<({ tag: Tag } & { productId: string })[]> {
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

  async attachTagsToProduct(
    tx: Prisma.TransactionClient | PrismaService,
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

  async updateOne(id: string, input: TagUpdateDto): Promise<Tag> {
    try {
      return await this.prisma.tag.update({
        where: { id },
        data: { name: input.name },
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
