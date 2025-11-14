import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { BaseService } from 'src/common/services/base.service';
import { ProductTransactionInput } from '@hwei/schema/dto/product-transaction';
import { ImageService } from './image/image.service';
import { VariantsService } from './variants/variants.service';
import { ProductsService } from './products.service';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
export class ProductTransactionsService extends BaseService {
  protected readonly logger = new Logger(ProductTransactionsService.name);
  protected readonly entity = 'Product';

  constructor(
    protected readonly prisma: PrismaService,
    protected readonly product: ProductsService,
    protected readonly productImage: ImageService,
    protected readonly variant: VariantsService,
    protected readonly tag: TagsService,
  ) {
    super(prisma);
  }

  async createOne(storeId: string, input: ProductTransactionInput) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // create product
        const product = await this.product.createOne(
          tx,
          storeId,
          input.metadata,
        );

        // populate images
        await this.productImage.createTransactionalImages(
          tx,
          product.id,
          input.images,
        );

        // populate tags
        if (input.tags?.names?.length) {
          const tagIds = await this.tag.resolveTagIds(tx, input.tags.names);
          await this.tag.connectToProduct(tx, product.id, tagIds);
        }

        // populate variants
        for (const variant of input.variants) {
          await this.variant.handleVariant(tx, product.id, variant);
        }
        return product;
      });
    } catch (err) {
      this.logger.error('Transaction Failed', JSON.stringify(err, null, 4));
      throw err;
    }
  }
}
