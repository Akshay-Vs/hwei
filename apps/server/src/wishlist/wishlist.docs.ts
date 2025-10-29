import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateWishlistItemDto,
  UpdateWishlistItemDto,
} from '@hwei/schema/dto/wishlist.schema';

export const FindAllDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all wishlists for the authenticated store',
      description: 'Retrieve all wishlist items belonging to a store',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'List of wishlists returned successfully',
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
      summary: 'Create a new wishlist',
      description: 'Create a new wishlist for a store',
    }),
    ApiBody({
      type: CreateWishlistItemDto,
      required: true,
      description: 'Wishlist creation payload',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Wishlist created successfully',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized (missing or invalid token)',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid wishlist data provided',
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
      summary: 'Remove an item"',
      description: 'Remove a product from the wishlist by its ID',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Item ID to remove',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Item removed successfully',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Item not found',
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
      summary: 'Delete multiple wishlist items',
      description: 'Bulk deletion of wishlist items by their IDs',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          ids: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of item IDs to remove',
          },
        },
        required: ['ids'],
      },
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Item removed successfully',
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
