import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { PrismaService } from 'src/common/database/prisma.service';
import { CurrencyController } from './currency.controller';
import { RouterModule } from '@nestjs/core';

@Module({
  providers: [PrismaService, CurrencyService],
  controllers: [CurrencyController],
  imports: [
    RouterModule.register([
      {
        path: ':storeId',
        module: CurrencyModule,
      },
    ]),
  ],
})
export class CurrencyModule {}
