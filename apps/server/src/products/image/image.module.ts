import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';

@Module({
  providers: [PrismaService, ImageService],
  controllers: [ImageController],
  exports: [ImageService],
})
export class ImageModule {}
