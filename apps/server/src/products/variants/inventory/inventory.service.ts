import { Prisma } from '@/generated';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { BaseService } from 'src/common/services/base.service';
import {
  InventoryFilter,
  InventoryInput,
  InventoryUpdate,
} from 'src/products/schemas/inventory.schema';

@Injectable()
export class InventoryService extends BaseService {
  protected readonly entity = 'variantInventory';
  protected readonly logger = new Logger(InventoryService.name);

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async findStock(id: string, combinationId: string, filter: InventoryFilter) {
    return this.withErrorHandling(async () => {
      this.logger.debug(
        `Getting stock for variant ${id} and combination ${combinationId}`,
      );

      const result = await this.getClient().variantInventory.findFirstOrThrow({
        where: {
          id,
          combinationId,
          ...(filter.stock !== undefined && {
            stock: {
              gte: filter.stock,
            },
          }),
        },
      });

      return result;
    });
  }

  async createStockTx(tx: Prisma.TransactionClient, input: InventoryInput) {
    return this.withErrorHandling(async () => {
      this.logger.debug(
        `Creating stock for variant ${input.combinationId} with stock ${input.stock} in transaction`,
      );
      const result = await this.getClient(tx).variantInventory.create({
        data: input,
      });
      return result;
    });
  }

  async updateStockTx(
    tx: Prisma.TransactionClient,
    id: string,
    combinationId: string,
    input: InventoryUpdate,
  ) {
    return this.withErrorHandling(async () => {
      this.logger.debug(
        `Updating stock for variant ${id} and combination ${combinationId} to ${input.stock} in transaction`,
      );
      const result = await this.getClient(tx).variantInventory.update({
        where: {
          id: id,
          combinationId,
        },
        data: input,
      });
      return result;
    });
  }

  async deleteInventoryTx(
    tx: Prisma.TransactionClient,
    id: string,
    combinationId: string,
  ) {
    return this.withErrorHandling(async () => {
      this.logger.debug(
        `Deleting inventory for variant ${id} and combination ${combinationId} in transaction`,
      );
      const result = await this.getClient(tx).variantInventory.delete({
        where: {
          id: id,
          combinationId,
        },
      });
      return result;
    });
  }
}
