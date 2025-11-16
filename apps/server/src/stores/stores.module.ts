import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { PrismaService } from '@database/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [StoresController],
  providers: [StoresService, PrismaService, UserService],
  exports: [StoresService],
})
export class StoresModule { }
