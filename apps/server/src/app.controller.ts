import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {} from '@clerk/backend';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): object {
    return this.appService.getHello();
  }
}
