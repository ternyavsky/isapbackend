import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(CreateUser: User): Promise<User> {
    if (
      await this.usersRepository.findOneBy({ username: CreateUser.username })
    ) {
      throw new ConflictException('User already exist!');
    }
    const user = this.usersRepository.create(CreateUser);
    return this.usersRepository.save(user);
  }

  async AuthTgUser(TgUser: User): Promise<User> {
    if (await this.usersRepository.findOneBy({ password: TgUser.password })) {
      const user = this.usersRepository.findOneBy({
        password: TgUser.password,
      });
      const newData = {
        ...user,
        username: TgUser.username || (await user).username,
        password: TgUser.password || (await user).password,
        img: TgUser.img || (await user).img,
        role: TgUser.role || (await user).role,
      };
      this.usersRepository.update({ password: TgUser.password }, newData);
      return user;
    } else {
      const user = this.usersRepository.create(TgUser);
      return this.usersRepository.save(user);
    }
  }

  async changeUser(username: string, user: User): Promise<User> {
    const User = this.usersRepository.findOneBy({ username: user.username });
    if (await this.usersRepository.findOneBy({ username: username })) {
      throw new ConflictException('Username already exist!');
    }
    const updUser = {
      ...User,
      username: username,
    };
    await this.usersRepository.update({ id: user.id }, updUser);
    return this.usersRepository.findOneBy({ username: username });
  }
}
