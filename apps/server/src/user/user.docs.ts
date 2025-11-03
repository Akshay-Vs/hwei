import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateUserDto,
  UpdateRoleDto,
  UpdateUserDto,
} from '@hwei/schema/dto/user.schema';

export const FindAllDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all users (admin only)',
      description: 'Retrieve all active users with pagination',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'List of users returned successfully',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};

export const UpdateRoleDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update user role (admin only)',
      description: 'Update user role',
    }),
    ApiParam({
      name: 'userId',
      type: String,
      description: 'User ID to update',
    }),
    ApiBody({
      type: UpdateRoleDto,
      required: true,
      description: 'User update payload',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'List of users returned successfully',
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
      summary: 'Get user by ID',
      description: 'Retrieve a single user by their ID',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'User ID',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User returned successfully',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};

export const FindByClerkIdDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get user by Clerk ID',
      description: 'Retrieve a user by their Clerk authentication ID',
    }),
    ApiParam({
      name: 'clerkId',
      type: String,
      description: 'Clerk user ID',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User returned successfully',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};

export const FindByEmailDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get user by email',
      description: 'Retrieve a user by their email address',
    }),
    ApiParam({
      name: 'email',
      type: String,
      description: 'User email address',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User returned successfully',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
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
      summary: 'Create a new user',
      description: 'Create a new user account',
    }),
    ApiBody({
      type: CreateUserDto,
      required: true,
      description: 'User creation payload',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'User created successfully',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized (missing or invalid token)',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid user data provided',
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'User with email or clerkId already exists',
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
      summary: 'Update user',
      description: 'Update user information',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'User ID to update',
    }),
    ApiBody({
      type: UpdateUserDto,
      required: true,
      description: 'User update payload',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User updated successfully',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
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
      summary: 'Delete user',
      description: 'Soft delete a user by their ID',
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'User ID to delete',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User deleted successfully',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
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
      summary: 'Delete multiple users',
      description: 'Bulk soft deletion of users by their IDs',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          ids: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of user IDs to delete',
          },
        },
        required: ['ids'],
      },
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Users deleted successfully',
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
