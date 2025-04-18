import { User } from '@clerk/backend';
import slugify from 'slugify';
import { v4 as uuid4 } from 'uuid';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { Store } from 'generated';
import { PrismaService } from 'src/common/database/prisma.service';
import {
  CreateStoreInput,
  createStoreInputSchema,
} from './schemas/store.schema';
import { BaseGuards } from 'src/common/base/base.guard';
import { PrismaClientKnownRequestError } from 'generated/runtime/library';

@Injectable()
export class StoresService extends BaseGuards {
  private readonly ctx = 'Store Route';

  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  private generateSlug(name: string) {
    return `${slugify(name, { lower: true })}-${uuid4()}`;
  }

  async findAll(user: User): Promise<Store[]> {
    this.userGuard(user);

    try {
      return this.prismaService.store.findMany({
        where: {
          userId: user.id,
        },
      });
    } catch (err) {
      Logger.error(JSON.stringify(err, null, 2), this.ctx);
      throw new InternalServerErrorException('Failed to fetch stores');
    }
  }

  async findOne(user: User, storeId: string): Promise<Store> {
    this.userGuard(user);

    try {
      Logger.debug('Hit findOne store', this.ctx);
      const store = await this.prismaService.store.findUnique({
        where: {
          id: storeId,
          userId: user.id,
        },
      });

      if (!store) {
        Logger.debug('Store not found', this.ctx);
        throw new NotFoundException('Store not found');
      }

      Logger.debug('Returning store', this.ctx);
      return store;
    } catch (err) {
      Logger.error(JSON.stringify(err, null, 2), this.ctx);
      throw new InternalServerErrorException('Failed to fetch store');
    }
  }
  async createOne(user: User, fields: CreateStoreInput): Promise<Store> {
    this.userGuard(user);
    this.zodGuard(createStoreInputSchema, fields);

    try {
      const slug = this.generateSlug(fields.name);
      const data = { slug, ...fields };
      Logger.debug(data, this.ctx);

      const store = await this.prismaService.store.create({
        data,
      });

      return store;
    } catch (err) {
      Logger.error(JSON.stringify(err, null, 2), this.ctx);

      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new ConflictException(
          'Store name already exists. Please choose a different name.',
        );
      }
      throw new InternalServerErrorException('Failed to create store');
    }
  }

  async editOne(
    user: User,
    storeId: string,
    fields: CreateStoreInput,
  ): Promise<Store> {
    this.userGuard(user);

    try {
      // check if the store exists and belongs to the user
      const existingStore = await this.prismaService.store.findUnique({
        where: {
          id: storeId,
          userId: user.id,
        },
      });

      if (!existingStore) {
        Logger.debug('Store not found or does not belong to user', this.ctx);
        throw new NotFoundException('Store not found');
      }
      const slug = this.generateSlug(fields.name);

      Logger.debug(`Updating store: ${storeId}`, this.ctx);

      const updatedStore = await this.prismaService.store.update({
        where: {
          id: storeId,
          userId: user.id,
        },
        data: {
          slug,
          ...fields,
        },
      });

      return updatedStore;
    } catch (err) {
      Logger.error(JSON.stringify(err, null, 2), this.ctx);

      if (err instanceof NotFoundException) {
        throw err;
      }

      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new ConflictException(
          'Store name already exists. Please choose a different name.',
        );
      }

      throw new InternalServerErrorException('Failed to update store');
    }
  }

  async deleteOne(user: User, storeId: string) {
    this.userGuard(user);

    try {
      return await this.prismaService.store.delete({
        where: {
          id: storeId,
          userId: user.id,
        },
      });
    } catch (err) {
      Logger.error(JSON.stringify(err, null, 2), this.ctx);
      throw new InternalServerErrorException('Failed to delete store');
    }
  }
}
