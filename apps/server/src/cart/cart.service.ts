import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { BaseService } from 'src/common/services/base.service';

import {
  Cart,
  CreateCartItemDto,
  UpdateCartItemDto,
  CartDto,
} from '@hwei/schema/dto/cart.schema';

import { Prisma } from '@/generated';
import { PaginationQuery } from '@hwei/schema/dto/query-schema';

@Injectable()
export class CartService extends BaseService {
  protected readonly entity = 'cart';
  protected readonly logger = new Logger(CartService.name);

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async findAll(
    storeId: string,
    userId: string,
    pagination: PaginationQuery,
  ): Promise<CartDto[]> {
    return this.withErrorHandling(() => {
      this.logger.debug(`Finding all carts for store ${storeId}`);
      return this.getClient().cart.findMany({
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

  async findOne(id: string, userId: string): Promise<Cart | null> {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Finding cart with id ${id}`);
      return this.getClient().cart.findFirst({
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

  async create(storeId: string, userId: string, data: CreateCartItemDto) {
    return this.withErrorHandling(() => {
      return this.prisma.$transaction(async (tx) => {
        // Ensure cart exists
        let cart = await tx.cart.findUnique({
          where: {
            storeId_userId: {
              storeId,
              userId,
            },
          },
        });
        if (!cart) {
          cart = await tx.cart.create({
            data: {
              storeId,
              userId,
            },
          });
        }

        // Check if item exists
        const existingItem = await tx.cartItem.findFirst({
          where: {
            cartId: cart.id,
            combinationId: data.combinationId,
          },
        });

        if (existingItem) {
          // Update existing item quantity
          return await tx.cartItem.update({
            where: {
              id: existingItem.id,
            },
            data: {
              quantity: existingItem.quantity + data.quantity,
              updatedAt: new Date(),
            },
            include: {
              product: true,
              variant: true,
            },
          });
        } else {
          // Create new item
          return await tx.cartItem.create({
            data: {
              cartId: cart.id,
              productId: data.productId,
              combinationId: data.combinationId,
              quantity: data.quantity,
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

  async update(
    id: string,
    storeId: string,
    userId: string,
    data: UpdateCartItemDto,
  ) {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Updating cart item with id ${id}`);

      return this.prisma.$transaction(async (tx) => {
        // Ensure cart exists
        const cart = await tx.cart.findFirst({
          where: {
            storeId,
            userId,
          },
          include: {
            items: true,
          },
        });

        if (!cart) {
          throw new NotFoundException(`No cart found for user ${userId}`);
        }

        // Check the item exists in the cart
        const item = cart.items.find((i) => i.id === id);
        if (!item) {
          throw new NotFoundException(`No cart item found for id ${id}`);
        }

        return await tx.cartItem.update({
          where: {
            id: id,
            cartId: cart.id,
          },
          data: {
            quantity: data.quantity,
            updatedAt: new Date(),
          },
          include: {
            product: true,
            variant: true,
          },
        });
      });
    });
  }

  async delete(id: string, storeId: string, userId: string) {
    return this.withErrorHandling(async () => {
      this.logger.debug(`Deleting cart item with id ${id}`);

      return this.prisma.$transaction(async (tx) => {
        // Ensure cart exists
        const cart = await tx.cart.findFirst({
          where: {
            storeId,
            userId,
          },
          include: {
            items: true,
          },
        });

        if (!cart) {
          throw new NotFoundException(`No cart found for user ${userId}`);
        }

        // Check the item exists in the cart
        const item = cart.items.find((i) => i.id === id);
        if (!item) {
          throw new NotFoundException(`No cart item found for id ${id}`);
        }

        await tx.cartItem.delete({
          where: {
            cartId: cart.id,
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
      this.logger.debug(`Deleting cart items with ids ${JSON.stringify(ids)}`);

      return this.prisma.$transaction(async (tx) => {
        // Ensure cart exists
        const cart = await tx.cart.findFirst({
          where: {
            storeId,
            userId,
          },
          include: {
            items: true,
          },
        });

        if (!cart) {
          throw new NotFoundException(`No cart found for user ${userId}`);
        }

        return await tx.cartItem.deleteMany({
          where: {
            cartId: cart.id,
            id: {
              in: ids,
            },
          },
        });
      });
    });
  }
}
