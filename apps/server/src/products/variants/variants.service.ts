import { Prisma } from '@/generated';
import { Injectable, Logger } from '@nestjs/common';
import { ImageService } from '../image/image.service';
import { CombinationOptionService } from './combination-option/combination-option.service';
import { CombinationService } from './combination/combination.service';
import { InventoryService } from './inventory/inventory.service';
import { LabelService } from './label/label.service';
import { OptionService } from './option/option.service';
import { PricingService } from './pricing/pricing.service';
import { BaseService } from 'src/common/services/base.service';
import { PrismaService } from 'src/common/database/prisma.service';
import { VariantTransactionInput } from '../schemas/variants.schema';

@Injectable()
export class VariantsService extends BaseService {
  protected readonly logger = new Logger(VariantsService.name);
  protected readonly entity = 'Variant';

  constructor(
    protected readonly prisma: PrismaService,
    protected readonly productImage: ImageService,
    protected readonly variantCombination: CombinationService,
    protected readonly variantCombinationOption: CombinationOptionService,
    protected readonly variantOption: OptionService,
    protected readonly variantInventory: InventoryService,
    protected readonly variantLabel: LabelService,
    protected readonly variantPricing: PricingService,
  ) {
    super(prisma);
  }

  async handleVariant(
    tx: Prisma.TransactionClient,
    productId: string,
    variant: VariantTransactionInput,
  ) {
    const { id: variantLabelId } = await this.variantLabel.createTx(tx, {
      ...variant.label,
      productId,
    });

    for (const item of variant.items) {
      await this.handleVariantItem(tx, productId, variantLabelId, item);
    }
  }

  private async handleVariantItem(
    tx: Prisma.TransactionClient,
    productId: string,
    variantLabelId: string,
    item: VariantTransactionInput['items'][number],
  ) {
    const { id: optionId } = await this.variantOption.createTx(tx, {
      name: item.name,
      sortOrder: item.sortOrder,
      thumbnail: item.thumbnail,
      variantLabelId,
    });
    this.logger.debug(
      `Created option ${optionId} for variant ${variantLabelId}`,
    );

    const { id: combinationId } = await this.variantCombination.createTx(tx, {
      sku: item.sku,
      productId,
    });
    this.logger.debug(
      `Created combination ${combinationId} for variant ${variantLabelId}`,
    );

    await this.variantCombinationOption.attachCombinationOption(
      tx,
      combinationId,
      optionId,
    );
    this.logger.debug(
      `Attached option ${optionId} to combination ${combinationId}`,
    );

    await this.variantInventory.createStockTx(tx, {
      stock: item.stock,
      combinationId,
    });
    this.logger.debug(
      `Created stock ${item.stock} for combination ${combinationId}`,
    );

    await this.variantPricing.createByCombination(tx, {
      combinationId,
      currencyId: item.currencyId,
      price: item.price,
    });
    this.logger.debug(
      `Attached price ${item.currencyId} for combination ${combinationId}`,
    );
  }
}
