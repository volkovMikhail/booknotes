import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './models/user-create.model';
import { Connection } from 'typeorm';
import { User } from '../db/entities/user';

@Injectable()
export class UserService {
  constructor(private readonly connection: Connection) {}

  repo = this.connection.getRepository(User);

  async createUser(body: UserCreateDto): Promise<User> {
    const user = await this.repo.save(body);
    console.log(user);
    return user;
  }
}
