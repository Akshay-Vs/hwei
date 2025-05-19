import { Prisma } from '@/generated';
import { Injectable, Logger } from '@nestjs/common';
import { handleInternalError } from '@errors/handlers/internal.error.handler';

@Injectable()
export class CombinationOptionService {
  private readonly entity = 'CombinationOption';
  private readonly logger = new Logger(CombinationOptionService.name);

  async attachCombinationOption(
    tx: Prisma.TransactionClient,
    combinationId: string,
    optionId: string,
  ): Promise<void> {
    try {
      await tx.variantCombinationOption.create({
        data: {
          combinationId,
          optionId,
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

  async detachCombinationOption(
    tx: Prisma.TransactionClient,
    combinationId: string,
    optionId: string,
  ): Promise<void> {
    try {
      await tx.variantCombinationOption.delete({
        where: {
          combinationId_optionId: {
            combinationId,
            optionId,
          },
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
