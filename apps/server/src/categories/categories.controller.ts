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

import { CategoriesService } from './categories.service';

import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from './schemas/categories.schema';

import { PublicRoute } from '@decorators/public-route.decorator';
import { StoreOwnershipGuard } from '@guards/store-ownership.guard';
import {
  CreateOneDocs,
  DeleteOneDocs,
  FindAllDocs,
  FindOneDocs,
  UpdateOneDocs,
} from './categories.docs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@ApiBearerAuth('swagger-access-token')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // #region Find All Categories
  @PublicRoute()
  @Get()
  @FindAllDocs()
  async findAll(@Param('storeId') storeId: string) {
    return this.categoriesService.findAll(storeId);
  }
  // #endregion

  // #region Find Category By ID
  @Get(':id')
  @PublicRoute()
  @FindOneDocs()
  async findOne(@Param('storeId') storeId: string, @Param('id') id: string) {
    return this.categoriesService.findOne(storeId, id);
  }
  // #endregion

  // #region Create Category
  @Post()
  @UseGuards(StoreOwnershipGuard)
  @CreateOneDocs()
  async createOne(
    @Param('storeId') storeId: string,
    @Body() category: CreateCategoryDto,
  ) {
    return this.categoriesService.createOne(storeId, category);
  }
  // #endregion

  // #region Update Category
  @Patch(':id')
  @UseGuards(StoreOwnershipGuard)
  @UpdateOneDocs()
  async updateOne(
    @Param('storeId') storeId: string,
    @Param('id') id: string,
    @Body() category: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateOne(storeId, id, category);
  }
  // #endregion

  // #region Delete Category
  @Delete(':id')
  @UseGuards(StoreOwnershipGuard)
  @DeleteOneDocs()
  async deleteOne(@Param('storeId') storeId: string, @Param('id') id: string) {
    return this.categoriesService.deleteOne(storeId, id);
  }
  // #endregion
}
