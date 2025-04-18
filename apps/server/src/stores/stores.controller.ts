import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { User as TUser } from '@clerk/backend';
import { User } from 'src/common/decorators/user.decorator';
import { CreateStoreInput } from './schemas/store.schema';

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
  createOne(@User() user: TUser, @Body() body: CreateStoreInput) {
    return this.storesService.createOne(user, body);
  }

  @Put(':id')
  editOne(
    @User() user: TUser,
    @Param() params: { id: string },
    @Body() body: CreateStoreInput,
  ) {
    return this.storesService.editOne(user, params.id, body);
  }

  @Delete(':id')
  deleteOne(@User() user: TUser, @Param() params: { id: string }) {
    return this.storesService.deleteOne(user, params.id);
  }
}
