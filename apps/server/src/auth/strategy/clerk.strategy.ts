import { ClerkClient, User, verifyToken } from '@clerk/backend';
import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';

@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, 'clerk') {
  constructor(
    @Inject('ClerkClient')
    private readonly clerkClient: ClerkClient,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async validate(req: Request): Promise<User> {
    const token = req.headers.authorization?.split(' ').pop();

    if (!token) {
      throw new UnauthorizedException('No Token Provided');
    }

    try {
      const tokenPayload = await verifyToken(token, {
        secretKey: this.configService.get('CLERK_SECRET_KEY'),
      });

      const user = await this.clerkClient.users.getUser(tokenPayload.sub);
      Logger.debug(
        `Successfully authorized user as ${user.fullName} of id ${user.id}`,
        'ClerkStrategy',
      );

      return user;
    } catch (error) {
      Logger.error(error, 'ClerkStrategy');
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
