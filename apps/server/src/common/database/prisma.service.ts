import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@/generated';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await (this.$connect as () => Promise<void>)();
  }
}
