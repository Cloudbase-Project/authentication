import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  Logger,
  UseGuards,
  Inject,
  Param,
  Query,
} from '@nestjs/common';
import { userService } from './user.service';
import { AuthGuard } from 'src/auth/guards/authGuard';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ApiHeader } from '@nestjs/swagger';
import { OwnerGuard } from './guards/ownerGuard';

// @ApiHeader({ name: 'Authorization', required: true })
@Controller('user')
export class userController {
  private readonly logger = new Logger('userController');

  constructor(
    private readonly userService: userService,
    @Inject(REQUEST) private readonly req: Request,
  ) {}

  @Get('/') // route
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard)
  @HttpCode(200) // Return type
  getUser() {
    return this.userService.getUser(this.req.id);
  }

  @Get('/') // route
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(OwnerGuard)
  @HttpCode(200) // Return type
  viewUsers(
    @Param('projectId') projectId: string,
    @Query('per_page') per_page: string,
    @Query('page') page: string,
  ) {
    return this.userService.viewUsers(
      this.req.ownerId,
      projectId,
      per_page,
      page,
    );
  }
}
