import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const FindAllDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find all labels',
      description: 'Retrieve a list of all labels for a specific product',
    }),
    ApiParam({
      name: 'productId',
      description: 'The ID of the product to get labels for',
    }),
    ApiParam({
      name: 'storeId',
      description: 'The ID of the store',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The list of labels has been successfully retrieved',
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
      summary: 'Find a label by ID',
      description: 'Retrieve a specific label by its ID for a product',
    }),
    ApiParam({
      name: 'productId',
      description: 'The ID of the product',
    }),
    ApiParam({
      name: 'id',
      description: 'The ID of the label to retrieve',
    }),
    ApiParam({
      name: 'storeId',
      description: 'The ID of the store',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The label has been successfully retrieved',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Label or product not found',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};
