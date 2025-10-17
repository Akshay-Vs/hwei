import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { BaseService } from 'src/common/services/base.service';

import {
  Currency,
  CreateCurrency,
  CurrencyPagination,
  UpdateCurrency,
} from '@hwei/schema/dto/currency.schema';

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
          label: {
            contains: pagination.label,
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
    return this.withErrorHandling(async () => {
      this.logger.debug(`Finding currency with id ${id}`);
      const res = await this.getClient().currency.findUnique({
        where: {
          id,
        },
      });

      if (!res) throw new NotFoundException(`Currency ${id} not found`);
      return res;
    });
  }

  async create(storeId: string, data: CreateCurrency): Promise<Currency> {
    return this.withErrorHandling(() => {
      this.logger.debug(`Creating currency: ${JSON.stringify(data.code)}`);
      return this.getClient().currency.create({
        data: {
          ...data,
          storeId,
        },
      });
    });
  }

  async createMany(
    storeId: string,
    data: CreateCurrency[],
  ): Promise<Prisma.BatchPayload> {
    return this.withErrorHandling(() => {
      this.logger.debug(
        `Creating currencies with data ${JSON.stringify(data)}`,
      );
      return this.getClient().currency.createMany({
        data: {
          ...data.map((currency) => ({
            ...currency,
            storeId,
          })),
        },
      });
    });
  }

  async update(id: string, data: UpdateCurrency): Promise<Currency> {
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
    return this.withErrorHandling(async () => {
      this.logger.debug(`Deleting currency with id ${id}`);

      const prev = await this.findOne(id);
      if (!prev) throw new NotFoundException(`Currency ${id} not found`);

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
