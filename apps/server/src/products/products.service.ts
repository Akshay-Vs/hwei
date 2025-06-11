import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import {
  ProductDto,
  ProductInput,
  ProductUpdateDto,
} from './schemas/products.schema';
import { PaginationQueryDTO } from './schemas/query-schema';
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
            title: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
          skip: query.skip,
          take: query.take,
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
          where: { id, storeId },
          include: {
            images: true,
            brand: true,
            category: true,
            tags: true,
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

  async deleteOne(storeId: string, id: string): Promise<ProductDto> {
    return await this.withErrorHandling(
      async () =>
        await this.getClient().product.delete({ where: { id, storeId } }),
    );
  }
}
