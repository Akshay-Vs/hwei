import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';

/**
 * Guard that verifies store ownership before allowing access to protected routes.
 *
 * This guard checks if the authenticated user is the owner of the store specified
 * in the request parameters or body. It's used to protect store-specific operations
 * like creating/updating products, categories, brands, etc.
 *
 * @example
 * ```typescript
 * @UseGuards(StoreOwnershipGuard)
 * @Post()
 * async createOne(
 *   @Param('storeId') storeId: string,
 *   @Body() data: CreateDto
 * ) {
 *   // Only executes if user owns the store
 *   return this.service.createOne(storeId, data);
 * }
 *
 * ```
 */

@Injectable()
export class StoreOwnershipGuard implements CanActivate {
  private readonly logger = new Logger(StoreOwnershipGuard.name);

  constructor(private readonly prisma: PrismaService) {}
  /**
   * Determines if the current request is allowed to proceed.
   *
   * This method:
   * 1. Extracts the storeId from request params or body
   * 2. Verifies the authenticated user owns the specified store
   * 3. Attaches the store object to the request for downstream use
   *
   * @param context - The execution context of the current request
   * @returns A boolean indicating if the request can proceed
   * @throws BadRequestException - If storeId or user information is missing
   * @throws NotFoundException - If the store doesn't exist or user is not the owner
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const params = request['params'] as { storeId?: string };
    const storeId = params.storeId;
    const user = request['user'] as { id: string };

    this.logger.debug('Params: ' + JSON.stringify(params));
    this.logger.debug('User-ID: ' + user.id);
    this.logger.debug('Store-ID: ' + storeId);

    if (!storeId || !user?.id) {
      this.logger.debug('Missing storeId or user information.');
      throw new BadRequestException('Missing storeId or user information.');
    }

    const store = await this.prisma.store.findFirst({
      where: {
        id: storeId,
        userId: user.id,
        deletedAt: null,
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
