import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CombinationService } from './combination.service';
import { PublicRoute } from '@decorators/public-route.decorator';
import { FindAllDocs, FindOneDocs } from './combination.docs';

@Controller('combination')
@ApiTags('variant-combination')
@ApiBearerAuth('swagger-access-token')
export class CombinationController {
  constructor(private readonly combinationService: CombinationService) {}

  @Get()
  @PublicRoute()
  @FindAllDocs()
  async findAll(@Param('productId') productId: string) {
    return await this.combinationService.findAll(productId);
  }

  @Get(':id')
  @PublicRoute()
  @FindOneDocs()
  async findOne(
    @Param('productId') productId: string,
    @Param('id') id: string,
  ) {
    return await this.combinationService.findOne(productId, id);
  }
}
