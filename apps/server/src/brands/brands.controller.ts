import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { BrandsService } from './brands.service';
import { User as UserDTO } from '@clerk/backend';
import { User } from 'src/common/decorators/user.decorator';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

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
  async findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
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
  async findOne(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Post()
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
  async createOne(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Put(':id')
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
  async editOne(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, updateBrandDto);
  }

  @Delete(':id')
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
  async deleteOne(@User() user: UserDTO, @Param('id') id: string) {
    return this.brandsService.deleteOne(user, id);
  }
}
