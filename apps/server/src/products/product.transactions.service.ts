import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { BaseService } from 'src/common/services/base.service';
import { ProductTransactionInput } from '@hwei/schema/dto/product-transaction';
import { ImageService } from './image/image.service';
import { VariantsService } from './variants/variants.service';
import { ProductsService } from './products.service';

@Injectable()
export class ProductTransactionsService extends BaseService {
  protected readonly logger = new Logger(ProductTransactionsService.name);
  protected readonly entity = 'Product';

  constructor(
    protected readonly prisma: PrismaService,
    protected readonly product: ProductsService,
    protected readonly productImage: ImageService,
    protected readonly variant: VariantsService,
  ) {
    super(prisma);
  }

  async createOne(storeId: string, input: ProductTransactionInput) {
    try {
      await this.prisma.$transaction(async (tx) => {
        // create product
        const { id: productId } = await this.product.createOne(
          tx,
          storeId,
          input.metadata,
        );

        // populate images
        await this.productImage.createTransactionalImages(
          tx,
          productId,
          input.images,
        );

        // populate variants
        for (const variant of input.variants) {
          await this.variant.handleVariant(tx, productId, variant);
        }
      });
    } catch (err) {
      this.logger.error('Transaction Failed', JSON.stringify(err, null, 4));
      throw err;
    }
  }
}
