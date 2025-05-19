import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ClerkClientProvider } from '@providers/clerk-client.provider';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ClerkAuthGuard } from './auth/guards/clerk-auth.guard';
import { PrismaService } from '@database/prisma.service';
import { StoresModule } from './stores/stores.module';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { PriceController } from './price/price.controller';
import { PriceService } from './price/price.service';
import { PriceModule } from './price/price.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Application feature modules
    AuthModule,
    StoresModule,
    ProductsModule,
    BrandsModule,
    CategoriesModule,
    TagsModule,
    PriceModule,
  ],

  providers: [
    PrismaService,
    ClerkClientProvider,
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
    PriceService,
  ],

  controllers: [PriceController],
})
export class AppModule {}
