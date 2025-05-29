import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { PrismaService } from '@database/prisma.service';

@Module({
  controllers: [StoresController],
  providers: [StoresService, PrismaService],
  exports: [StoresService],
})
export class StoresModule {}
