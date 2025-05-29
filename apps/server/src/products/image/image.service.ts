import { Prisma } from '@/generated';
import { Injectable, Logger } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { PrismaService } from 'src/common/database/prisma.service';
import { PaginationQuery } from 'src/products/schemas/query-schema';
import {
  Image,
  ImageInput,
  ImageUpdate,
} from 'src/products/schemas/images.schema';

@Injectable()
export class ImageService extends BaseService {
  protected readonly entity = 'productImage';
  protected readonly logger = new Logger(ImageService.name);

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async findByProduct(
    productId: string,
    pagination: PaginationQuery,
  ): Promise<Image[]> {
    return await this.withErrorHandling(async () => {
      this.logger.debug(
        `Finding image for product ${productId} with pagination: ${JSON.stringify(
          pagination,
        )}`,
      );
      const result = await this.getClient().productImage.findMany({
        where: {
          productId,
        },
        skip: pagination.skip,
        take: pagination.take,
      });
      return result;
    });
  }

  async findOne(id: string, productId: string): Promise<Image> {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Finding image with id ${id} for product ${productId}`);
      const result = await this.getClient().productImage.findUniqueOrThrow({
        where: {
          id,
          productId,
        },
      });
      return result;
    });
  }

  async createOneTx(
    tx: Prisma.TransactionClient,
    data: ImageInput,
  ): Promise<Image> {
    return await this.withErrorHandling(async () => {
      this.logger.debug(`Creating new image in transaction`);
      const result = await this.getClient(tx).productImage.create({
        data,
      });
      return result;
    });
  }

  async createManyTx(
    tx: Prisma.TransactionClient,
    data: ImageInput[],
  ): Promise<Prisma.BatchPayload> {
    return await this.withErrorHandling(async () => {
      this.logger.debug(`Creating new images in transaction`);
      const result = await this.getClient(tx).productImage.createMany({
        data: Object.values(data),
      });
      return result;
    });
  }

  async updateOne(
    tx: Prisma.TransactionClient,
    id: string,
    data: ImageUpdate,
  ): Promise<Image> {
    return await this.withErrorHandling(async () => {
      this.logger.debug(`Updating image ${id} in transaction`);
      const result = await this.getClient(tx).productImage.update({
        where: { id },
        data,
      });
      return result;
    });
  }

  async deleteOne(tx: Prisma.TransactionClient, id: string): Promise<Image> {
    return await this.withErrorHandling(async () => {
      this.logger.debug(`Deleting image ${id} in transaction`);
      const result = await this.getClient(tx).productImage.delete({
        where: { id },
      });
      return result;
    });
  }

  async deleteMany(
    tx: Prisma.TransactionClient,
    ids: string[],
  ): Promise<Prisma.BatchPayload> {
    return await this.withErrorHandling(async () => {
      this.logger.debug(
        `Deleting multiple images in transaction ${JSON.stringify(ids)}`,
      );
      const result = await this.getClient(tx).productImage.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      return result;
    });
  }
}
