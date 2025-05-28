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
  protected readonly entity = 'variantImage';
  protected readonly logger = new Logger(ImageService.name);

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async _findImage(
    combinationId: string,
    pagination: PaginationQuery,
    tx?: Prisma.TransactionClient,
  ) {
    this.logger.debug(
      `Finding image for combination ${combinationId} with pagination: ${JSON.stringify(
        pagination,
      )}${tx ? ' in transaction' : ''}`,
    );
    const result = await this.getClient(tx).variantImage.findMany({
      where: {
        combinationId,
      },
      skip: pagination.skip,
      take: pagination.take,
    });
    return result;
  }

  async findByCombination(
    combinationId: string,
    pagination: PaginationQuery,
  ): Promise<Image[]> {
    return await this.withErrorHandling(async () =>
      this._findImage(combinationId, pagination),
    );
  }

  async findByCombinationTx(
    tx: Prisma.TransactionClient,
    combinationId: string,
    pagination: PaginationQuery,
  ): Promise<Image[]> {
    return await this.withErrorHandling(async () =>
      this._findImage(combinationId, pagination, tx),
    );
  }

  async findOne(id: string, combinationId: string): Promise<Image> {
    return this.withErrorHandling(async () => {
      this.logger.debug(
        `Finding image with id ${id} for combination ${combinationId}`,
      );
      const result = await this.getClient().variantImage.findUniqueOrThrow({
        where: {
          id,
          combinationId,
        },
      });
      return result;
    });
  }

  async createOne(
    tx: Prisma.TransactionClient,
    data: ImageInput,
  ): Promise<Image> {
    return await this.withErrorHandling(async () => {
      this.logger.debug(`Creating new image in transaction`);
      const result = await this.getClient(tx).variantImage.create({
        data,
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
      const result = await this.getClient(tx).variantImage.update({
        where: { id },
        data,
      });
      return result;
    });
  }

  async deleteOne(tx: Prisma.TransactionClient, id: string): Promise<Image> {
    return await this.withErrorHandling(async () => {
      this.logger.debug(`Deleting image ${id} in transaction`);
      const result = await this.getClient(tx).variantImage.delete({
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
      const result = await this.getClient(tx).variantImage.deleteMany({
        where: {
          id: { in: ids },
        },
      });
      return result;
    });
  }
}
