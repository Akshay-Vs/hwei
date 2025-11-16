import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { BaseService } from 'src/common/services/base.service';

import { User, UpdateUserDto, RoleEnum } from '@hwei/schema/dto/user.schema';

import { User as ClerkUser } from '@clerk/backend';
import { Prisma } from '@/generated';
import { PaginationQuery } from '@hwei/schema/dto/query-schema';

@Injectable()
export class UserService extends BaseService {
  protected readonly entity = 'user';
  protected readonly logger = new Logger(UserService.name);

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  //#region Admin Routes
  async findAll(pagination: PaginationQuery): Promise<User[]> {
    return this.withErrorHandling(() => {
      this.logger.debug('Finding all users');
      return this.getClient().user.findMany({
        where: {
          deletedAt: null,
        },
        skip: pagination.skip,
        take: pagination.take,
        orderBy: {
          createdAt: 'desc',
        },
      });
    });
  }

  async updateRole(id: string, role: RoleEnum): Promise<User> {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Updating admin user with id ${id}`);

      // Check if user exists
      const existingUser = await this.getClient().user.findFirst({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!existingUser) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return this.getClient().user.update({
        where: { id },
        data: {
          role,
        },
      });
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Finding user with email ${email}`);
      return this.getClient().user.findFirst({
        where: {
          email,
          deletedAt: null,
        },
      });
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Finding user with id ${id}`);
      const user = await this.getClient().user.findFirst({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return user;
    });
  }

  async deleteMany(ids: string[]): Promise<Prisma.BatchPayload> {
    return this.withErrorHandling(() => {
      this.logger.debug(`Soft deleting users with ids ${JSON.stringify(ids)}`);

      return this.getClient().user.updateMany({
        where: {
          id: {
            in: ids,
          },
          deletedAt: null,
        },
        data: {
          deletedAt: new Date(),
          status: 'DELETED',
        },
      });
    });
  }

  async findOne(id: string): Promise<User | null> {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Finding user with id ${id}`);
      const user = await this.getClient().user.findFirst({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return user;
    });
  }
  //#endregion

  async findByClerkId(clerkId: string): Promise<User | null> {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Finding user with clerkId ${clerkId}`);
      return this.getClient().user.findFirst({
        where: {
          clerkId,
          deletedAt: null,
        },
      });
    });
  }

  async create(user: ClerkUser): Promise<User> {
    return this.withErrorHandling(async () => {
      this.logger.debug('Creating new user');

      const { fullName, id: clerkId, emailAddresses, imageUrl } = user;

      return this.getClient().user.create({
        data: {
          fullName,
          clerkId,
          email: emailAddresses[0].emailAddress,
          avatar: imageUrl,
        },
      });
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Updating user with id ${id}`);

      // Check if user exists
      const existingUser = await this.getClient().user.findFirst({
        where: {
          id,
          deletedAt: null,
        },
      });

      if (!existingUser) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return this.getClient().user.update({
        where: { id },
        data: {
          ...data,
        },
      });
    });
  }

  async delete(clerkId: string): Promise<void> {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Soft deleting user with clerk id ${clerkId}`);

      const user = await this.getClient().user.findFirst({
        where: {
          clerkId,
          deletedAt: null,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with clerk id ${clerkId} not found`);
      }

      await this.getClient().user.update({
        where: { clerkId },
        data: {
          deletedAt: new Date(),
          status: 'DELETED',
        },
      });
    });
  }
}
