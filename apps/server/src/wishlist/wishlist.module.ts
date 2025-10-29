import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { PrismaService } from 'src/common/database/prisma.service';
import { RouterModule } from '@nestjs/core';

@Module({
  controllers: [WishlistController],
  providers: [WishlistService, PrismaService],
  imports: [
    RouterModule.register([
      {
        path: ':storeId',
        module: WishlistModule,
      },
    ]),
  ],
})
export class WishlistModule { }
