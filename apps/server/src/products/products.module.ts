import { Module } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { PricingController } from './variants/pricing/pricing.controller';
import { RouterModule } from '@nestjs/core';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TagsService } from 'src/tags/tags.service';
import { VariantsModule } from './variants/variants.module';
import { ImageService } from './image/image.service';
import { PricingService } from './variants/pricing/pricing.service';
import { ImageController } from './image/image.controller';
import { ProductTransactionsService } from './product.transactions.service';

@Module({
  controllers: [PricingController, ProductsController, ImageController],
  providers: [
    PrismaService,
    ProductsService,
    TagsService,
    ImageService,
    PricingService,
    ProductTransactionsService,
  ],
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
