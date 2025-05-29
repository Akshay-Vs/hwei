import { Prisma } from '@/generated';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { handleInternalError } from '@errors/handlers/internal.error.handler';
import {
  Label,
  LabelInput,
  LabelUpdateDTO,
} from 'src/products/schemas/variants.schema';

@Injectable()
export class LabelService {
  private readonly entity = 'Label';
  private readonly logger = new Logger(LabelService.name);
  constructor(private readonly prisma: PrismaService) {}

  async findAll(productId: string): Promise<Label[]> {
    try {
      return await this.prisma.variantLabel.findMany({
        where: { productId },
      });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async findOne(productId: string, id: string): Promise<Label> {
    try {
      return await this.prisma.variantLabel.findUniqueOrThrow({
        where: { id, productId },
      });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async createTx(
    tx: Prisma.TransactionClient,
    input: LabelInput,
  ): Promise<Label> {
    try {
      return await tx.variantLabel.create({ data: input });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async rearrange(
    id: string,
    productId: string,
    sortOrder: number,
  ): Promise<Label> {
    try {
      return await this.prisma.variantLabel.update({
        where: { id, productId },
        data: { sortOrder },
      });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }

  async updateOne(
    tx: Prisma.TransactionClient,
    id: string,
    productId: string,
    input: LabelUpdateDTO,
  ): Promise<Label> {
    try {
      return await tx.variantLabel.update({
        where: { id, productId },
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

  async deleteOne(
    tx: Prisma.TransactionClient,
    id: string,
    productId: string,
  ): Promise<void> {
    try {
      await tx.variantLabel.delete({ where: { id, productId } });
    } catch (error) {
      return handleInternalError({
        error,
        logger: this.logger,
        entity: this.entity,
      });
    }
  }
}
