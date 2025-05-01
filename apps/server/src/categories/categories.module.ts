import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { PrismaService } from 'src/common/database/prisma.service';
import { RouterModule } from '@nestjs/core';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService],
  imports: [
    RouterModule.register([
      {
        path: ':storeId',
        module: CategoriesModule,
      },
    ]),
  ],
})
export class CategoriesModule {}
