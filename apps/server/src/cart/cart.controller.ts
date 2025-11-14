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
import { CartService } from './cart.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  FindAllDocs,
  CreateOneDocs,
  UpdateOneDocs,
  DeleteOneDocs,
  DeleteManyDocs,
} from './cart.docs';
import { User } from 'src/common/decorators/user.decorator';
import { User as ClerkUser } from '@clerk/backend';
import {
  PaginationQuery,
  paginationQuerySchema,
} from '@hwei/schema/dto/query-schema';
import {
  createCartItemSchema,
  CreateCartItemDto,
  updateCartItemSchema,
  UpdateCartItemDto,
} from '@hwei/schema/dto/cart.schema';

@ApiTags('cart')
@ApiBearerAuth('swagger-access-token')
@UseInterceptors(CacheInterceptor)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Get()
  @FindAllDocs()
  async findAll(
    @User() user: ClerkUser,
    @Param('storeId') storeId: string,
    @Query(new ZodValidationPipe(paginationQuerySchema))
    pagination: PaginationQuery,
  ) {
    return this.cartService.findAll(storeId, user.id, pagination);
  }

  @Post()
  @CreateOneDocs()
  async create(
    @User() user: ClerkUser,
    @Param('storeId') storeId: string,
    @Body(new ZodValidationPipe(createCartItemSchema))
    input: CreateCartItemDto,
  ) {
    return this.cartService.create(storeId, user.id, input);
  }

  @Patch(':id')
  @UpdateOneDocs()
  async update(
    @User() user: ClerkUser,
    @Param('storeId') storeId: string,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateCartItemSchema))
    input: UpdateCartItemDto,
  ) {
    return this.cartService.update(id, storeId, user.id, input);
  }

  @Delete(':id')
  @DeleteOneDocs()
  async delete(
    @User() user: ClerkUser,
    @Param('storeId') storeId: string,
    @Param('id') id: string,
  ) {
    return this.cartService.delete(id, storeId, user.id);
  }

  @Delete('/bulk')
  @DeleteManyDocs()
  async deleteBulk(
    @User() user: ClerkUser,
    @Param('storeId') storeId: string,
    @Body('ids') ids: string[],
  ) {
    return this.cartService.deleteMany(ids, storeId, user.id);
  }
}
