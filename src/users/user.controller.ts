import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindById, CreateUserDto } from './user.validation';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(
    @Body() body: CreateUserDto 
  ) {
    
    const user = await this.userService.createUser(
      body.username,
      body.password,
      body.fullname,
      body.address,
      body.email,
      body.phone,
    );
    return user;
  }
  
  @Get(':id')
  async getUser(
    @Param() params: FindById
  ) {
    const user = await this.userService.findUserById(params.id);
    return user;
  }

  @Get('')
  async getAllUsers() {
    const users = await this.userService.findAllUsers();
    return users;
  }
}
