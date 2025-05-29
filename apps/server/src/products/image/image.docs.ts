import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

export const FindAllByProductDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find all images by combination',
      description:
        'Retrieve a list of all images for a specific variant combination',
    }),
    ApiParam({
      name: 'combinationId',
      description: 'The ID of the variant combination',
    }),
    ApiQuery({
      name: 'skip',
      description: 'Number of images to skip',
      required: false,
    }),
    ApiQuery({
      name: 'take',
      description: 'Number of images to take',
      required: false,
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The list of images has been successfully retrieved',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Combination not found',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};

export const FindOneByProductDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find an image by combination and ID',
      description:
        'Retrieve a specific image by its ID within a variant combination',
    }),
    ApiParam({
      name: 'combinationId',
      description: 'The ID of the variant combination',
    }),
    ApiParam({
      name: 'id',
      description: 'The ID of the image to retrieve',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The image has been successfully retrieved',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Image or combination not found',
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
};
