import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { PricesService } from './prices/prices.service';
import { PricesController } from './prices/prices.controller';
import { RouterModule } from '@nestjs/core';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TagsService } from 'src/tags/tags.service';
import { VarientsModule } from './varients/varients.module';

@Module({
  controllers: [PricesController, ProductsController],
  providers: [PrismaService, PricesService, ProductsService, TagsService],
  imports: [
    RouterModule.register([
      {
        path: ':storeId',
        module: ProductsModule,
      },
    ]),
    VarientsModule,
  ],
})
export class ProductsModule {}
