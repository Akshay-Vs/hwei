import { User } from '@clerk/backend';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class StoresService {
  private userGuard(user: User) {
    if (!user) throw new UnauthorizedException('User not found');
  }

  findAll(user: User) {
    this.userGuard(user);
    return {
      message: 'Hello ' + user.fullName,
    };
  }

  findOne(user: User) {
    this.userGuard(user);

    return {
      message: 'Hello ' + user.fullName,
    };
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
