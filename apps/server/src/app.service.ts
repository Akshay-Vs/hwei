import { User } from '@clerk/backend';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      message: 'Hello World!!!',
      isProtected: true,
    };
  }

  getHelloProtected(user: User): object {
    return {
      message: `Hello ${user.fullName}`,
      isProtected: true,
    };
  }
}
