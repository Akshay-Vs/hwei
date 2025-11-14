import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateCartItemDto,
  UpdateCartItemDto,
} from '@hwei/schema/dto/cart.schema';

export const FindAllDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all cart items for the authenticated user',
      description: 'Retrieve all cart items belonging to a user in a store',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'List of cart items returned successfully',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};

export const CreateOneDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Add item to cart',
      description:
        'Add a new item to the cart or increment quantity if it already exists',
    }),
    ApiBody({
      type: CreateCartItemDto,
      required: true,
      description: 'Cart item creation payload',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Cart item added successfully',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized (missing or invalid token)',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid cart item data provided',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};

export const UpdateOneDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update cart item',
      description: 'Update cart item details such as quantity or variant',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Cart item ID to update',
    }),
    ApiBody({
      type: UpdateCartItemDto,
      required: true,
      description: 'Cart item update payload',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Cart item updated successfully',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Cart item not found',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized (missing or invalid token)',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid update data provided',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};

export const DeleteOneDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Remove cart item',
      description: 'Remove a product from the cart by its ID',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Cart item ID to remove',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Cart item removed successfully',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Cart item not found',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized (missing or invalid token)',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};

export const DeleteManyDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete multiple cart items',
      description: 'Bulk deletion of cart items by their IDs',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          ids: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of cart item IDs to remove',
          },
        },
        required: ['ids'],
      },
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Cart items removed successfully',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized (missing or invalid token)',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};
