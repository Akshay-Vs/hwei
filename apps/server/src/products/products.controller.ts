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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { PublicRoute } from '@decorators/public-route.decorator';
import {
  PaginationQueryDTO,
  paginationQuerySchema,
} from './schemas/query-schema';
import { ZodValidationPipe } from '@pipes/zod-validation.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StoreOwnershipGuard } from '@guards/store-ownership.guard';
import {
  ProductInputDto,
  productInputSchema,
  ProductUpdateDto,
  productUpdateSchema,
} from './schemas/products.schema';

@ApiTags('products')
@ApiBearerAuth('swagger-access-token')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @PublicRoute()
  async findAll(
    @Param('storeId') storeId: string,
    @Query(new ZodValidationPipe(paginationQuerySchema))
    query: PaginationQueryDTO,
  ) {
    return await this.productsService.findAll(storeId, query);
  }

  @Get(':id')
  @PublicRoute()
  async findOne(@Param('storeId') storeId: string, @Param('id') id: string) {
    return await this.productsService.findOne(storeId, id);
  }

  @Post()
  @UseGuards(StoreOwnershipGuard)
  async createOne(
    @Param('storeId') _storeId: string, //! only for swagger
    @Body(new ZodValidationPipe(productInputSchema)) input: ProductInputDto,
  ) {
    return await this.productsService.createOne(input);
  }

  @Post('/bulk')
  @UseGuards(StoreOwnershipGuard)
  async createMany(
    @Param('storeId') _storeId: string, //! only for swagger
    @Body(new ZodValidationPipe(productInputSchema)) input: ProductInputDto[],
  ) {
    return await this.productsService.createMany(input);
  }

  @Patch(':id')
  @UseGuards(StoreOwnershipGuard)
  async updateOne(
    @Param('storeId') storeId: string,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(productUpdateSchema)) input: ProductUpdateDto,
  ) {
    return await this.productsService.updateOne(storeId, id, input);
  }

  @Delete(':id')
  @UseGuards(StoreOwnershipGuard)
  async deleteOne(@Param('storeId') storeId: string, @Param('id') id: string) {
    return await this.productsService.deleteOne(storeId, id);
  }
}
