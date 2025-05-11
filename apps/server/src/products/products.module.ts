import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { PricesService } from './prices/prices.service';
import { PricesController } from './prices/prices.controller';
import { RouterModule } from '@nestjs/core';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TagsService } from 'src/tags/tags.service';
import { VariantsModule } from './variants/variants.module';

@Module({
  controllers: [PricesController, ProductsController],
  providers: [PrismaService, PricesService, ProductsService, TagsService],
  imports: [
    VariantsModule,
    RouterModule.register([
      {
        path: ':storeId',
        module: ProductsModule,
        children: [
          {
            path: 'products/:productId/variants',
            module: VariantsModule,
          },
        ],
      },
    ]),
  ],
})
export class ProductsModule {}
