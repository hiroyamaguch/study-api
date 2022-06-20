import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import * as bcrypt from 'bcrypt';
import { ILogin } from './dtos';
import { AppError } from '@shared/errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: User): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      email: data.email,
    });

    const password = await bcrypt.hash(data.password, 10);

    if (user) {
      const newUser = await this.usersRepository.save({
        ...user,
        ...data,
        password,
      });

      delete newUser.password;
      return newUser;
    } else {
      const newUser = this.usersRepository.create({ ...data, password });

      await this.usersRepository.save(newUser);

      delete newUser.password;
      return newUser;
    }
  }

  async login(data: ILogin): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      email: data.email,
    });

    if (!user) throw new AppError('user not found', 404);

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) throw new AppError('wrong password', 400);

    delete user.password;
    return user;
  }
}
