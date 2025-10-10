import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateStoreDto, UpdateStoreDto } from '@hwei/schema/dto/store.schema';

export const FindAllDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all stores for the authenticated user',
      description:
        'Retrieve a list of all stores owned by the authenticated user',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'List of all stores owned by the authenticated user',
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
      summary: 'Get a specific store by ID',
      description: 'Retrieve a specific store by its ID',
    }),
    ApiParam({
      name: 'storeId',
      type: String,
      description: 'Store ID to retrieve',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Store details returned successfully',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Store not found or not accessible by the user',
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
      summary: 'Create a new store',
      description: 'Create a new store for the authenticated user',
    }),
    ApiBody({
      type: CreateStoreDto,
      required: true,
      description: 'Store creation payload',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Store created successfully',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized (missing or invalid token)',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid store data provided',
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
      summary: 'Update an existing store',
      description: 'Update an existing store by ID',
    }),
    ApiParam({
      name: 'storeId',
      type: String,
      description: 'Store ID to update',
    }),
    ApiBody({
      type: UpdateStoreDto,
      required: true,
      description: 'Store update payload',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Store updated successfully',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Store not found or not accessible by the user',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid update payload',
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

export const DeleteOneDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a store',
      description: 'Delete a store by ID',
    }),
    ApiParam({
      name: 'storeId',
      type: String,
      description: 'Store ID to delete',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Store deleted successfully',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Store not found or not accessible by the user',
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
