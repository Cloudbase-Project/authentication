import {
  Controller,
  Get,
  HttpCode,
  Logger,
  UseGuards,
  Inject,
  Param,
  Query,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ApiHeader } from '@nestjs/swagger';
import { OwnerGuard } from './guards/ownerGuard';
import { configService } from './config.service';

// @ApiHeader({ name: 'Authorization', required: true })
@Controller('config')
export class configController {
  private readonly logger = new Logger('configController');

  constructor(
    private readonly configService: configService,
    @Inject(REQUEST) private readonly req: Request,
  ) {}

  @Get('/users/:projectId') // route
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(OwnerGuard)
  @HttpCode(200) // Return type
  viewUsers(
    @Param('projectId') projectId: string,
    @Query('per_page') per_page: string,
    @Query('page') page: string,
  ) {
    return this.configService.viewUsers(
      this.req.ownerId,
      projectId,
      per_page,
      page,
    );
  }
}
