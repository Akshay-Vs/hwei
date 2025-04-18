import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PublicRoute } from './decorators/public-route.decorator';
import { User } from './decorators/user.decorator';
import { User as TUser } from '@clerk/backend';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @PublicRoute()
  getHello(): object {
    return this.appService.getHello();
  }

  @Get('protected')
  getHelloProtected(@User() user: TUser): object {
    return this.appService.getHelloProtected(user);
  }
}
