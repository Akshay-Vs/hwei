import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto } from './schemas/brands.schema';
import { PublicRoute } from 'src/common/decorators/public-route.decorator';
import { StoreOwnershipGuard } from 'src/common/guards/store-ownership.guard';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  // #region Find All Brands
  @PublicRoute()
  @Get()
  @ApiOperation({
    summary: 'Find all brands',
    description: 'Retrieve a list of all brands',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of brands has been successfully retrieved',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async findAll(@Param('storeId') storeId: string) {
    return this.brandsService.findAll(storeId);
  }
  // #endregion

  // #region Find Brand By ID
  @Get(':id')
  @PublicRoute()
  @ApiOperation({
    summary: 'Find a brand by ID',
    description: 'Retrieve a specific brand by its ID',
  })
  @ApiParam({ name: 'id', description: 'The ID of the brand to retrieve' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The brand has been successfully retrieved',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Brand not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async findOne(@Param('storeId') storeId: string, @Param('id') id: string) {
    return this.brandsService.findOne(storeId, id);
  }
  // #endregion

  // #region Create Brand
  @Post()
  @UseGuards(StoreOwnershipGuard)
  @ApiOperation({
    summary: 'Create a brand',
    description: 'Create a new brand',
  })
  @ApiBody({ type: CreateBrandDto, description: 'Brand data to create' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The brand has been successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async createOne(
    @Param('storeId') storeId: string,
    @Body() brand: CreateBrandDto,
  ) {
    return this.brandsService.createOne(storeId, brand);
  }
  // #endregion

  // #region Update Brand
  @Patch(':id')
  @UseGuards(StoreOwnershipGuard)
  @ApiOperation({
    summary: 'Update a brand',
    description: 'Update an existing brand by ID',
  })
  @ApiParam({ name: 'id', description: 'The ID of the brand to update' })
  @ApiBody({ type: UpdateBrandDto, description: 'Brand data to update' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The brand has been successfully updated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Brand not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async updateOne(
    @Param('storeId') storeId: string,
    @Param('id') id: string,
    @Body() brand: UpdateBrandDto,
  ) {
    return this.brandsService.updateOne(storeId, id, brand);
  }
  // #endregion

  // #region Delete Brand
  @Delete(':id')
  @UseGuards(StoreOwnershipGuard)
  @ApiOperation({
    summary: 'Delete a brand',
    description: 'Delete a brand by ID',
  })
  @ApiParam({ name: 'id', description: 'The ID of the brand to delete' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The brand has been successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Brand not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async deleteOne(@Param('storeId') storeId: string, @Param('id') id: string) {
    return this.brandsService.deleteOne(storeId, id);
  }
  // #endregion
}
