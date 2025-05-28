import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  currencyPaginationSchema,
  currencyPaginationDTO,
  currencyInputDTO,
  currencyInputSchema,
  currencyInputManySchema,
} from './schemas/currency.schema';
import { PublicRoute } from 'src/common/decorators/public-route.decorator';
import { StoreOwnershipGuard } from 'src/common/guards/store-ownership.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('currency')
@ApiBearerAuth('swagger-access-token')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  @PublicRoute()
  async findAll(
    @Param('storeId') storeId: string,
    @Query(new ZodValidationPipe(currencyPaginationSchema))
    pagination: currencyPaginationDTO,
  ) {
    return this.currencyService.findAll(storeId, pagination);
  }

  @Get(':id')
  @PublicRoute()
  async findOne(@Param('id') id: string) {
    return this.currencyService.findOne(id);
  }

  @Post()
  @UseGuards(StoreOwnershipGuard)
  async create(
    @Param('storeId') _storeId: string,
    @Body(new ZodValidationPipe(currencyInputSchema)) input: currencyInputDTO,
  ) {
    return this.currencyService.create(input);
  }

  @Post('/bulk')
  @UseGuards(StoreOwnershipGuard)
  async createBulk(
    @Param('storeId') _storeId: string,
    @Body(new ZodValidationPipe(currencyInputManySchema))
    input: currencyInputDTO[],
  ) {
    return this.currencyService.createMany(input);
  }

  @Patch(':id')
  @UseGuards(StoreOwnershipGuard)
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(currencyInputSchema)) input: currencyInputDTO,
  ) {
    return this.currencyService.update(id, input);
  }

  @Delete(':id')
  @UseGuards(StoreOwnershipGuard)
  async delete(@Param('id') id: string) {
    return this.currencyService.delete(id);
  }

  @Delete('/bulk')
  @UseGuards(StoreOwnershipGuard)
  async deleteBulk(@Body('ids') ids: string[]) {
    return this.currencyService.deleteMany(ids);
  }
}
