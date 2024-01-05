import { Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { ApiQuery } from '@nestjs/swagger';

@Controller('api')
export class UsersController {
  constructor(private userService: UsersService) { }

  @ApiQuery({ name: 'username' })
  @UseGuards(AuthGuard)
  @Put('/user/:username')
  changeUser(@Param('username') username: string, @Req() req: Request) {
    return this.userService.changeUser(username, req['user']);
  }

  @UseGuards(AuthGuard)
  @Get("/users")
  findAllUsers() {
    console.log(21)
    return this.userService.findAll()
  }
  
  @UseGuards(AuthGuard)
  @Get("/users/:username")
  findOneUser(@Param('username') username: string){
    return this.userService.findOne(username)
  }
}
