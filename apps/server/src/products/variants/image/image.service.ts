import { Prisma } from '@/generated';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { handleInternalError } from 'src/common/errors/handlers/internal.error.handler';
import { ImageInput } from 'src/products/schemas/images.schema';
import { PaginationQuery } from 'src/products/schemas/query-schema';

@Injectable()
export class ImageService {
  private readonly entity = 'Image';
  private readonly logger = new Logger(ImageService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    combinationId: string,
    input: PaginationQuery,
  ): Promise<ImageInput[]> {
    try {
      this.logger.debug(`Fetching all images for variant ${combinationId}`);
      return await this.prisma.variantImage.findMany({
        where: {
          combinationId,
        },
        skip: input.skip,
        take: input.take,
        orderBy: {
          sortOrder: 'asc',
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

  async findOne(id: string, combinationId: string): Promise<ImageInput> {
    try {
      return await this.prisma.variantImage.findUniqueOrThrow({
        where: {
          id,
          combinationId,
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
    data: ImageInput,
  ): Promise<ImageInput> {
    try {
      return await tx.variantImage.create({
        data,
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
    tx: Prisma.TransactionClient,
    id: string,
    data: ImageInput,
  ): Promise<ImageInput> {
    try {
      return await tx.variantImage.update({
        where: { id },
        data,
      });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }
  async deleteOne(
    tx: Prisma.TransactionClient,
    id: string,
  ): Promise<ImageInput> {
    try {
      return await tx.variantImage.delete({
        where: { id },
      });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async deleteMany(
    tx: Prisma.TransactionClient,
    ids: string[],
  ): Promise<Prisma.BatchPayload> {
    try {
      return await tx.variantImage.deleteMany({
        where: {
          id: { in: ids },
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
}
