import { User } from '@clerk/backend';
import slugify from 'slugify';
import { v4 as uuid4 } from 'uuid';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@database/prisma.service';
import { handleInternalError } from '@errors/handlers/internal.error.handler';
import { UpdateBrand } from '@hwei/schema/dto/brands.schema';
import { CreateStore } from '@hwei/schema/dto/store.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StoresService {
  private readonly logger = new Logger(StoresService.name);
  private readonly entity = 'Store';

  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) { }

  private generateSlug(name: string): string {
    return `${slugify(name, { lower: true })}-${uuid4()}`;
  }

  async findAll(user: User) {
    try {
      return await this.prisma.store.findMany({
        where: { userId: user.id, deletedAt: null },
      });
    } catch (error) {
      handleInternalError({ error, entity: this.entity, logger: this.logger });
    }
  }

  async findOne(user: User, storeId: string) {
    try {
      return await this.prisma.store.findFirstOrThrow({
        where: { id: storeId, userId: user.id, deletedAt: null },
      });
    } catch (error) {
      handleInternalError({ error, entity: this.entity, logger: this.logger });
    }
  }

  async createOne(clerkUser: User, input: CreateStore) {
    try {
      this.logger.debug('Creating new store for user ' + clerkUser.id);

      const user = await this.userService.findByClerkId(clerkUser.id);

      if (!user) {
        throw new NotFoundException(`User not found`);
      }

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

  async deleteOne(user: User, storeId: string) {
    try {
      const prev = await this.findOne(user, storeId);

      if (!prev) {
        throw new NotFoundException(`Store [id=${storeId}] not found.`);
      }
      const deletedAt = new Date();
      const res = await this.prisma.store.update({
        where: { id: storeId, userId: user.id },
        data: {
          deletedAt: deletedAt,
          name: prev.name.concat(`-deleted-${deletedAt.toISOString()}`),
          isActive: false,
        },
      });

      if (process.env.NODE_ENV === 'TEST' || process.env.NODE_ENV === 'DEV') {
        this.logger.debug(res);
        return res;
      }
    } catch (error) {
      handleInternalError({ error, entity: this.entity, logger: this.logger });
    }
  }
}
