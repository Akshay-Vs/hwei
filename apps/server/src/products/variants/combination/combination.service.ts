import { Prisma } from '@/generated';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { handleInternalError } from 'src/errors/handlers/internal.error.handler';
import {
  CombinationInputDto,
  CombinationUpdateDto,
} from 'src/products/schemas/variants.schema';

@Injectable()
export class CombinationService {
  private readonly entity = 'Combination';
  private readonly logger = new Logger(CombinationService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(productId: string) {
    try {
      return await this.prisma.variantCombination.findMany({
        where: {
          productId,
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

  async findOne(productId: string, id: string) {
    try {
      return await this.prisma.variantCombination.findUniqueOrThrow({
        where: {
          id,
          productId,
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

  async createOne(tx: Prisma.TransactionClient, input: CombinationInputDto) {
    try {
      return await tx.variantCombination.create({ data: input });
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
    productId: string,
    id: string,
    input: CombinationUpdateDto,
  ) {
    try {
      return await tx.variantCombination.update({
        where: {
          id,
          productId,
        },
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

  async deleteOne(tx: Prisma.TransactionClient, productId: string, id: string) {
    try {
      return await tx.variantCombination.delete({
        where: {
          id,
          productId,
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
