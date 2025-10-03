import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { PublicRoute } from 'src/common/decorators/public-route.decorator';
import {
  InventoryCombinationDTO,
  InventoryCombinationSchema,
  InventoryFilterDTO,
  InventoryFilterSchema,
} from '@hwei/schema/dto/inventory.schema';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@ApiTags('variant-inventory')
@ApiBearerAuth('swagger-access-token')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @PublicRoute()
  @Get(':combinationId/:id')
  findMany(
    @Param(new ZodValidationPipe(InventoryCombinationSchema))
    params: InventoryCombinationDTO,
    @Query(new ZodValidationPipe(InventoryFilterSchema))
    filter: InventoryFilterDTO,
  ) {
    return this.inventoryService.findStock(
      params.id,
      params.combinationId,
      filter,
    );
  }
}
