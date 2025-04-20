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
import { TCreateStore } from './schemas/store.schema';
import { BaseGuards } from 'src/common/base/base.guard';
import { PrismaClientKnownRequestError } from 'generated/runtime/library';

@Injectable()
export class StoresService extends BaseGuards {
  private readonly logger = new Logger(StoresService.name);

  constructor(private readonly prisma: PrismaService) {
    super();
  }

  private generateSlug(name: string): string {
    return `${slugify(name, { lower: true })}-${uuid4()}`;
  }

  private handleUniqueConstraint(err: unknown, message: string): void {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new ConflictException(message);
    }
  }

  private async verifyOwnership(
    userId: string,
    storeId: string,
  ): Promise<Store> {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId, userId },
    });

    if (!store) {
      this.logger.debug(
        { userId, storeId },
        'Store not found or does not belong to user',
      );
      throw new NotFoundException('Store not found');
    }

    return store;
  }

  async findAll(user: User): Promise<Store[]> {
    this.userGuard(user);

    try {
      return await this.prisma.store.findMany({ where: { userId: user.id } });
    } catch (err) {
      this.logger.error(err, 'Failed to fetch stores');
      throw new InternalServerErrorException('Failed to fetch stores');
    }
  }

  async findOne(user: User, storeId: string): Promise<Store> {
    this.userGuard(user);

    try {
      this.logger.debug('Hit findOne store');

      const store = await this.prisma.store.findUnique({
        where: { id: storeId, userId: user.id },
      });

      if (!store) {
        this.logger.debug('Store not found');
        throw new NotFoundException('Store not found');
      }

      return store;
    } catch (err) {
      this.logger.error(err, 'Failed to fetch store');
      throw new InternalServerErrorException('Failed to fetch store');
    }
  }

  async createOne(user: User, input: TCreateStore): Promise<Store> {
    this.userGuard(user);

    try {
      return await this.prisma.store.create({
        data: {
          ...input,
          slug: this.generateSlug(input.name),
          userId: user.id,
        },
      });
    } catch (err) {
      this.logger.error(err, 'Failed to create store');
      this.handleUniqueConstraint(
        err,
        'Store name already exists. Please choose a different name.',
      );
      throw new InternalServerErrorException('Failed to create store');
    }
  }

  async editOne(
    user: User,
    storeId: string,
    input: TCreateStore,
  ): Promise<Store> {
    this.userGuard(user);

    try {
      await this.verifyOwnership(user.id, storeId);

      return await this.prisma.store.update({
        where: { id: storeId, userId: user.id },
        data: {
          ...input,
          slug: this.generateSlug(input.name),
        },
      });
    } catch (err) {
      this.logger.error(err, 'Failed to update store');
      this.handleUniqueConstraint(
        err,
        'Store name already exists. Please choose a different name.',
      );
      throw new InternalServerErrorException('Failed to update store');
    }
  }

  async deleteOne(user: User, storeId: string): Promise<void> {
    this.userGuard(user);

    try {
      await this.prisma.store.delete({
        where: { id: storeId, userId: user.id },
      });
    } catch (err) {
      this.logger.error(err, 'Failed to delete store');
      throw new InternalServerErrorException('Failed to delete store');
    }
  }
}
