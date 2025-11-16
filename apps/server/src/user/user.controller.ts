import { UserService } from './user.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { User } from 'src/common/decorators/user.decorator';
import { User as ClerkUser } from '@clerk/backend';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import {
  FindMeDocs,
  CreateOneDocs,
  UpdateOneDocs,
  DeleteOneDocs,
} from './user.docs';

import { updateUserSchema, UpdateUserDto } from '@hwei/schema/dto/user.schema';

@ApiTags('users')
@ApiBearerAuth('swagger-access-token')
@UseInterceptors(CacheInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/me')
  @FindMeDocs()
  async getMe(@User() user: ClerkUser) {
    return this.userService.findByClerkId(user.id);
  }

  @Post()
  @CreateOneDocs()
  async create(@User() user: ClerkUser) {
    return this.userService.create(user);
  }

  @Patch()
  @UpdateOneDocs()
  async update(
    @User() user: ClerkUser,
    @Body(new ZodValidationPipe(updateUserSchema))
    input: UpdateUserDto,
  ) {
    return this.userService.update(user.id, input);
  }

  @Delete()
  @DeleteOneDocs()
  async delete(@User() user: ClerkUser) {
    return this.userService.delete(user.id);
  }
}
