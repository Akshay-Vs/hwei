import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/common/database/prisma.service';
import { AdminController } from './admin.user.controller';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController, AdminController],
})
export class UserModule { }
