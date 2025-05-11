import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CombinationService } from './combination.service';
import { PublicRoute } from 'src/common/decorators/public-route.decorator';

@Controller('combination')
@ApiTags('combination')
@ApiBearerAuth('swagger-access-token')
export class CombinationController {
  constructor(private readonly combinationService: CombinationService) {}

  @Get()
  @PublicRoute()
  async findAll(@Param('productId') productId: string) {
    return await this.combinationService.findAll(productId);
  }

  @Get(':id')
  @PublicRoute()
  async findOne(
    @Param('productId') productId: string,
    @Param('id') id: string,
  ) {
    return await this.combinationService.findOne(productId, id);
  }
}
