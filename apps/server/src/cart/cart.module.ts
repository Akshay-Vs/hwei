import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/common/database/prisma.service';
import { CartService } from './cart.service';
import { RouterModule } from '@nestjs/core';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService],
  imports: [
    RouterModule.register([
      {
        path: ':storeId',
        module: CartModule,
      },
    ]),
  ],
})
export class CartModule { }
