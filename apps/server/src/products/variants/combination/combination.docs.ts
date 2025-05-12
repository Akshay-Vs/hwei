import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const FindAllDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find all combinations',
      description: 'Retrieve a list of all combinations for a specific product',
    }),
    ApiParam({
      name: 'productId',
      description: 'The ID of the product to get combinations for',
    }),
    ApiParam({
      name: 'storeId',
      description: 'The ID of the store',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The list of combinations has been successfully retrieved',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Product not found',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};

export const FindOneDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find a combination by ID',
      description: 'Retrieve a specific combination by its ID for a product',
    }),
    ApiParam({
      name: 'productId',
      description: 'The ID of the product',
    }),
    ApiParam({
      name: 'id',
      description: 'The ID of the combination to retrieve',
    }),
    ApiParam({
      name: 'storeId',
      description: 'The ID of the store',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The combination has been successfully retrieved',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Combination or product not found',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};
