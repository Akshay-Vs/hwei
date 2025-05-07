import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TagsService } from './tags.service';
import {
  tagBaseSchema,
  TagInputDto,
  TagQueryDto,
  tagQuerySchema,
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
  findAll(
    @Param('query', new ZodValidationPipe(tagQuerySchema)) query: TagQueryDto,
  ) {
    return this.tagsService.findAll(query);
  }

  @Get(':id')
  @PublicRoute()
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(id);
  }

  @Post()
  create(@Body(new ZodValidationPipe(tagBaseSchema)) input: TagInputDto) {
    return this.tagsService.createMany(input);
  }

  @Delete(':id')
  // TODO: add super admin auth guard
  remove(@Param('id') id: string) {
    return this.tagsService.deleteOne(id);
  }
}
