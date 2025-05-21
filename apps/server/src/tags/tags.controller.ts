import { TagsService } from './tags.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from '@pipes/zod-validation.pipe';
import { PublicRoute } from '@decorators/public-route.decorator';

import {
  TagInputDto,
  tagInputSchema,
  TagMetadataDto,
  tagsMetadataSchema,
  TagUpdateDto,
  tagUpdateSchema,
} from '../products/schemas/tags.schema';
import {
  CreateManyDocs,
  DeleteOneDocs,
  FindAllDocs,
  FindOneDocs,
  UpdateOneDocs,
} from './tags.docs';
import {
  PaginationQueryDTO,
  paginationQuerySchema,
} from '../products/schemas/query-schema';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@ApiTags('tags')
@ApiBearerAuth('swagger-access-token')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @PublicRoute()
  @FindAllDocs()
  findAll(
    @Query(new ZodValidationPipe(paginationQuerySchema))
    query: PaginationQueryDTO,
  ) {
    return this.tagsService.findAll(query);
  }

  @Get(':id')
  @PublicRoute()
  @FindOneDocs()
  findOne(
    @Param(new ZodValidationPipe(tagsMetadataSchema)) params: TagMetadataDto,
  ) {
    return this.tagsService.findOne(params);
  }

  @Post()
  @CreateManyDocs()
  createMany(@Body(new ZodValidationPipe(tagInputSchema)) input: TagInputDto) {
    return this.tagsService.createMany(input);
  }

  // TODO: add super admin auth guard
  @Patch(':id')
  @UpdateOneDocs()
  update(
    @Param(new ZodValidationPipe(tagsMetadataSchema)) params: TagMetadataDto,
    @Body(new ZodValidationPipe(tagUpdateSchema)) input: TagUpdateDto,
  ) {
    return this.tagsService.updateOne(params.id, input);
  }

  @Delete(':id')
  @DeleteOneDocs()
  // TODO: add super admin auth guard
  remove(
    @Param(new ZodValidationPipe(tagsMetadataSchema)) params: TagMetadataDto,
  ) {
    return this.tagsService.deleteOne(params.id);
  }
}
