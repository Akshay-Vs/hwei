import { Injectable, Logger } from '@nestjs/common';
import {
  CreateCategory,
  UpdateCategory,
} from '@hwei/schema/dto/categories.schema';
import { PrismaService } from '@database/prisma.service';
import { handleInternalError } from '@errors/handlers/internal.error.handler';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);
  private readonly entity = 'Category';

  constructor(private readonly prisma: PrismaService) { }

  async findAll(storeId: string) {
    try {
      return await this.prisma.category.findMany({
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
      return await this.prisma.category.findFirstOrThrow({
        where: {
          storeId,
          id,
        },
      });
    } catch (error) {
      handleInternalError({ error, logger: this.logger, entity: this.entity });
    }
  }

  async createOne(storeId: string, category: CreateCategory) {
    try {
      this.logger.debug('Creating category', category);
      return await this.prisma.category.create({
        data: {
          storeId,
          ...category,
        },
      });
    } catch (error) {
      handleInternalError({ error, logger: this.logger, entity: this.entity });
    }
  }

  async updateOne(storeId: string, id: string, category: UpdateCategory) {
    try {
      return await this.prisma.category.update({
        where: {
          id,
          storeId,
        },
        data: {
          ...category,
        },
      });
    } catch (error) {
      handleInternalError({ error, logger: this.logger, entity: this.entity });
    }
  }

  async deleteOne(storeId: string, id: string) {
    try {
      await this.prisma.category.deleteMany({
        where: {
          id: id,
          storeId,
        },
      });
      return;
    } catch (error) {
      handleInternalError({ error, logger: this.logger, entity: this.entity });
    }
  }
}
