import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateBrandDto, UpdateBrandDto } from './schemas/brands.schema';
import { PrismaClientKnownRequestError } from 'generated/runtime/library';

@Injectable()
export class BrandsService {
  private readonly logger = new Logger(BrandsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(storeId: string) {
    try {
      return this.prisma.brand.findMany({
        where: {
          storeId,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to fetch brands');
    }
  }
  async findOne(storeId: string, id: string) {
    try {
      return this.prisma.brand.findUnique({
        where: {
          id,
          storeId,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to fetch brand');
    }
  }

  async createOne(storeId: string, brand: CreateBrandDto) {
    try {
      return await this.prisma.brand.create({
        data: {
          ...brand,
          storeId,
        },
      });
    } catch (error) {
      this.logger.error(error);

      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException('Brand with this name already exists');
      }

      throw new InternalServerErrorException('Failed to create brand');
    }
  }

  async updateOne(storeId: string, id: string, brand: UpdateBrandDto) {
    try {
      return await this.prisma.brand.update({
        where: {
          id,
          storeId,
        },
        data: brand,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to update brand');
    }
  }

  async deleteOne(storeId: string, id: string) {
    try {
      return await this.prisma.brand.delete({
        where: {
          id,
          storeId,
        },
      });
    } catch (error) {
      this.logger.error(error);

      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Brand not found');
      }

      throw new InternalServerErrorException('Failed to delete brand');
    }
  }
}
