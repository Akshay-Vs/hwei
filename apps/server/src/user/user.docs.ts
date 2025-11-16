// user.docs.ts
import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { UpdateRoleDto, UpdateUserDto } from '@hwei/schema/dto/user.schema';

/**
 * Get all users (store owner / admin only)
 * Controller: @Get('') with StoreOwnershipGuard
 */
export const FindAllDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all users (store owner / admin only)',
      description:
        'Retrieve all active users with pagination (requires store ownership).',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'List of users returned successfully',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized (missing or invalid token)',
    }),
    ApiForbiddenResponse({
      description: 'Forbidden (requires store ownership / admin privileges)',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};

/**
 * Update user role (store owner / admin only)
 * Controller: @Patch('role/:id')
 */
export const UpdateRoleDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update user role (store owner / admin only)',
      description:
        "Update a user's role by user ID (requires store ownership).",
    }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'User ID to update',
    }),
    ApiBody({
      type: UpdateRoleDto,
      required: true,
      description: 'Role update payload',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User role updated successfully',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized (missing or invalid token)',
    }),
    ApiForbiddenResponse({
      description: 'Forbidden (requires store ownership / admin privileges)',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid role data provided',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};

/**
 * Get user by token
 * Controller: @Get()
 */
export const FindMeDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get Current User',
      description: 'Retrieve a single user by auth token.',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User returned successfully',
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

/**
 * Get user by ID (store owner / admin only)
 * Controller: @Get(':id')
 */
export const FindByIdDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get User by ID (admin only)',
      description: 'Retrieve a single user by id.',
    }),

    ApiParam({
      name: 'id',
      type: String,
      description: 'User ID to update',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User returned successfully',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized (missing or invalid token)',
    }),
    ApiForbiddenResponse({
      description: 'Forbidden (requires store ownership / admin privileges)',
    }),

    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};

/**
 * Get user by Clerk ID (store owner / admin only)
 * Controller: @Get('clerk/:clerkId')
 */
export const FindByClerkIdDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get user by Clerk ID',
      description:
        'Retrieve a user by their Clerk authentication ID (requires store ownership).',
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
    ApiUnauthorizedResponse({
      description: 'Unauthorized (missing or invalid token)',
    }),
    ApiForbiddenResponse({
      description: 'Forbidden (requires store ownership / admin privileges)',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};

/**
 * Get user by email (admin only)
 * Controller: @Get('email/:email')
 */
export const FindByEmailDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get user by email (admin only)',
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
    ApiUnauthorizedResponse({
      description: 'Unauthorized (missing or invalid token)',
    }),
    ApiForbiddenResponse({
      description: 'Forbidden (requires store ownership / admin privileges)',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};

/**
 * Create a new user from authenticated Clerk session
 * Controller: @Post()
 * NOTE: Controller creates the user from the authenticated Clerk user (no request body expected).
 */
export const CreateOneDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new user from authenticated Clerk session',
      description:
        'Create a new user account using the authenticated Clerk user (no request body required).',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'User created successfully',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized (missing or invalid token)',
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

/**
 * Update current authenticated user
 * Controller: @Patch()
 * NOTE: This updates the currently authenticated user's data (no :id param).
 */
export const UpdateOneDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update current user',
      description:
        "Update the authenticated user's information (updates current user's record).",
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

/**
 * Delete user by ID (store owner / admin only)
 * Controller: @Delete()
 */
export const DeleteOneDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete Self',
      description: 'Soft delete a user by token',
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
    ApiForbiddenResponse({
      description: 'Forbidden (requires store ownership / admin privileges)',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};

/**
 * Delete multiple users (bulk) (admin only)
 * Controller: @Delete('/bulk')
 * Body: { ids: string[] }
 */
export const DeleteManyDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete multiple users (admin only)',
      description:
        'Bulk soft deletion of users by their IDs (requires store ownership).',
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
    ApiForbiddenResponse({
      description: 'Forbidden (requires store ownership / admin privileges)',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};
