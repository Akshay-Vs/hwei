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

  private async _findStock(
    id: string,
    combinationId: string,
    filter: InventoryFilter,
    tx?: Prisma.TransactionClient,
  ) {
    this.logger.debug(
      `Getting stock for variant ${id} and combination ${combinationId}${tx ? ' in transaction' : ''}`,
    );

    const result = await this.getClient(tx).variantInventory.findUniqueOrThrow({
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

    this.logger.debug(
      `Found stock for variant ${id} and combination ${combinationId}${tx ? ' in transaction' : ''}: ${JSON.stringify(result)}`,
    );

    return result;
  }

  async findStock(id: string, combinationId: string, filter: InventoryFilter) {
    return await this.execute(async () =>
      this._findStock(id, combinationId, filter),
    );
  }

  async findStockTx(
    tx: Prisma.TransactionClient,
    id: string,
    combinationId: string,
    filter: InventoryFilter,
  ) {
    return await this.execute(async () =>
      this._findStock(id, combinationId, filter, tx),
    );
  }

  async createStockTx(
    tx: Prisma.TransactionClient,
    combinationId: string,
    input: InventoryInput,
  ) {
    return await this.execute(async () => {
      this.logger.debug(
        `Creating stock for variant ${input.combinationId} and combination ${combinationId} with stock ${input.stock} in transaction`,
      );
      const result = await this.getClient(tx).variantInventory.create({
        data: input,
      });
      this.logger.debug(
        `Created stock for variant ${input.combinationId} and combination ${combinationId} with stock ${input.stock}: ${JSON.stringify(
          result,
        )}`,
      );
      return result;
    });
  }

  async updateStockTx(
    tx: Prisma.TransactionClient,
    id: string,
    combinationId: string,
    input: InventoryUpdate,
  ) {
    return await this.execute(async () => {
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
      this.logger.debug(
        `Updated stock for variant ${id} and combination ${combinationId} to ${input.stock}: ${JSON.stringify(
          result,
        )}`,
      );
      return result;
    });
  }

  async deleteInventoryTx(
    tx: Prisma.TransactionClient,
    id: string,
    combinationId: string,
  ) {
    return await this.execute(async () => {
      this.logger.debug(
        `Deleting inventory for variant ${id} and combination ${combinationId} in transaction`,
      );
      const result = await this.getClient(tx).variantInventory.delete({
        where: {
          id: id,
          combinationId,
        },
      });
      this.logger.debug(
        `Deleted inventory for variant ${id} and combination ${combinationId}: ${JSON.stringify(
          result,
        )}`,
      );
      return result;
    });
  }
}
