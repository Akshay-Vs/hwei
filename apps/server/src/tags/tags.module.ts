import { Module } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';

@Module({
  providers: [PrismaService, TagsService],
  controllers: [TagsController],
})
export class TagsModule {}
