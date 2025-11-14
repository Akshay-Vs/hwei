import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/common/database/prisma.service';
import { RouterModule } from '@nestjs/core';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  imports: [
    RouterModule.register([
      {
        path: ':id',
        module: UserModule,
      },
    ]),
  ],
})
export class UserModule {}
