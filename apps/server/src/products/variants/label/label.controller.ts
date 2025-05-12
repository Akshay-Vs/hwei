import { Controller, Get, Param } from '@nestjs/common';
import { LabelService } from './label.service';
import { FindAllDocs, FindOneDocs } from './label.docs';
import { PublicRoute } from 'src/common/decorators/public-route.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('label')
@ApiTags('variant-label')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Get()
  @PublicRoute()
  @FindAllDocs()
  async findAll(@Param('productId') productId: string) {
    return await this.labelService.findAll(productId);
  }

  @Get(':id')
  @PublicRoute()
  @FindOneDocs()
  async findOne(
    @Param('productId') productId: string,
    @Param('id') id: string,
  ) {
    return await this.labelService.findOne(productId, id);
  }
}
