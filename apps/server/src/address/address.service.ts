import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { BaseService } from 'src/common/services/base.service';

import {
  Address,
  CreateAddressDto,
  UpdateAddressDto,
  AddressDto,
} from '@hwei/schema/dto/address.schema';

import { Prisma } from '@/generated';
import { PaginationQuery } from '@hwei/schema/dto/query-schema';

@Injectable()
export class AddressService extends BaseService {
  protected readonly entity = 'address';
  protected readonly logger = new Logger(AddressService.name);

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async findAll(
    userId: string,
    pagination: PaginationQuery,
  ): Promise<AddressDto[]> {
    return this.withErrorHandling(() => {
      this.logger.debug(`Finding all addresses for user ${userId}`);
      return this.getClient().address.findMany({
        where: {
          userId,
          isActive: true,
        },
        skip: pagination.skip,
        take: pagination.take,
        orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
      });
    });
  }

  async findOne(id: string, userId: string): Promise<Address | null> {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Finding address with id ${id}`);
      const address = await this.getClient().address.findFirst({
        where: {
          id,
          userId,
          isActive: true,
        },
      });

      if (!address) {
        throw new NotFoundException(`Address with id ${id} not found`);
      }

      return address;
    });
  }

  async findDefault(userId: string): Promise<Address | null> {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Finding default address for user ${userId}`);
      return this.getClient().address.findFirst({
        where: {
          userId,
          isDefault: true,
          isActive: true,
        },
      });
    });
  }

  async create(userId: string, data: CreateAddressDto): Promise<Address> {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Creating new address for user ${userId}`);

      return this.prisma.$transaction(async (tx) => {
        // If this is set as default, unset other defaults
        if (data.isDefault) {
          await tx.address.updateMany({
            where: {
              userId,
              isDefault: true,
              isActive: true,
            },
            data: {
              isDefault: false,
            },
          });
        } else {
          // If this is the first address, make it default
          const existingAddressCount = await tx.address.count({
            where: {
              userId,
              isActive: true,
            },
          });

          if (existingAddressCount === 0) {
            data.isDefault = true;
          }
        }

        return tx.address.create({
          data: {
            ...data,
            userId,
          },
        });
      });
    });
  }

  async update(
    id: string,
    userId: string,
    data: UpdateAddressDto,
  ): Promise<Address> {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Updating address with id ${id}`);

      return this.prisma.$transaction(async (tx) => {
        // Check if address exists
        const existingAddress = await tx.address.findFirst({
          where: {
            id,
            userId,
            isActive: true,
          },
        });

        if (!existingAddress) {
          throw new NotFoundException(`Address with id ${id} not found`);
        }

        // If setting as default, unset other defaults
        if (data.isDefault) {
          await tx.address.updateMany({
            where: {
              userId,
              isDefault: true,
              isActive: true,
              id: {
                not: id,
              },
            },
            data: {
              isDefault: false,
            },
          });
        }

        return tx.address.update({
          where: { id },
          data,
        });
      });
    });
  }

  async setDefault(id: string, userId: string): Promise<Address> {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Setting address ${id} as default for user ${userId}`);

      return this.prisma.$transaction(async (tx) => {
        // Check if address exists
        const existingAddress = await tx.address.findFirst({
          where: {
            id,
            userId,
            isActive: true,
          },
        });

        if (!existingAddress) {
          throw new NotFoundException(`Address with id ${id} not found`);
        }

        // Unset other defaults
        await tx.address.updateMany({
          where: {
            userId,
            isDefault: true,
            isActive: true,
            id: {
              not: id,
            },
          },
          data: {
            isDefault: false,
          },
        });

        // Set this as default
        return tx.address.update({
          where: { id },
          data: {
            isDefault: true,
          },
        });
      });
    });
  }

  async delete(id: string, userId: string): Promise<void> {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Soft deleting address with id ${id}`);

      return this.prisma.$transaction(async (tx) => {
        const address = await tx.address.findFirst({
          where: {
            id,
            userId,
            isActive: true,
          },
        });

        if (!address) {
          throw new NotFoundException(`Address with id ${id} not found`);
        }

        // Soft delete the address
        await tx.address.update({
          where: { id },
          data: {
            isActive: false,
            isDefault: false,
          },
        });

        // If this was the default address, set another one as default
        if (address.isDefault) {
          const nextAddress = await tx.address.findFirst({
            where: {
              userId,
              isActive: true,
              id: {
                not: id,
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          });

          if (nextAddress) {
            await tx.address.update({
              where: { id: nextAddress.id },
              data: {
                isDefault: true,
              },
            });
          }
        }
      });
    });
  }

  async deleteMany(
    ids: string[],
    userId: string,
  ): Promise<Prisma.BatchPayload> {
    return this.withErrorHandling(async () => {
      this.logger.debug(
        `Soft deleting addresses with ids ${JSON.stringify(ids)}`,
      );

      return this.prisma.$transaction(async (tx) => {
        // Check if any of the addresses is default
        const defaultAddress = await tx.address.findFirst({
          where: {
            userId,
            id: {
              in: ids,
            },
            isDefault: true,
            isActive: true,
          },
        });

        // Soft delete addresses
        const result = await tx.address.updateMany({
          where: {
            userId,
            id: {
              in: ids,
            },
            isActive: true,
          },
          data: {
            isActive: false,
            isDefault: false,
          },
        });

        // If a default address was deleted, set another one as default
        if (defaultAddress) {
          const nextAddress = await tx.address.findFirst({
            where: {
              userId,
              isActive: true,
              id: {
                notIn: ids,
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          });

          if (nextAddress) {
            await tx.address.update({
              where: { id: nextAddress.id },
              data: {
                isDefault: true,
              },
            });
          }
        }

        return result;
      });
    });
  }
}
