import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '@decorators/public-route.decorator';

@Injectable()
export class ClerkAuthGuard extends AuthGuard('clerk') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      Logger.debug('Hit public Route', 'AuthGuard');
      return true;
    }

    Logger.debug('Hit private Route', 'AuthGuard');
    return super.canActivate(context);
  }
}
