import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import {
  ProductDto,
  ProductInput,
  ProductUpdateDto,
} from './schemas/products.schema';
import { PaginationQueryDTO } from './schemas/query-schema';
import { handleInternalError } from '@errors/handlers/internal.error.handler';
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
    try {
      return await this.prisma.product.findMany({
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
      });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async findOne(storeId: string, id: string): Promise<ProductDto> {
    try {
      return await this.prisma.product.findUniqueOrThrow({
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
      });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async createOne(
    tx: Prisma.TransactionClient,
    storeId: string,
    metadata: ProductInput,
  ) {
    return tx.product.create({
      data: {
        ...metadata,
        storeId,
      },
    });
  }

  async updateOne(
    storeId: string,
    id: string,
    input: ProductUpdateDto,
  ): Promise<ProductDto> {
    try {
      return await this.prisma.product.update({
        where: { id, storeId },
        data: input,
      });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async deleteOne(storeId: string, id: string): Promise<ProductDto> {
    try {
      return await this.prisma.product.delete({ where: { id, storeId } });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }
}
