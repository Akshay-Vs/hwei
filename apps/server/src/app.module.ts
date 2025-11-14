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
import { CurrencyModule } from './currency/currency.module';
import { CacheModule } from '@nestjs/cache-manager';
import { WishlistModule } from './wishlist/wishlist.module';
import { CartService } from './cart/cart.service';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60000, // 60 sec
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, // 60 sec
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
    CurrencyModule,
    WishlistModule,
    CartModule,
    UserModule,
    AddressModule,
  ],

  providers: [
    PrismaService,
    ClerkClientProvider,
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
    CartService,
  ],
})
export class AppModule {}
