import { Prisma } from '@/generated';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { BaseService } from 'src/common/services/base.service';
import { PriceInput, PriceUpdate } from '@hwei/schema/dto/price.schema';

@Injectable()
export class PricingService extends BaseService {
  protected readonly entity = 'Pricing';
  protected readonly logger = new Logger(PricingService.name);

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async findByCombination(combinationId: string) {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Finding price by combination ${combinationId}`);
      return await this.getClient().variantPricing.findUniqueOrThrow({
        where: {
          combinationId: combinationId,
        },
      });
    });
  }

  async updateByCombination(
    tx: Prisma.TransactionClient,
    combinationId: string,
    data: PriceUpdate,
  ) {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Updating price by combination ${combinationId}`);
      return await this.getClient(tx).variantPricing.update({
        where: {
          combinationId: combinationId,
        },
        data,
      });
    });
  }

  async createByCombination(tx: Prisma.TransactionClient, data: PriceInput) {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Creating price by combination ${data.combinationId}`);
      return await this.getClient(tx).variantPricing.create({
        data,
      });
    });
  }

  async deleteByCombination(
    tx: Prisma.TransactionClient,
    combinationId: string,
  ) {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Deleting price by combination ${combinationId}`);
      return await this.getClient(tx).variantPricing.delete({
        where: {
          combinationId: combinationId,
        },
      });
    });
  }
}
