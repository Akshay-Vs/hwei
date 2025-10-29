import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { BaseService } from 'src/common/services/base.service';

import {
  Wishlist,
  CreateWishlistItemDto,
  WishlistDto,
} from '@hwei/schema/dto/wishlist.schema';

import { Prisma } from '@/generated';
import { PaginationQuery } from '@hwei/schema/dto/query-schema';

@Injectable()
export class WishlistService extends BaseService {
  protected readonly entity = 'wishlist';
  protected readonly logger = new Logger(WishlistService.name);

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async findAll(
    storeId: string,
    userId: string,
    pagination: PaginationQuery,
  ): Promise<WishlistDto[]> {
    return this.withErrorHandling(() => {
      this.logger.debug(`Finding all currencies for store ${storeId}`);
      return this.getClient().wishlist.findMany({
        where: {
          storeId,
          userId,
        },
        include: {
          items: true,
        },
        skip: pagination.skip,
        take: pagination.take,
      });
    });
  }

  async findOne(id: string, userId: string): Promise<Wishlist | null> {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Finding wishlist with id ${id}`);
      return this.getClient().wishlist.findFirst({
        where: {
          id,
          userId,
        },
        include: {
          items: true,
        },
      });
    });
  }

  async create(storeId: string, userId: string, data: CreateWishlistItemDto) {
    return this.withErrorHandling(() => {
      return this.prisma.$transaction(async (tx) => {
        // Ensure wishlist exists
        let wishlist = await tx.wishlist.findUnique({
          where: {
            storeId_userId: {
              storeId,
              userId,
            },
          },
        });
        if (!wishlist) {
          wishlist = await tx.wishlist.create({
            data: {
              storeId,
              userId,
            },
          });
        }

        // Check if item exists
        const existingItem = await tx.wishlistItem.findFirst({
          where: {
            wishlistId: wishlist.id,
            productId: data.productId,
            combinationId: data.combinationId || null,
          },
        });

        if (existingItem) {
          // Update existing item
          await tx.wishlistItem.update({
            where: {
              id: existingItem.id,
            },
            data: {
              addedAt: new Date(),
            },
            include: {
              product: true,
              variant: true,
            },
          });
        } else {
          // Create new item
          await tx.wishlistItem.create({
            data: {
              wishlistId: wishlist.id,
              productId: data.productId,
              combinationId: data.combinationId || null,
            },
            include: {
              product: true,
              variant: true,
            },
          });
        }
      });
    });
  }

  async delete(id: string, storeId: string, userId: string) {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Deleting wishlist with id ${id}`);

      return this.prisma.$transaction(async (tx) => {
        // Ensure wishlist exists
        const wishlist = await tx.wishlist.findFirst({
          where: {
            storeId,
            userId,
          },
          include: {
            items: true,
          },
        });

        if (!wishlist) {
          throw new NotFoundException(`No wishlist found for user ${userId}`);
        }

        // check the item exists in the wishlist
        const item = wishlist.items.find((i) => i.id === id);
        if (!item) {
          throw new NotFoundException(`No wishlist item found for id id`);
        }

        await tx.wishlistItem.delete({
          where: {
            wishlistId: wishlist.id,
            id: id,
          },
        });
      });
    });
  }

  async deleteMany(
    ids: string[],
    storeId: string,
    userId: string,
  ): Promise<Prisma.BatchPayload> {
    return this.withErrorHandling(() => {
      this.logger.debug(`Deleting wishlists with ids ${JSON.stringify(ids)}`);

      return this.prisma.$transaction(async (tx) => {
        // Ensure wishlist exists
        const wishlist = await tx.wishlist.findFirst({
          where: {
            storeId,
            userId,
          },
          include: {
            items: true,
          },
        });

        if (!wishlist) {
          throw new NotFoundException(`No wishlist found for user ${userId}`);
        }

        return await tx.wishlistItem.deleteMany({
          where: {
            wishlistId: wishlist.id,
            id: {
              in: ids,
            },
          },
        });
      });
    });
  }
}
