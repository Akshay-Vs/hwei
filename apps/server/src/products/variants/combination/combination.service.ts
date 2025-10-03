import { Prisma } from '@/generated';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { handleInternalError } from '@errors/handlers/internal.error.handler';
import {
  Combination,
  CombinationInput,
  CombinationUpdateDTO,
} from '@hwei/schema/dto/variants.schema';
import { BaseService } from 'src/common/services/base.service';

@Injectable()
export class CombinationService extends BaseService {
  protected readonly entity = 'Combination';
  protected readonly logger = new Logger(CombinationService.name);

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async findAll(productId: string) {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Finding all combinations for product ${productId}`);
      return await this.getClient().variantCombination.findMany({
        where: {
          productId,
        },
      });
    });
  }

  async findOne(productId: string, id: string) {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Finding combination ${id} for product ${productId}`);
      return await this.getClient().variantCombination.findUniqueOrThrow({
        where: {
          id,
          productId,
        },
      });
    });
  }

  async createTx(
    tx: Prisma.TransactionClient,
    input: CombinationInput,
  ): Promise<Combination> {
    return this.withErrorHandling(async () => {
      this.logger.debug(
        `Creating combination for product ${input.productId} in transaction`,
      );
      return await this.getClient(tx).variantCombination.create({
        data: input,
      });
    });
  }

  async updateOne(
    tx: Prisma.TransactionClient,
    productId: string,
    id: string,
    input: CombinationUpdateDTO,
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
