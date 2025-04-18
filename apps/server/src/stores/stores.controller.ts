import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { StoresService } from './stores.service';
import { User as TUser } from '@clerk/backend';
import { User } from 'src/common/decorators/user.decorator';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  findAll(@User() user: TUser) {
    return this.storesService.findAll(user);
  }

  @Get(':id')
  findOne(@User() user: TUser, @Param() params: { id: string }) {
    return this.storesService.findOne(user, params.id);
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
