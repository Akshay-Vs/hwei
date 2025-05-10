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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TagsService } from './tags.service';
import {
  TagInputDto,
  tagInputSchema,
  TagMetadataDto,
  tagsMetadataSchema,
  TagUpdateDto,
  tagUpdateSchema,
} from '../schemas/tags.schema';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { PublicRoute } from 'src/common/decorators/public-route.decorator';
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
} from '../schemas/query-schema';

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
    @Param('id') id: string,
    @Body(new ZodValidationPipe(tagUpdateSchema)) input: TagUpdateDto,
  ) {
    return this.tagsService.updateOne(id, input);
  }

  @Delete(':id')
  @DeleteOneDocs()
  // TODO: add super admin auth guard
  remove(@Param('id') id: string) {
    return this.tagsService.deleteOne(id);
  }
}
