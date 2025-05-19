import { Module } from '@nestjs/common';
import { LabelService } from './label/label.service';
import { LabelController } from './label/label.controller';
import { OptionController } from './option/option.controller';
import { OptionService } from './option/option.service';
import { CombinationController } from './combination/combination.controller';
import { CombinationService } from './combination/combination.service';
import { CombinationOptionService } from './combination-option/combination-option.service';
import { PrismaService } from '@database/prisma.service';
@Module({
  providers: [
    LabelService,
    OptionService,
    CombinationService,
    CombinationOptionService,
    PrismaService,
  ],
  controllers: [LabelController, OptionController, CombinationController],
  exports: [
    LabelService,
    OptionService,
    CombinationService,
    CombinationOptionService,
  ],
})
export class VariantsModule {}
