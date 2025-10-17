import { Prisma } from '@/generated';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { BaseService } from 'src/common/services/base.service';
import { PaginationQueryDTO } from '@hwei/schema/dto/query-schema';
import {
  Tag,
  TagInputDto,
  TagMetadata,
  UpdateTag,
} from '@hwei/schema/dto/tags.schema';

@Injectable()
export class TagsService extends BaseService {
  protected readonly logger = new Logger(TagsService.name);
  protected readonly entity = 'Tag';

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async findAll(query: PaginationQueryDTO): Promise<Tag[]> {
    return await this.withErrorHandling(async () => {
      this.logger.debug(
        `Finding all tags with query: ${JSON.stringify(query)}`,
      );
      const res = await this.getClient().tag.findMany({
        where: {
          name: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        skip: query.skip,
        take: query.take || 10,
      });
      this.logger.debug(`Found ${res.length} tags`);
      return res;
    });
  }

  async findOne(params: TagMetadata): Promise<Tag | null> {
    return await this.withErrorHandling(async () => {
      this.logger.debug(`Finding tag with id: ${params.id}`);
      const res = await this.getClient().tag.findUnique({
        where: { id: params.id },
      });

      if (!res) throw new NotFoundException(`Tag ${params.id} not found`);
      return res;
    });
  }

  async createMany(input: TagInputDto): Promise<Tag[]> {
    return await this.withErrorHandling(async () => {
      this.logger.debug(
        `Creating multiple tags: ${JSON.stringify(input.names)}`,
      );
      const client = this.getClient();

      await client.tag.createMany({
        data: input.names.map((name) => ({ name })),
        skipDuplicates: true,
      });

      const res = await client.tag.findMany({
        where: { name: { in: input.names } },
      });

      return res;
    });
  }

  async resolveTagIds(names: string[]): Promise<string[]> {
    return await this.withErrorHandling(async () => {
      this.logger.debug(
        `Resolving tag IDs for names: ${JSON.stringify(names)}`,
      );
      await this.prisma.$transaction(async (tx) => {
        const existing = await tx.tag.findMany({
          where: { name: { in: names } },
        });

        const existingNames = new Set(existing.map((t) => t.name));
        const missing = names.filter((name) => !existingNames.has(name));

        if (missing.length > 0) {
          this.logger.debug(
            `Creating missing tags: ${JSON.stringify(missing)}`,
          );
          await tx.tag.createMany({
            data: missing.map((name) => ({ name })),
            skipDuplicates: true,
          });
        }
      });

      const final = await this.getClient().tag.findMany({
        where: { name: { in: names } },
      });
      this.logger.debug(`Resolved ${final.length} tag IDs`);
      return final.map((t) => t.id);
    });
  }

  async getProductTags(
    productId: string,
  ): Promise<({ tag: Tag } & { productId: string })[]> {
    return await this.withErrorHandling(async () => {
      this.logger.debug(`Getting tags for product: ${productId}`);
      const res = await this.getClient().productTag.findMany({
        where: { productId },
        include: { tag: true },
      });
      return res;
    });
  }

  async connectToProduct(
    tx: Prisma.TransactionClient | PrismaService,
    productId: string,
    tagIds: string[],
  ): Promise<Prisma.BatchPayload> {
    return this.withErrorHandling(async () => {
      this.logger.debug(
        `Connecting tags ${JSON.stringify(tagIds)} to product ${productId}`,
      );
      const res = await this.getClient(tx).productTag.createMany({
        data: tagIds.map((tagId) => ({ productId, tagId })),
        skipDuplicates: true,
      });
      return res;
    });
  }

  async updateOne(id: string, input: UpdateTag): Promise<Tag> {
    return this.withErrorHandling(async () => {
      this.logger.debug(
        `Updating tag ${id} with data: ${JSON.stringify(input)}`,
      );
      const res = await this.getClient().tag.update({
        where: { id },
        data: { name: input.name },
      });
      return res;
    });
  }

  async deleteOne(id: string): Promise<Tag> {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Deleting tag ${id}`);

      const prev = await this.findOne({ id });
      if (!prev) throw new NotFoundException(`Tag ${id} not found`);

      const res = await this.getClient().tag.delete({ where: { id } });
      return res;
    });
  }
}
