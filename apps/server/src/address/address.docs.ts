import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateAddressDto,
  UpdateAddressDto,
} from '@hwei/schema/dto/address.schema';

export const FindAllDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all addresses',
      description: 'Retrieve all active addresses for the authenticated user',
    }),
    ApiParam({
      name: 'storeId',
      type: String,
      description: 'Store ID',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'List of addresses returned successfully',
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
      summary: 'Get address by ID',
      description: 'Retrieve a single address by its ID',
    }),
    ApiParam({
      name: 'storeId',
      type: String,
      description: 'Store ID',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Address ID',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Address returned successfully',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Address not found',
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

export const FindDefaultDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get default address',
      description: 'Retrieve the default address for the authenticated user',
    }),
    ApiParam({
      name: 'storeId',
      type: String,
      description: 'Store ID',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Default address returned successfully',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'No default address found',
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

export const CreateOneDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new address',
      description:
        'Create a new address for the authenticated user. If this is the first address, it will be set as default automatically.',
    }),
    ApiParam({
      name: 'storeId',
      type: String,
      description: 'Store ID',
    }),
    ApiBody({
      type: CreateAddressDto,
      required: true,
      description: 'Address creation payload',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Address created successfully',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized (missing or invalid token)',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid address data provided',
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
      summary: 'Update address',
      description: 'Update address information',
    }),
    ApiParam({
      name: 'storeId',
      type: String,
      description: 'Store ID',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Address ID to update',
    }),
    ApiBody({
      type: UpdateAddressDto,
      required: true,
      description: 'Address update payload',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Address updated successfully',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Address not found',
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

export const SetDefaultDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Set default address',
      description: 'Set an address as the default address for the user',
    }),
    ApiParam({
      name: 'storeId',
      type: String,
      description: 'Store ID',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Address ID to set as default',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Default address set successfully',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Address not found',
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
      summary: 'Delete address',
      description:
        'Soft delete an address by its ID. If the deleted address was default, another address will be set as default automatically.',
    }),
    ApiParam({
      name: 'storeId',
      type: String,
      description: 'Store ID',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Address ID to delete',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Address deleted successfully',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Address not found',
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
      summary: 'Delete multiple addresses',
      description:
        'Bulk soft deletion of addresses by their IDs. If any deleted address was default, another address will be set as default automatically.',
    }),
    ApiParam({
      name: 'storeId',
      type: String,
      description: 'Store ID',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          ids: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of address IDs to delete',
          },
        },
        required: ['ids'],
      },
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Addresses deleted successfully',
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
