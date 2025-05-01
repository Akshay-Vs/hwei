import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategory, UpdateCategory } from './schemas/categories.schema';
import { PrismaService } from 'src/common/database/prisma.service';
import { PrismaClientKnownRequestError } from 'generated/runtime/library';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);
  constructor(private readonly prisma: PrismaService) {}

  async findAll(storeId: string) {
    try {
      return this.prisma.category.findMany({
        where: {
          storeId,
        },
      });
    } catch (error) {
      this.logger.error('Failed to retrieve categories', error);
      throw new InternalServerErrorException('Failed to retrieve categories');
    }
  }

  async findOne(storeId: string, id: string) {
    try {
      return this.prisma.category.findFirst({
        where: {
          storeId,
          id,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to retrieve category with id ${id}`, error);
      throw new InternalServerErrorException('Failed to retrieve category');
    }
  }

  async createOne(storeId: string, category: CreateCategory) {
    try {
      return this.prisma.category.create({
        data: {
          storeId,
          ...category,
        },
      });
    } catch (error) {
      this.logger.error('Failed to create category', error);

      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException('Brand with this name already exists');
      }

      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async updateOne(storeId: string, id: string, category: UpdateCategory) {
    try {
      return this.prisma.category.update({
        where: {
          id,
          storeId,
        },
        data: {
          ...category,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to update category with id ${id}`, error);

      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Category not found');
      }

      throw new InternalServerErrorException('Failed to update category');
    }
  }

  async deleteOne(storeId: string, id: string) {
    try {
      return this.prisma.category.delete({
        where: {
          id: id,
          storeId,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to delete category with id ${id}`, error);

      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Brand not found');
      }

      throw new InternalServerErrorException('Failed to delete category');
    }
  }
}
