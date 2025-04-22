import { User } from '@clerk/backend';
import { UnauthorizedException } from '@nestjs/common';

export class BaseGuards {
  protected userGuard(user: User) {
    if (!user) throw new UnauthorizedException('User not found');
  }
}
