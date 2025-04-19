import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { User as TUser } from '@clerk/backend';
import { User } from 'src/common/decorators/user.decorator';
import {
  CreateStoreInput,
  createStoreInputSchema,
} from './schemas/store.schema';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

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
  @UsePipes(new ZodValidationPipe(createStoreInputSchema))
  createOne(@User() user: TUser, @Body() body: CreateStoreInput) {
    return this.storesService.createOne(user, body);
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(createStoreInputSchema))
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
