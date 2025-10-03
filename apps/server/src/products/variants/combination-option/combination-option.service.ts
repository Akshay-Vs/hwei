import { Prisma } from '@/generated';
import { Injectable, Logger } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class CombinationOptionService extends BaseService {
  protected readonly entity = 'CombinationOption';
  protected readonly logger = new Logger(CombinationOptionService.name);

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async attachCombinationOption(
    tx: Prisma.TransactionClient,
    combinationId: string,
    optionId: string,
  ): Promise<void> {
    return this.withErrorHandling(async () => {
      this.logger.debug(
        `Attaching option ${optionId} to combination ${combinationId}`,
      );
      await tx.variantCombinationOption.create({
        data: {
          combinationId,
          optionId,
        },
      });
    });
  }

  async detachCombinationOption(
    tx: Prisma.TransactionClient,
    combinationId: string,
    optionId: string,
  ): Promise<void> {
    return this.withErrorHandling(async () => {
      this.logger.debug(
        `Detaching option ${optionId} from combination ${combinationId}`,
      );
      await tx.variantCombinationOption.delete({
        where: {
          combinationId_optionId: {
            combinationId,
            optionId,
          },
        },
      });
    });
  }
}
