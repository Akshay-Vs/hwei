import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { PrismaService } from '@database/prisma.service';
import { RouterModule } from '@nestjs/core';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService, PrismaService],
  imports: [
    RouterModule.register([
      {
        path: ':storeId',
        module: BrandsModule,
      },
    ]),
  ],
})
export class BrandsModule {}
