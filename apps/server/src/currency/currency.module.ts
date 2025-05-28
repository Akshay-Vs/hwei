import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { PrismaService } from 'src/common/database/prisma.service';
import { CurrencyController } from './currency.controller';

@Module({
  providers: [PrismaService, CurrencyService],
  controllers: [CurrencyController],
  exports: [CurrencyService],
})
export class CurrencyModule {}
