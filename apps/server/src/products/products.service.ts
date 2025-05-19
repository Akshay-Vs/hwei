import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import {
  ProductDto,
  ProductInputDto,
  ProductUpdateDto,
} from './schemas/products.schema';
import { PaginationQueryDTO } from './schemas/query-schema';
import { handleInternalError } from '@errors/handlers/internal.error.handler';
import { Prisma } from '@/generated';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(ProductsService.name);
  private readonly entity = 'Product';

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
      });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async createOne(input: ProductInputDto): Promise<ProductDto> {
    try {
      return await this.prisma.product.create({ data: input });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async createMany(input: ProductInputDto[]): Promise<Prisma.BatchPayload> {
    try {
      return await this.prisma.product.createMany({
        data: input,
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
