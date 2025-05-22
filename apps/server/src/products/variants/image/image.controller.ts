import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { PublicRoute } from 'src/common/decorators/public-route.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  ImageCombinationDTO,
  ImageCombinationIdDTO,
  ImageMetadataSchema,
  ImageRelationsSchema,
} from 'src/products/schemas/images.schema';
import {
  BasicPaginationDTO,
  basicPaginationQuerySchema,
} from 'src/products/schemas/query-schema';
import {
  FindAllByCombinationDocs,
  FindOneByCombinationDocs,
} from './image.docs';

@ApiTags('variant -images')
@ApiBearerAuth('swagger-access-token')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @PublicRoute()
  @FindAllByCombinationDocs()
  @Get(':combinationId')
  findAllByCombination(
    @Param(new ZodValidationPipe(ImageRelationsSchema))
    @Query(new ZodValidationPipe(basicPaginationQuerySchema))
    query: BasicPaginationDTO,
    params: ImageCombinationDTO,
  ) {
    return this.imageService.findByCombination(params.combinationId, query);
  }

  @PublicRoute()
  @FindOneByCombinationDocs()
  @Get(':combinationId/:id')
  findOneByCombination(
    @Param(new ZodValidationPipe(ImageMetadataSchema))
    params: ImageCombinationIdDTO,
  ) {
    return this.imageService.findOne(params.combinationId, params.id);
  }
}
