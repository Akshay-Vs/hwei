import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TagInputDto, TagUpdateDto } from './schemas/tags.schema';

export const FindAllDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find all tags',
      description: 'Retrieve a list of all tags with optional filtering',
    }),
    ApiQuery({
      name: 'search',
      description: 'Search query for filtering tags',
      required: false,
    }),
    ApiQuery({
      name: 'skip',
      description: 'Number of tags to skip',
      required: false,
    }),
    ApiQuery({
      name: 'take',
      description: 'Number of tags to take',
      required: false,
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The list of tags has been successfully retrieved',
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
      summary: 'Find a tag by ID',
      description: 'Retrieve a specific tag by its ID',
    }),
    ApiParam({ name: 'id', description: 'The ID of the tag to retrieve' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The tag has been successfully retrieved',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Tag not found',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};

export const CreateManyDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create multiple tags',
      description: 'Create new tags',
    }),
    ApiBody({ type: TagInputDto, description: 'Tag data to create' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'The tags have been successfully created',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input data',
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

export const UpdateOneDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update a tag',
      description: 'Update an existing tag by ID',
    }),
    ApiParam({ name: 'id', description: 'The ID of the tag to update' }),
    ApiBody({ type: TagUpdateDto, description: 'Tag data to update' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The tag has been successfully updated',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Tag not found',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input data',
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
      summary: 'Delete a tag',
      description: 'Delete a tag by ID',
    }),
    ApiParam({ name: 'id', description: 'The ID of the tag to delete' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The tag has been successfully deleted',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Tag not found',
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
