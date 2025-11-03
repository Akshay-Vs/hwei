import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { PrismaService } from 'src/common/database/prisma.service';
import { RouterModule } from '@nestjs/core';

@Module({
  providers: [AddressService, PrismaService],
  controllers: [AddressController],
  imports: [
    RouterModule.register([
      {
        path: ':storeId',
        module: AddressModule,
      },
    ]),
  ],
})
export class AddressModule {}
