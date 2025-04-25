import { User as UserDTO } from '@clerk/backend';
import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PublicRoute } from 'src/common/decorators/public-route.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { TagsService } from './tags.service';

@ApiTags('tags')
@ApiBearerAuth('swagger-access-token')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  //#region [GET] /stores - Get all tags
  @Get()
  @ApiOperation({ summary: 'Get all tags (public route)' })
  @ApiResponse({
    status: 200,
    description: 'List of all tags owned by the authenticated user',
  })
  @PublicRoute()
  findAll() {
    return this.tagsService.findAll();
  }
  //#endregion

  //#region [GET] /stores/:id - Get a store by ID
  @ApiOperation({ summary: 'Get a specific tag by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Tag ID to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'Tag details returned successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Tag not found',
  })
  @Get(':id')
  @PublicRoute()
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(id);
  }
  //#endregion

  //#region [POST] /stores - Create a new tag
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiBody({
    // type: CreateStoreDTO,
    required: true,
    description: 'Tag creation payload',
  })
  @ApiResponse({
    status: 201,
    description: 'Tag created successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Tag not accessible by the user',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid tag data provided',
  })
  @Post()
  createOne(@User() user: UserDTO) {
    return this.tagsService.createOne(user);
  }
  //#endregion

  //#region [PATCH] /stores/:id - Patch a tag
  @ApiOperation({ summary: 'Update a new tag' })
  @ApiParam({ name: 'id', type: String, description: 'Tag ID to update' })
  @ApiBody({
    // type: CreateStoreDTO,
    required: true,
    description: 'Tag creation payload',
  })
  @ApiResponse({
    status: 201,
    description: 'Tag created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid tag data provided',
  })
  @Patch(':id')
  updateOne(@User() user: UserDTO, @Param('id') id: string) {
    return this.tagsService.updateOne(user, id);
  }
  //#endregion

  //#region [DELETE] /stores/:id - Delete a store
  @ApiOperation({ summary: 'Delete a tag' })
  @ApiParam({ name: 'id', type: String, description: 'Tag ID to delete' })
  @ApiResponse({
    status: 200,
    description: 'Tag deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Tag not accessible by the user',
  })
  @ApiResponse({
    status: 404,
    description: 'Tag not found',
  })
  @Delete('id')
  deleteOne(@User() user: UserDTO, @Param('id') id: string) {
    return this.tagsService.deleteOne(user, id);
  }
  //#endregion
}
