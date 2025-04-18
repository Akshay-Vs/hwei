import { User } from '@clerk/backend';
import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Store } from 'generated';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class StoresService {
  constructor(private readonly prismaService: PrismaService) {}

  private userGuard(user: User) {
    if (!user) throw new UnauthorizedException('User not found');
  }

  async findAll(user: User): Promise<Store[]> {
    this.userGuard(user);

    return this.prismaService.store.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  async findOne(user: User, storeId: string): Promise<Store> {
    this.userGuard(user);

    Logger.debug('Hit findOne store', 'Stores');
    const store = await this.prismaService.store.findUnique({
      where: {
        id: storeId,
        userId: user.id,
      },
    });

    if (!store) {
      Logger.debug('Store not found', 'Stores');
      throw new NotFoundException('Store not found');
    }

    Logger.debug('Returning store', 'Stores');
    return store;
  }

  createOne(user: User) {
    this.userGuard(user);

    return {};
  }

  editOne(user: User) {
    this.userGuard(user);

    return {};
  }

  deleteOne(user: User) {
    this.userGuard(user);

    return {};
  }
}
