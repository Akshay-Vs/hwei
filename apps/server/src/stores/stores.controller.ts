import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { User as ClerkUser } from '@clerk/backend';

import { User } from 'src/common/decorators/user.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  CreateStoreDto,
  createStoreSchema,
  UpdateStoreDto,
} from './schemas/store.schema';
import { StoresService } from './stores.service';
import {
  CreateOneDocs,
  DeleteOneDocs,
  FindAllDocs,
  FindOneDocs,
  UpdateOneDocs,
} from './stores.docs';
import { StoreOwnershipGuard } from 'src/common/guards/store-ownership.guard';

@ApiTags('stores')
@ApiBearerAuth('swagger-access-token')
@Controller('stores')
export class StoresController {
  private readonly logger = new Logger(StoresController.name);

  constructor(private readonly storesService: StoresService) {}

  //#region [GET] /stores - Get all stores
  @Get()
  @FindAllDocs()
  findAll(@User() user: ClerkUser) {
    this.logger.log(`Fetching all stores for user: ${user.id}`);
    return this.storesService.findAll(user);
  }
  //#endregion

  //#region [GET] /stores/:id - Get a store by ID
  @Get(':id')
  @FindOneDocs()
  findOne(@User() user: ClerkUser, @Param('id') id: string) {
    this.logger.log(`Fetching store [id=${id}] for user: ${user.id}`);
    return this.storesService.findOne(user, id);
  }
  //#endregion

  //#region [POST] /stores - Create a new store
  @Post()
  @CreateOneDocs()
  createOne(
    @Body(new ZodValidationPipe(createStoreSchema)) body: CreateStoreDto,
    @User() user: ClerkUser,
  ) {
    this.logger.log(`Creating store for user: ${user.id}`);
    return this.storesService.createOne(user, body);
  }
  //#endregion

  //#region [PUT] /stores/:id - Update a store
  @Patch(':id')
  @UpdateOneDocs()
  @UseGuards(StoreOwnershipGuard)
  editOne(
    @User() user: ClerkUser,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(createStoreSchema)) body: UpdateStoreDto,
  ) {
    this.logger.log(`Updating store [id=${id}] for user: ${user.id}`);
    return this.storesService.editOne(user, id, body);
  }
  //#endregion

  //#region [DELETE] /stores/:id - Delete a store
  @Delete(':id')
  @DeleteOneDocs()
  @UseGuards(StoreOwnershipGuard)
  deleteOne(@User() user: ClerkUser, @Param('id') id: string) {
    this.logger.warn(`Deleting store [id=${id}] for user: ${user.id}`);
    return this.storesService.deleteOne(user, id);
  }
  //#endregion
}
