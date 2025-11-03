import { AddressService } from './address.service';
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
  Query,
  UseInterceptors,
} from '@nestjs/common';

import {
  FindAllDocs,
  FindOneDocs,
  FindDefaultDocs,
  CreateOneDocs,
  UpdateOneDocs,
  SetDefaultDocs,
  DeleteOneDocs,
  DeleteManyDocs,
} from './address.docs';

import {
  PaginationQuery,
  paginationQuerySchema,
} from '@hwei/schema/dto/query-schema';

import {
  createAddressSchema,
  CreateAddressDto,
  updateAddressSchema,
  UpdateAddressDto,
} from '@hwei/schema/dto/address.schema';

@ApiTags('address')
@ApiBearerAuth('swagger-access-token')
@UseInterceptors(CacheInterceptor)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @FindAllDocs()
  async findAll(
    @User() user: ClerkUser,
    @Query(new ZodValidationPipe(paginationQuerySchema))
    pagination: PaginationQuery,
  ) {
    return this.addressService.findAll(user.id, pagination);
  }

  @Get('default')
  @FindDefaultDocs()
  async findDefault(@User() user: ClerkUser) {
    return this.addressService.findDefault(user.id);
  }

  @Get(':id')
  @FindOneDocs()
  async findOne(@User() user: ClerkUser, @Param('id') id: string) {
    return this.addressService.findOne(id, user.id);
  }

  @Post()
  @CreateOneDocs()
  async create(
    @User() user: ClerkUser,
    @Body(new ZodValidationPipe(createAddressSchema))
    input: CreateAddressDto,
  ) {
    return this.addressService.create(user.id, input);
  }

  @Patch(':id')
  @UpdateOneDocs()
  async update(
    @User() user: ClerkUser,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateAddressSchema))
    input: UpdateAddressDto,
  ) {
    return this.addressService.update(id, user.id, input);
  }

  @Patch(':id/default')
  @SetDefaultDocs()
  async setDefault(@User() user: ClerkUser, @Param('id') id: string) {
    return this.addressService.setDefault(id, user.id);
  }

  @Delete(':id')
  @DeleteOneDocs()
  async delete(@User() user: ClerkUser, @Param('id') id: string) {
    return this.addressService.delete(id, user.id);
  }

  @Delete('/bulk')
  @DeleteManyDocs()
  async deleteBulk(@User() user: ClerkUser, @Body('ids') ids: string[]) {
    return this.addressService.deleteMany(ids, user.id);
  }
}
