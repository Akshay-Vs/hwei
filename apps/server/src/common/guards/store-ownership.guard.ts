import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class StoreOwnershipGuard implements CanActivate {
  private readonly logger = new Logger(StoreOwnershipGuard.name);

  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const params = request['params'] as { storeId?: string };
    const body = request['body'] as { storeId?: string };
    const storeId = params.storeId || body.storeId;
    const user = request['user'] as { id: string };

    if (!storeId || !user?.id) {
      this.logger.debug('Missing storeId or user information.');
      throw new BadRequestException('Missing storeId or user information.');
    }

    const store = await this.prisma.store.findFirst({
      where: {
        id: storeId,
        userId: user.id,
      },
    });

    if (!store) {
      this.logger.debug(`Store not found or user ${user.id} is not the owner.`);
      throw new NotFoundException('Store not found.');
    }

    Object.assign(request, { store });
    return true;
  }
}
