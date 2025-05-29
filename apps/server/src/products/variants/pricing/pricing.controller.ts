import { Controller } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Pricing')
@ApiBearerAuth('swagger-access-token')
@Controller('pricing')
export class PricingController {
  constructor(private readonly pricesService: PricingService) {}

  async findByCombination(combinationId: string) {
    return this.pricesService.findByCombination(combinationId);
  }
}
