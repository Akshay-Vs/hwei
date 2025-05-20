import { PrismaService } from 'src/common/database/prisma.service';
import { Logger } from '@nestjs/common';
import { handleInternalError } from 'src/common/errors/handlers/internal.error.handler';
import { Prisma } from '@/generated';

export abstract class BaseService {
  protected abstract readonly entity: string;
  protected abstract readonly logger: Logger;

  constructor(protected readonly prisma: PrismaService) {}

  protected getClient(tx?: Prisma.TransactionClient) {
    return tx ?? this.prisma;
  }

  protected async execute<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }
}
