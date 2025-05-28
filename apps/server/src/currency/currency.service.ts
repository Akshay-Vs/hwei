import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { BaseService } from 'src/common/services/base.service';
import {
  Currency,
  CurrencyInput,
  CurrencyPagination,
  CurrencyUpdate,
} from './schemas/currency.schema';
import { Prisma } from '@/generated';

@Injectable()
export class CurrencyService extends BaseService {
  protected readonly entity = 'currency';
  protected readonly logger = new Logger(CurrencyService.name);

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async findAll(
    storeId: string,
    pagination: CurrencyPagination,
  ): Promise<Currency[]> {
    return this.withErrorHandling(() => {
      this.logger.debug(`Finding all currencies for store ${storeId}`);
      return this.getClient().currency.findMany({
        where: {
          storeId,
          name: {
            contains: pagination.name,
            mode: 'insensitive',
          },
          code: {
            contains: pagination.code,
            mode: 'insensitive',
          },
        },
        skip: pagination.skip,
        take: pagination.take,
      });
    });
  }

  async findOne(id: string): Promise<Currency | null> {
    return this.withErrorHandling(() => {
      this.logger.debug(`Finding currency with id ${id}`);
      return this.getClient().currency.findUnique({
        where: {
          id,
        },
      });
    });
  }

  async create(data: CurrencyInput): Promise<Currency> {
    return this.withErrorHandling(() => {
      this.logger.debug(`Creating currency: ${JSON.stringify(data.code)}`);
      return this.getClient().currency.create({
        data,
      });
    });
  }

  async createMany(data: CurrencyInput[]): Promise<Prisma.BatchPayload> {
    return this.withErrorHandling(() => {
      this.logger.debug(
        `Creating currencies with data ${JSON.stringify(data)}`,
      );
      return this.getClient().currency.createMany({
        data,
      });
    });
  }

  async update(id: string, data: CurrencyUpdate): Promise<Currency> {
    return this.withErrorHandling(() => {
      this.logger.debug(
        `Updating currency with id ${id} with data ${JSON.stringify(data)}`,
      );
      return this.getClient().currency.update({
        where: {
          id,
        },
        data,
      });
    });
  }

  async delete(id: string): Promise<Currency> {
    return this.withErrorHandling(() => {
      this.logger.debug(`Deleting currency with id ${id}`);
      return this.getClient().currency.delete({
        where: {
          id,
        },
      });
    });
  }

  async deleteMany(ids: string[]): Promise<Prisma.BatchPayload> {
    return this.withErrorHandling(() => {
      this.logger.debug(`Deleting currencies with ids ${JSON.stringify(ids)}`);
      return this.getClient().currency.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
    });
  }
}
