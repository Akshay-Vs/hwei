import { Module } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { PricingController } from './variants/pricing/pricing.controller';
import { RouterModule } from '@nestjs/core';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TagsService } from 'src/tags/tags.service';
import { VariantsModule } from './variants/variants.module';
import { PricingService } from './variants/pricing/pricing.service';
import { ProductTransactionsService } from './product.transactions.service';
import { ImageModule } from './image/image.module';

@Module({
  controllers: [PricingController, ProductsController],
  providers: [
    PrismaService,
    ProductsService,
    TagsService,
    PricingService,
    ProductTransactionsService,
  ],
  imports: [
    VariantsModule,
    ImageModule,
    RouterModule.register([
      {
        path: ':storeId',
        module: ProductsModule,
        children: [
          {
            path: 'products/:productId/variants',
            module: VariantsModule,
          },
          {
            path: 'products/',
            module: ImageModule,
          },
        ],
      },
    ]),
  ],
})
export class ProductsModule { }
