import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@hwei/schema/dto/categories.schema';

export const FindAllDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find all categories',
      description: 'Retrieve a list of all categories',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The list of categories has been successfully retrieved',
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
      summary: 'Find a category by ID',
      description: 'Retrieve a specific category by its ID',
    }),
    ApiParam({ name: 'id', description: 'The ID of the category to retrieve' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The category has been successfully retrieved',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Category not found',
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
      summary: 'Create a category',
      description: 'Create a new category',
    }),
    ApiBody({
      type: CreateCategoryDto,
      description: 'Category data to create',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'The category has been successfully created',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized (missing or invalid token)',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input data',
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
      summary: 'Update a category',
      description: 'Update an existing category by ID',
    }),
    ApiParam({ name: 'id', description: 'The ID of the category to update' }),
    ApiBody({
      type: UpdateCategoryDto,
      description: 'Category data to update',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The category has been successfully updated',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized (missing or invalid token)',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Category not found',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input data',
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
      summary: 'Delete a category',
      description: 'Delete a category by ID',
    }),
    ApiParam({ name: 'id', description: 'The ID of the category to delete' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The category has been successfully deleted',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized (missing or invalid token)',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Category not found',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};
