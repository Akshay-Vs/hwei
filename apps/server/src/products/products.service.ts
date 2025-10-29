import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import {
  ProductDto,
  ProductInput,
  ProductUpdateDto,
} from '@hwei/schema/dto/products.schema';
import { PaginationQueryDTO } from '@hwei/schema/dto/query-schema';
import { BaseService } from 'src/common/services/base.service';
import { ImageService } from './image/image.service';
import { Prisma } from '@/generated';

@Injectable()
export class ProductsService extends BaseService {
  protected readonly logger = new Logger(ProductsService.name);
  protected readonly entity = 'Product';

  constructor(
    protected readonly prisma: PrismaService,
    protected readonly productImage: ImageService,
  ) {
    super(prisma);
  }

  async findAll(
    storeId: string,
    query: PaginationQueryDTO,
  ): Promise<ProductDto[]> {
    return this.withErrorHandling(
      async () =>
        await this.getClient().product.findMany({
          where: {
            storeId,
            deletedAt: null,
            ...(query.search
              ? {
                title: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              }
              : {}),
          },
          ...(query.skip ? { skip: query.skip } : {}),
          ...(query.take ? { take: query.take } : { take: 10 }),
          include: {
            images: true,
          },
        }),
    );
  }

  async findOne(storeId: string, id: string): Promise<ProductDto> {
    return await this.withErrorHandling(
      async () =>
        await this.getClient().product.findUniqueOrThrow({
          where: { id, storeId, deletedAt: null },
          include: {
            images: true,
            brand: true,
            category: true,
            tags: {
              select: {
                tag: true,
              },
            },
            variantCombinations: {
              include: {
                inventory: true,
                options: true,
                pricing: {
                  include: {
                    currency: true,
                  },
                },
                promotions: {
                  include: {
                    promotion: true,
                  },
                },
              },
            },
            variantLabels: {
              include: {
                options: true,
              },
            },
          },
        }),
    );
  }

  async createOne(
    tx: Prisma.TransactionClient,
    storeId: string,
    metadata: ProductInput,
  ) {
    return this.withErrorHandling(
      async () =>
        await this.getClient(tx).product.create({
          data: {
            ...metadata,
            storeId,
          },
        }),
    );
  }

  async updateOne(
    storeId: string,
    id: string,
    input: ProductUpdateDto,
  ): Promise<ProductDto> {
    return await this.withErrorHandling(
      async () =>
        await this.getClient().product.update({
          where: { id, storeId },
          data: input,
        }),
    );
  }

  async deleteOne(storeId: string, id: string): Promise<void> {
    return await this.withErrorHandling(async () => {
      const existing = await this.findOne(storeId, id);

      if (!existing || existing.deletedAt) {
        throw new NotFoundException(`Product ${id} not found`);
      }

      await this.updateOne(storeId, id, {
        deletedAt: new Date(),
      });
    });
  }
}
