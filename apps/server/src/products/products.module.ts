import { Module } from '@nestjs/common';
import { TagsController } from '../tags/tags.controller';
import { TagsService } from '../tags/tags.service';
import { PrismaService } from 'src/common/database/prisma.service';
import { VariantsController } from './variants/variants.controller';
import { VariantsService } from './variants/variants.service';
import { PricesService } from './prices/prices.service';
import { PricesController } from './prices/prices.controller';
import { RouterModule } from '@nestjs/core';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  controllers: [
    TagsController,
    VariantsController,
    PricesController,
    ProductsController,
  ],
  providers: [
    TagsService,
    PrismaService,
    VariantsService,
    PricesService,
    ProductsService,
  ],
  exports: [TagsService],
  imports: [
    RouterModule.register([
      {
        path: ':storeId',
        module: ProductsModule,
      },
    ]),
  ],
})
export class ProductsModule {}
