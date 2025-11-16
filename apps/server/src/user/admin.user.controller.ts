import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { StoreOwnershipGuard } from 'src/common/guards/store-ownership.guard';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  FindAllDocs,
  FindByIdDocs,
  FindByEmailDocs,
  DeleteManyDocs,
  UpdateRoleDocs,
} from './user.docs';

import {
  PaginationQuery,
  paginationQuerySchema,
} from '@hwei/schema/dto/query-schema';

import { UpdateRoleDto, updateRoleSchema } from '@hwei/schema/dto/user.schema';
import { UserService } from './user.service';

@ApiTags('users')
@ApiBearerAuth('swagger-access-token')
@UseInterceptors(CacheInterceptor)
@Controller('users')
export class AdminController {
  constructor(private readonly userService: UserService) { }

  //#region Admin Routes
  @Get()
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

  @Delete('/bulk')
  @UseGuards(StoreOwnershipGuard)
  @DeleteManyDocs()
  async deleteBulk(@Body('ids') ids: string[]) {
    return this.userService.deleteMany(ids);
  }

  @Get(':id')
  @UseGuards(StoreOwnershipGuard)
  @FindByIdDocs()
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get('email/:email')
  @UseGuards(StoreOwnershipGuard)
  @FindByEmailDocs()
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }
  //#endregion
}
