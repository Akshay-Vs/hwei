import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { PublicRoute } from 'src/common/decorators/public-route.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { FindAllByProductDocs, FindOneByProductDocs } from './image.docs';
import {
  ImageMetadataDTO,
  ImageMetadataSchema,
  ImageRelationsDTO,
  ImageRelationsSchema,
} from 'src/products/schemas/images.schema';
import {
  BasicPaginationDTO,
  basicPaginationQuerySchema,
} from 'src/products/schemas/query-schema';

@ApiTags('variant-images')
@ApiBearerAuth('swagger-access-token')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @PublicRoute()
  @FindAllByProductDocs()
  @Get(':productId')
  findAllByCombination(
    @Param(new ZodValidationPipe(ImageRelationsSchema))
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
    @Param(new ZodValidationPipe(ImageMetadataSchema))
    params: ImageMetadataDTO,
  ) {
    return this.imageService.findOne(params.id, params.id);
  }
}
