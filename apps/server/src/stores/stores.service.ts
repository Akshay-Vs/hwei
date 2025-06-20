import { User } from '@clerk/backend';
import slugify from 'slugify';
import { v4 as uuid4 } from 'uuid';
import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '@database/prisma.service';
import { handleInternalError } from '@errors/handlers/internal.error.handler';
import { UpdateBrand } from 'src/brands/schemas/brands.schema';
import { CreateStore } from './schemas/store.schema';

@Injectable()
export class StoresService {
  private readonly logger = new Logger(StoresService.name);
  private readonly entity = 'Store';

  constructor(private readonly prisma: PrismaService) {}

  private generateSlug(name: string): string {
    return `${slugify(name, { lower: true })}-${uuid4()}`;
  }

  async findAll(user: User) {
    try {
      return await this.prisma.store.findMany({ where: { userId: user.id } });
    } catch (error) {
      handleInternalError({ error, entity: this.entity, logger: this.logger });
    }
  }

  async findOne(user: User, storeId: string) {
    try {
      return await this.prisma.store.findFirstOrThrow({
        where: { id: storeId, userId: user.id },
      });
    } catch (error) {
      handleInternalError({ error, entity: this.entity, logger: this.logger });
    }
  }

  async createOne(user: User, input: CreateStore) {
    try {
      return await this.prisma.store.create({
        data: {
          ...input,
          slug: this.generateSlug(input.name),
          userId: user.id,
        },
      });
    } catch (error) {
      handleInternalError({ error, entity: this.entity, logger: this.logger });
    }
  }

  async editOne(user: User, storeId: string, input: UpdateBrand) {
    try {
      return await this.prisma.store.update({
        where: { id: storeId, userId: user.id },
        data: {
          ...input,
        },
      });
    } catch (error) {
      handleInternalError({ error, entity: this.entity, logger: this.logger });
    }
  }

  async deleteOne(user: User, storeId: string): Promise<void> {
    try {
      await this.prisma.store.deleteMany({
        where: { id: storeId, userId: user.id },
      });
    } catch (error) {
      handleInternalError({ error, entity: this.entity, logger: this.logger });
    }
  }
}
