import { User } from '@clerk/backend';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class TagsService {
  private readonly logger = new Logger(TagsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {}

  async findOne(id: string) {}

  async createOne(user: User) {}

  async updateOne(user: User, id: string) {}

  async deleteOne(user: User, id: string) {}
}
