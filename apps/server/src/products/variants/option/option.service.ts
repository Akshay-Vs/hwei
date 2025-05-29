import { Prisma } from '@/generated';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { BaseService } from 'src/common/services/base.service';
import {
  Option,
  OptionInput,
  OptionUpdate,
} from 'src/products/schemas/variants.schema';

@Injectable()
export class OptionService extends BaseService {
  protected readonly entity = 'VariantOption';
  protected readonly logger = new Logger(OptionService.name);

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async findAll(variantLabelId: string): Promise<Option[]> {
    return await this.withErrorHandling(async () => {
      this.logger.debug(`Finding all options for variant ${variantLabelId}`);
      return await this.getClient().variantOption.findMany({
        where: {
          variantLabelId,
        },
      });
    });
  }

  async findOne(variantLabelId: string, id: string): Promise<Option> {
    return await this.withErrorHandling(async () => {
      this.logger.debug(`Finding option ${id} for variant ${variantLabelId}`);
      return await this.getClient().variantOption.findUniqueOrThrow({
        where: {
          id,
          variantLabelId,
        },
      });
    });
  }

  async createTx(tx: Prisma.TransactionClient, input: OptionInput) {
    return await this.withErrorHandling(async () => {
      this.logger.debug(
        `Creating option for variant ${input.variantLabelId} in transaction`,
      );
      return await this.getClient(tx).variantOption.create({
        data: input,
      });
    });
  }

  async createManyTx(tx: Prisma.TransactionClient, input: OptionInput[]) {
    return await this.withErrorHandling(async () => {
      this.logger.debug(
        `Creating options for variant ${input[0].variantLabelId}`,
      );
      return await this.getClient(tx).variantOption.createMany({
        data: input,
      });
    });
  }

  async updateOne(
    tx: Prisma.TransactionClient,
    id: string,
    input: OptionUpdate,
  ) {
    return await this.withErrorHandling(async () => {
      this.logger.debug(`Updating option ${id}`);
      return await this.getClient(tx).variantOption.update({
        where: { id },
        data: input,
      });
    });
  }

  async deleteOne(tx: Prisma.TransactionClient, id: string) {
    return await this.withErrorHandling(async () => {
      this.logger.debug(`Deleting option ${id}`);
      return await this.getClient(tx).variantOption.delete({
        where: { id },
      });
    });
  }

  async deleteMany(tx: Prisma.TransactionClient, ids: string[]) {
    return await this.withErrorHandling(async () => {
      this.logger.debug(`Deleting options for variant ${JSON.stringify(ids)}`);
      return await this.getClient(tx).variantOption.deleteMany({
        where: { id: { in: ids } },
      });
    });
  }
}
