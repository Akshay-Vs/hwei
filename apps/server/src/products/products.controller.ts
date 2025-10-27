import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
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
} from '@hwei/schema/dto/query-schema';
import { ZodValidationPipe } from '@pipes/zod-validation.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StoreOwnershipGuard } from '@guards/store-ownership.guard';
import {
  ProductUpdateDto,
  productUpdateSchema,
} from '@hwei/schema/dto/products.schema';
import {
  productTransactionInput,
  ProductTransactionInputDTO,
} from '@hwei/schema/dto/product-transaction';
import { ProductTransactionsService } from './product.transactions.service';

@ApiTags('products')
@ApiBearerAuth('swagger-access-token')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productTransactionService: ProductTransactionsService,
  ) {}

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
    @Param('storeId') storeId: string,
    @Body(new ZodValidationPipe(productTransactionInput))
    input: ProductTransactionInputDTO,
  ) {
    return await this.productTransactionService.createOne(storeId, input);
  }

  @Post('/bulk')
  @UseGuards(StoreOwnershipGuard)
  createMany() {
    // @Body(new ZodValidationPipe(productInputSchema)) input: ProductInputDto[], // @Param('storeId') _storeId: string,
    throw new NotImplementedException();
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
