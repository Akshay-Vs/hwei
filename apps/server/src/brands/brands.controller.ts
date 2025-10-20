import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto } from '@hwei/schema/dto/brands.schema';
import { PublicRoute } from '@decorators/public-route.decorator';
import { StoreOwnershipGuard } from '@guards/store-ownership.guard';
import {
  CreateOneDocs,
  DeleteOneDocs,
  FindAllDocs,
  FindOneDocs,
  UpdateOneDocs,
} from './brands.docs';
import { ZodValidationPipe } from '@anatine/zod-nestjs';

@ApiTags('brands')
@ApiBearerAuth('swagger-access-token')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  // #region Find All Brands
  @PublicRoute()
  @Get()
  @FindAllDocs()
  async findAll(@Param('storeId') storeId: string) {
    return this.brandsService.findAll(storeId);
  }
  // #endregion

  // #region Find Brand By ID
  @Get(':id')
  @PublicRoute()
  @FindOneDocs()
  async findOne(@Param('storeId') storeId: string, @Param('id') id: string) {
    return this.brandsService.findOne(storeId, id);
  }
  // #endregion

  // #region Create Brand
  @Post()
  @UseGuards(StoreOwnershipGuard)
  @CreateOneDocs()
  async createOne(
    @Param('storeId') storeId: string,
    @Body(new ZodValidationPipe()) brand: CreateBrandDto,
  ) {
    return this.brandsService.createOne(storeId, brand);
  }
  // #endregion

  // #region Update Brand
  @Patch(':id')
  @UseGuards(StoreOwnershipGuard)
  @UpdateOneDocs()
  async updateOne(
    @Param('storeId') storeId: string,
    @Param('id') id: string,
    @Body(new ZodValidationPipe()) brand: UpdateBrandDto,
  ) {
    return this.brandsService.updateOne(storeId, id, brand);
  }
  // #endregion

  // #region Delete Brand
  @Delete(':id')
  @UseGuards(StoreOwnershipGuard)
  @DeleteOneDocs()
  async deleteOne(@Param('storeId') storeId: string, @Param('id') id: string) {
    return this.brandsService.deleteOne(storeId, id);
  }
  // #endregion
}
