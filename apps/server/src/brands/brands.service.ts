import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CreateBrandDto, UpdateBrandDto } from '@hwei/schema/dto/brands.schema';
import { handleInternalError } from '@errors/handlers/internal.error.handler';

@Injectable()
export class BrandsService {
  private readonly logger = new Logger(BrandsService.name);
  private readonly entity = 'Brand';

  constructor(private readonly prisma: PrismaService) { }

  async findAll(storeId: string) {
    try {
      this.logger.debug(`Fetching all brands for store ${storeId}`);
      return await this.prisma.brand.findMany({
        where: {
          storeId,
        },
      });
    } catch (error) {
      handleInternalError({ error, logger: this.logger, entity: this.entity });
    }
  }
  async findOne(storeId: string, id: string) {
    try {
      this.logger.debug(`Fetching brand ${id} for store ${storeId}`);
      return await this.prisma.brand.findFirstOrThrow({
        where: {
          id,
          storeId,
        },
      });
    } catch (error) {
      handleInternalError({ error, logger: this.logger, entity: this.entity });
    }
  }

  async createOne(storeId: string, brand: CreateBrandDto) {
    try {
      this.logger.debug(`Creating brand for store ${storeId}`);
      return await this.prisma.brand.create({
        data: {
          ...brand,
          storeId,
        },
      });
    } catch (error) {
      handleInternalError({ error, logger: this.logger, entity: this.entity });
    }
  }

  async updateOne(storeId: string, id: string, brand: UpdateBrandDto) {
    try {
      this.logger.debug(`Updating brand ${id} for store ${storeId}`);
      return await this.prisma.brand.update({
        where: {
          id,
          storeId,
        },
        data: brand,
      });
    } catch (error) {
      handleInternalError({ error, logger: this.logger, entity: this.entity });
    }
  }

  async deleteOne(storeId: string, id: string) {
    try {
      this.logger.debug(`Deleting brand ${id} for store ${storeId}`);
      await this.prisma.brand.deleteMany({
        where: {
          id,
          storeId,
        },
      });
      return;
    } catch (error) {
      handleInternalError({ error, logger: this.logger, entity: this.entity });
    }
  }
}
