import { UserService } from './user.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { User } from 'src/common/decorators/user.decorator';
import { User as ClerkUser } from '@clerk/backend';
import { StoreOwnershipGuard } from 'src/common/guards/store-ownership.guard';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  FindAllDocs,
  FindOneDocs,
  FindByClerkIdDocs,
  FindByEmailDocs,
  CreateOneDocs,
  UpdateOneDocs,
  DeleteOneDocs,
  DeleteManyDocs,
  UpdateRoleDocs,
} from './user.docs';

import {
  PaginationQuery,
  paginationQuerySchema,
} from '@hwei/schema/dto/query-schema';

import {
  createUserSchema,
  CreateUserDto,
  updateUserSchema,
  UpdateUserDto,
  UpdateRoleDto,
  updateRoleSchema,
} from '@hwei/schema/dto/user.schema';

@ApiTags('users')
@ApiBearerAuth('swagger-access-token')
@UseInterceptors(CacheInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('me')
  @FindOneDocs()
  async getMe(@User() user: ClerkUser) {
    return this.userService.findByClerkId(user.id);
  }

  @Get('clerk/:clerkId')
  @FindByClerkIdDocs()
  async findByClerkId(@Param('clerkId') clerkId: string) {
    return this.userService.findByClerkId(clerkId);
  }

  @Get('email/:email')
  @FindByEmailDocs()
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get(':id')
  @FindOneDocs()
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @CreateOneDocs()
  async create(
    @Body(new ZodValidationPipe(createUserSchema))
    input: CreateUserDto,
  ) {
    return this.userService.create(input);
  }

  @Patch(':id')
  @UpdateOneDocs()
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateUserSchema))
    input: UpdateUserDto,
  ) {
    return this.userService.update(id, input);
  }

  @Delete(':id')
  @DeleteOneDocs()
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Delete('/bulk')
  @DeleteManyDocs()
  async deleteBulk(@Body('ids') ids: string[]) {
    return this.userService.deleteMany(ids);
  }

  //#endregion Admin Routes

  @Get('')
  @UseGuards(StoreOwnershipGuard)
  @FindAllDocs()
  async findAll(
    @Query(new ZodValidationPipe(paginationQuerySchema))
    pagination: PaginationQuery,
  ) {
    return this.userService.findAll(pagination);
  }

  @Patch('role/:id')
  @UseGuards(StoreOwnershipGuard)
  @UpdateRoleDocs()
  async updateRole(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateRoleSchema))
    input: UpdateRoleDto,
  ) {
    return this.userService.updateRole(id, input.role);
  }

  ////#endregion
}
