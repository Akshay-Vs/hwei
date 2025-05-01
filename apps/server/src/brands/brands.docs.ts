import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateBrandDto, UpdateBrandDto } from './schemas/brands.schema';

export const FindAllDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find all brands',
      description: 'Retrieve a list of all brands',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The list of brands has been successfully retrieved',
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
      summary: 'Find a brand by ID',
      description: 'Retrieve a specific brand by its ID',
    }),
    ApiParam({ name: 'id', description: 'The ID of the brand to retrieve' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The brand has been successfully retrieved',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Brand not found',
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
      summary: 'Create a brand',
      description: 'Create a new brand',
    }),
    ApiBody({ type: CreateBrandDto, description: 'Brand data to create' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'The brand has been successfully created',
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
      summary: 'Update a brand',
      description: 'Update an existing brand by ID',
    }),
    ApiParam({ name: 'id', description: 'The ID of the brand to update' }),
    ApiBody({ type: UpdateBrandDto, description: 'Brand data to update' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The brand has been successfully updated',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Brand not found',
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
      summary: 'Delete a brand',
      description: 'Delete a brand by ID',
    }),
    ApiParam({ name: 'id', description: 'The ID of the brand to delete' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The brand has been successfully deleted',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Brand not found',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};
