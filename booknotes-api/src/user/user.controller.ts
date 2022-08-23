import { Controller, Post, Body } from '@nestjs/common';
import { User } from '../db/entities/user';
import { UserCreateDto } from './models/user-create.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: UserCreateDto): Promise<User> {
    return await this.userService.createUser(body);
  }
}
