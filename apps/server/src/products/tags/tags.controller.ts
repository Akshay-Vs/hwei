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
  TagQueryDto,
  tagQuerySchema,
  tagsMetadataSchema,
  TagUpdateDto,
  tagUpdateSchema,
} from '../schemas/tags.schema';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { PublicRoute } from 'src/common/decorators/public-route.decorator';

@ApiTags('tags')
@ApiBearerAuth('swagger-access-token')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @PublicRoute()
  findAll(@Query(new ZodValidationPipe(tagQuerySchema)) query: TagQueryDto) {
    return this.tagsService.findAll(query);
  }

  @Get(':id')
  @PublicRoute()
  findOne(
    @Param(new ZodValidationPipe(tagsMetadataSchema)) params: TagMetadataDto,
  ) {
    return this.tagsService.findOne(params);
  }

  @Post()
  createMany(@Body(new ZodValidationPipe(tagInputSchema)) input: TagInputDto) {
    return this.tagsService.createMany(input);
  }

  // TODO: add super admin auth guard
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(tagUpdateSchema)) input: TagUpdateDto,
  ) {
    return this.tagsService.updateOne(id, input);
  }

  @Delete(':id')
  // TODO: add super admin auth guard
  remove(@Param('id') id: string) {
    return this.tagsService.deleteOne(id);
  }
}
