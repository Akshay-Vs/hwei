import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { PublicRoute } from 'src/common/decorators/public-route.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { FindAllByProductDocs, FindOneByProductDocs } from './image.docs';
import {
  ImageMetadataDTO,
  imageMetadataSchema,
  ImageRelationsDTO,
  imageRelationsSchema,
} from '@hwei/schema/dto/images.schema';
import {
  BasicPaginationDTO,
  basicPaginationQuerySchema,
} from '@hwei/schema/dto/query-schema';

@ApiTags('product-images')
@ApiBearerAuth('swagger-access-token')
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @PublicRoute()
  @FindAllByProductDocs()
  @Get(':productId')
  findAllByCombination(
    @Param(new ZodValidationPipe(imageRelationsSchema))
    params: ImageRelationsDTO,
    @Query(new ZodValidationPipe(basicPaginationQuerySchema))
    query: BasicPaginationDTO,
  ) {
    return this.imageService.findByProduct(params.productId, query);
  }

  @PublicRoute()
  @FindOneByProductDocs()
  @Get(':productId/:id')
  findOneByCombination(
    @Param(new ZodValidationPipe(imageMetadataSchema))
    params: ImageMetadataDTO,
  ) {
    return this.imageService.findOne(params.id, params.id);
  }
}
