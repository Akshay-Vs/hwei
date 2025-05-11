import { Module } from '@nestjs/common';
import { LabelService } from './label/label.service';
import { LabelController } from './label/label.controller';
import { OptionController } from './option/option.controller';
import { OptionService } from './option/option.service';
import { CombinationController } from './combination/combination.controller';
import { CombinationService } from './combination/combination.service';
import { CombinationOptionService } from './combination-option/combination-option.service';
import { CombinationOptionController } from './combination-option/combination-option.controller';
@Module({
  providers: [
    LabelService,
    OptionService,
    CombinationService,
    CombinationOptionService,
  ],
  controllers: [
    LabelController,
    OptionController,
    CombinationController,
    CombinationOptionController,
  ],
})
export class VarientsModule {}
