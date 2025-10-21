import { Module } from '@nestjs/common';
import { LabelService } from './label/label.service';
import { LabelController } from './label/label.controller';
import { OptionController } from './option/option.controller';
import { OptionService } from './option/option.service';
import { CombinationController } from './combination/combination.controller';
import { CombinationService } from './combination/combination.service';
import { CombinationOptionService } from './combination-option/combination-option.service';
import { PrismaService } from '@database/prisma.service';
import { InventoryService } from './inventory/inventory.service';
import { InventoryController } from './inventory/inventory.controller';
import { PricingService } from './pricing/pricing.service';
import { PricingController } from './pricing/pricing.controller';
import { ImageService } from '../image/image.service';
import { VariantsService } from './variants.service';

@Module({
  providers: [
    LabelService,
    OptionService,
    CombinationService,
    CombinationOptionService,
    InventoryService,
    PricingService,
    PrismaService,
    ImageService,
    VariantsService,
  ],
  controllers: [
    LabelController,
    OptionController,
    CombinationController,
    InventoryController,
    PricingController,
  ],
  exports: [
    LabelService,
    OptionService,
    CombinationService,
    CombinationOptionService,
    InventoryService,
    PricingService,
    VariantsService,
  ],
})
export class VariantsModule { }
