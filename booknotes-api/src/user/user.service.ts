import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './models/user-create.model';
import { Connection } from 'typeorm';
import { User } from '../db/entities/user';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(private readonly connection: Connection) {}

  repo = this.connection.getRepository(User);

  async createUser(body: UserCreateDto): Promise<User> {
    body.password = crypto
      .createHash('sha256')
      .update(body.password)
      .digest('hex');
    return await this.repo.save(body);
  }
}
