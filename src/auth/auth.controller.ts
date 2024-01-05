import { ApiBody } from '@nestjs/swagger';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('api')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('user')
  getProfile(@Req() req: Request) {
    return req['user'];
  }


  @Post('tguser')
  TgAuthUser(@Body() user: User) {
    return this.userService.AuthTgUser(user);
  }

  @Post('user')
  CreateUser(@Body() user: User) {
    return this.userService.createUser(user);
  }
}
