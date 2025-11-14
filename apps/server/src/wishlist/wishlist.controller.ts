import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  FindAllDocs,
  CreateOneDocs,
  DeleteOneDocs,
  DeleteManyDocs,
} from './wishlist.docs';

import { User } from 'src/common/decorators/user.decorator';
import { User as ClerkUser } from '@clerk/backend';
import {
  PaginationQuery,
  paginationQuerySchema,
} from '@hwei/schema/dto/query-schema';
import {
  createWishlistItemSchema,
  CreateWishlistItemDto,
} from '@hwei/schema/dto/wishlist.schema';

@ApiTags('wishlist')
@ApiBearerAuth('swagger-access-token')
@UseInterceptors(CacheInterceptor)
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) { }

  @Get()
  @FindAllDocs()
  async findAll(
    @User() user: ClerkUser,
    @Param('storeId') storeId: string,
    @Query(new ZodValidationPipe(paginationQuerySchema))
    pagination: PaginationQuery,
  ) {
    return this.wishlistService.findAll(storeId, user.id, pagination);
  }

  @Post()
  @CreateOneDocs()
  async create(
    @User() user: ClerkUser,
    @Param('storeId') storeId: string,
    @Body(new ZodValidationPipe(createWishlistItemSchema))
    input: CreateWishlistItemDto,
  ) {
    return this.wishlistService.create(storeId, user.id, input);
  }

  @Delete(':id')
  @DeleteOneDocs()
  async delete(
    @User() user: ClerkUser,

    @Param('storeId') storeId: string,
    @Param('id') id: string,
  ) {
    return this.wishlistService.delete(id, storeId, user.id);
  }

  @Delete('/bulk')
  @DeleteManyDocs()
  async deleteBulk(
    @User() user: ClerkUser,
    @Param('storeId') storeId: string,
    @Body('ids') ids: string[],
  ) {
    return this.wishlistService.deleteMany(ids, storeId, user.id);
  }
}
