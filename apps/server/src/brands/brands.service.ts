import { User } from '@clerk/backend';
import {
  BadRequestException,
  HttpException,
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

  private async validateAuthorization(storeId: string, user: User) {
    this.logger.debug(`Validating authorization for user ${user.id}`);

    // Defensive checks
    if (!storeId || !user?.id) {
      this.logger.warn(
        `Missing required fields: storeId=${storeId}, userId=${user?.id}`,
      );
      throw new BadRequestException('Missing storeId or user information.');
    }

    try {
      const store = await this.prisma.store.findFirst({
        where: {
          id: storeId,
          userId: user.id,
        },
      });

      if (!store) {
        this.logger.warn(
          `Authorization failed: No store found for user ${user.id} and store ${storeId}`,
        );
        throw new NotFoundException('Store not found.');
      }

      this.logger.debug(
        `Authorization validated for user ${user.id} with store ${store.id}`,
      );
      return store;
    } catch (error) {
      if (error instanceof HttpException) throw error; // rethrow HttpExceptions
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
  async findAll(storeId: string) {
    return this.prisma.brand.findMany({
      where: {
        storeId,
      },
    });
  }
  async findOne(storeId: string, id: string) {
    return this.prisma.brand.findUnique({
      where: {
        id,
        storeId,
      },
    });
  }

  async createOne(storeId: string, user: User, brand: CreateBrandDto) {
    const store = await this.validateAuthorization(storeId, user);

    try {
      return await this.prisma.brand.create({
        data: {
          ...brand,
          storeId: store.id,
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

  async updateOne(
    user: User,
    storeId: string,
    id: string,
    brand: UpdateBrandDto,
  ) {
    const store = await this.validateAuthorization(storeId, user);
    try {
      return await this.prisma.brand.update({
        where: {
          id,
          storeId: store.id,
        },
        data: brand,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to update brand');
    }
  }

  async deleteOne(user: User, storeId: string, id: string) {
    const store = await this.validateAuthorization(storeId, user);
    try {
      return await this.prisma.brand.delete({
        where: {
          id,
          storeId: store.id,
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
