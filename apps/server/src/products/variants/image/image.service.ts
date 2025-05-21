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

  async findByCombination(
    combinationId: string,
    input: PaginationQuery,
  ): Promise<Image[]> {
    return await this.execute(async () => {
      this.logger.debug(
        `Finding images for combination ${combinationId} with pagination: ${JSON.stringify(input)}`,
      );
      const result = await this.getClient().variantImage.findMany({
        where: {
          combinationId,
        },
        skip: input.skip,
        take: input.take,
        orderBy: {
          sortOrder: 'asc',
        },
      });
      this.logger.debug(
        `Found ${result.length} images for combination ${combinationId}`,
      );
      return result;
    });
  }

  async findByCombinationTx(
    tx: Prisma.TransactionClient,
    combinationId: string,
  ): Promise<Image[]> {
    return await this.execute(async () => {
      this.logger.debug(
        `Finding images for combination ${combinationId} in transaction`,
      );
      const result = await this.getClient(tx).variantImage.findMany({
        where: {
          combinationId,
        },
      });
      this.logger.debug(
        `Found ${result.length} images for combination ${combinationId} in transaction`,
      );
      return result;
    });
  }

  async findOne(id: string, combinationId: string): Promise<Image> {
    return this.execute(async () => {
      this.logger.debug(
        `Finding image with id ${id} for combination ${combinationId}`,
      );
      const result = await this.getClient().variantImage.findUniqueOrThrow({
        where: {
          id,
          combinationId,
        },
      });
      this.logger.debug(`Found image ${id} for combination ${combinationId}`);
      return result;
    });
  }

  async createOne(
    tx: Prisma.TransactionClient,
    data: ImageInput,
  ): Promise<Image> {
    return await this.execute(async () => {
      this.logger.debug(
        `Creating new image in transaction: ${JSON.stringify(data)}`,
      );
      const result = await this.getClient(tx).variantImage.create({
        data,
      });
      this.logger.debug(`Created new image with id ${result.id}`);
      return result;
    });
  }

  async updateOne(
    tx: Prisma.TransactionClient,
    id: string,
    data: ImageUpdate,
  ): Promise<Image> {
    return await this.execute(async () => {
      this.logger.debug(
        `Updating image ${id} in transaction: ${JSON.stringify(data)}`,
      );
      const result = await this.getClient(tx).variantImage.update({
        where: { id },
        data,
      });
      this.logger.debug(`Updated image ${id}`);
      return result;
    });
  }

  async deleteOne(tx: Prisma.TransactionClient, id: string): Promise<Image> {
    return await this.execute(async () => {
      this.logger.debug(`Deleting image ${id} in transaction`);
      const result = await this.getClient(tx).variantImage.delete({
        where: { id },
      });
      this.logger.debug(`Deleted image ${id}`);
      return result;
    });
  }

  async deleteMany(
    tx: Prisma.TransactionClient,
    ids: string[],
  ): Promise<Prisma.BatchPayload> {
    return await this.execute(async () => {
      this.logger.debug(
        `Deleting multiple images in transaction: ${JSON.stringify(ids)}`,
      );
      const result = await this.getClient(tx).variantImage.deleteMany({
        where: {
          id: { in: ids },
        },
      });
      this.logger.debug(`Deleted ${result.count} images`);
      return result;
    });
  }
}
