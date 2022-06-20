import { Body, Controller, Post } from '@nestjs/common';
import { ILogin } from './dtos';
import { User } from './entities';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: User): Promise<User> {
    return this.usersService.create(data);
  }

  @Post('login')
  async login(@Body() data: ILogin): Promise<User> {
    return this.usersService.login(data);
  }
}
