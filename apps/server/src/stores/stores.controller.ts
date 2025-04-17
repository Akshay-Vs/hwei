import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { StoresService } from './stores.service';

import { User as TUser } from '@clerk/backend';
import { User } from 'src/decorators/user.decorator';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  findAll(@User() user: TUser) {
    return this.storesService.findAll(user);
  }

  @Get(':id')
  findOne(@User() user: TUser) {
    return this.storesService.findOne(user);
  }

  @Post()
  createOne(@User() user: TUser) {
    return this.storesService.createOne(user);
  }

  @Patch(':id')
  editOne(@User() user: TUser) {
    return this.storesService.editOne(user);
  }

  @Delete(':id')
  deleteOne(@User() user: TUser) {
    return this.storesService.deleteOne(user);
  }
}
