import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { ProductDto, ProductUpdateDto } from './schemas/products.schema';
import { PaginationQueryDTO } from './schemas/query-schema';
import { handleInternalError } from '@errors/handlers/internal.error.handler';
import { BaseService } from 'src/common/services/base.service';
import { LabelService } from './variants/label/label.service';
import { PricingService } from './variants/pricing/pricing.service';
import { InventoryService } from './variants/inventory/inventory.service';
import { ImageService } from './image/image.service';
import { CombinationService } from './variants/combination/combination.service';
import { CombinationOptionService } from './variants/combination-option/combination-option.service';
import { OptionService } from './variants/option/option.service';
import { ProductTransactionInput } from './schemas/product-transaction';

@Injectable()
export class ProductsService extends BaseService {
  protected readonly logger = new Logger(ProductsService.name);
  protected readonly entity = 'Product';

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

  async findAll(
    storeId: string,
    query: PaginationQueryDTO,
  ): Promise<ProductDto[]> {
    try {
      return await this.prisma.product.findMany({
        where: {
          storeId,
          title: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        skip: query.skip,
        take: query.take,
        include: {
          images: true,
        },
      });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async findOne(storeId: string, id: string): Promise<ProductDto> {
    try {
      return await this.prisma.product.findUniqueOrThrow({
        where: { id, storeId },
        include: {
          images: true,
          brand: true,
          category: true,
          tags: true,
          variantCombinations: {
            include: {
              inventory: true,
              options: true,
              pricing: {
                include: {
                  currency: true,
                },
              },
              promotions: {
                include: {
                  promotion: true,
                },
              },
            },
          },
          variantLabels: {
            include: {
              options: true,
            },
          },
        },
      });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async createOne(storeId: string, input: ProductTransactionInput) {
    return this.withErrorHandling(() =>
      this.prisma.$transaction(async (tx) => {
        // populate product table
        const { id: productId } = await this.getClient(tx).product.create({
          data: {
            ...input.metadata,
            storeId,
          },
        });

        // populate images
        await this.productImage.createManyTx(tx, {
          ...input.images.map((image) => ({
            ...image,
            productId,
          })),
        });

        for (const variant of input.variants) {
          const { id: variantLabelId } = await this.variantLabel.createTx(tx, {
            ...variant.label,
            productId,
          });

          for (const item of variant.items) {
            const { id: optionId } = await this.variantOption.createTx(tx, {
              name: item.name,
              sortOrder: item.sortOrder,
              thumbnail: item.thumbnail,
              variantLabelId,
            });

            this.logger.debug(
              `Created option ${optionId} for variant ${variantLabelId}`,
            );

            const { id: combinationId } =
              await this.variantCombination.createTx(tx, {
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
              price: item.price,
              currencyId: item.currencyId,
            });

            this.logger.debug(
              `Created price ${item.price} for combination ${combinationId}`,
            );
          }
        }
      }),
    );
  }

  // async createMany(input: ProductInputDto[]): Promise<Prisma.BatchPayload> {
  //   try {
  //     return await this.prisma.product.createMany({
  //       data: input,
  //       skipDuplicates: true,
  //     });
  //   } catch (error) {
  //     return handleInternalError({
  //       error,
  //       logger: this.logger,
  //       entity: this.entity,
  //     });
  //   }
  // }

  async updateOne(
    storeId: string,
    id: string,
    input: ProductUpdateDto,
  ): Promise<ProductDto> {
    try {
      return await this.prisma.product.update({
        where: { id, storeId },
        data: input,
      });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async deleteOne(storeId: string, id: string): Promise<ProductDto> {
    try {
      return await this.prisma.product.delete({ where: { id, storeId } });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }
}
