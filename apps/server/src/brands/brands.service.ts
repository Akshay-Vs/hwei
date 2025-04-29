import { User } from '@clerk/backend';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateBrandDto, UpdateBrandDto } from './schemas/brands.schema';

@Injectable()
export class BrandsService {
  private readonly logger = new Logger(BrandsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(storeId: string) {
    return this.prisma.brand.findMany({
      where: {
        storeId,
      },
    });
  }
  async findOne(id: string) {}

  async createOne(user: User, brand: CreateBrandDto) {}

  async updateOne(user: User, id: string, updateBrandDto: UpdateBrandDto) {}

  async deleteOne(user: User, id: string) {}
}
