import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User as TUser } from '@clerk/backend';

import { User } from 'src/common/decorators/user.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateStoreDto, createStoreSchema } from './schemas/store.schema';
import { StoresService } from './stores.service';

@ApiTags('stores')
@ApiBearerAuth('swagger-access-token')
@Controller('stores')
export class StoresController {
  private readonly logger = new Logger(StoresController.name);

  constructor(private readonly storesService: StoresService) {}

  //#region [GET] /stores - Get all stores
  @ApiOperation({ summary: 'Get all stores for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'List of all stores owned by the authenticated user',
  })
  @Get()
  findAll(@User() user: TUser) {
    this.logger.log(`Fetching all stores for user: ${user.id}`);
    return this.storesService.findAll(user);
  }
  //#endregion

  //#region [GET] /stores/:id - Get a store by ID
  @ApiOperation({ summary: 'Get a specific store by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Store ID to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'Store details returned successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Store not found or not accessible by the user',
  })
  @Get(':id')
  findOne(@User() user: TUser, @Param('id') id: string) {
    this.logger.log(`Fetching store [id=${id}] for user: ${user.id}`);
    return this.storesService.findOne(user, id);
  }
  //#endregion

  //#region [POST] /stores - Create a new store
  @ApiOperation({ summary: 'Create a new store' })
  @ApiBody({
    type: CreateStoreDto,
    required: true,
    description: 'Store creation payload',
  })
  @ApiResponse({
    status: 201,
    description: 'Store created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid store data provided',
  })
  @Post()
  createOne(
    @Body(new ZodValidationPipe(createStoreSchema)) body: CreateStoreDto,
    @User() user: TUser,
  ) {
    this.logger.log(`Creating store for user: ${user.id}`);
    return this.storesService.createOne(user, body);
  }
  //#endregion

  //#region [PUT] /stores/:id - Update a store
  @ApiOperation({ summary: 'Update an existing store' })
  @ApiParam({ name: 'id', type: String, description: 'Store ID to update' })
  @ApiBody({
    type: CreateStoreDto,
    required: true,
    description: 'Store update payload',
  })
  @ApiResponse({
    status: 200,
    description: 'Store updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Store not found or not accessible by the user',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid update payload',
  })
  @Put(':id')
  editOne(
    @User() user: TUser,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(createStoreSchema)) body: CreateStoreDto,
  ) {
    this.logger.log(`Updating store [id=${id}] for user: ${user.id}`);
    return this.storesService.editOne(user, id, body);
  }
  //#endregion

  //#region [DELETE] /stores/:id - Delete a store
  @ApiOperation({ summary: 'Delete a store' })
  @ApiParam({ name: 'id', type: String, description: 'Store ID to delete' })
  @ApiResponse({
    status: 200,
    description: 'Store deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Store not found or not accessible by the user',
  })
  @Delete(':id')
  deleteOne(@User() user: TUser, @Param('id') id: string) {
    this.logger.warn(`Deleting store [id=${id}] for user: ${user.id}`);
    return this.storesService.deleteOne(user, id);
  }
  //#endregion
}
