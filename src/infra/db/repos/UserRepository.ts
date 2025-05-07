import { User } from 'src/domain/user/entities/User';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepo } from 'src/domain/user/interfaces/UserEntityInterface';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class UserRepo implements IUserRepo {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUserById(id: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong while fetching the user',
      );
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      const newUser = this.userRepository.create(user);

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create user. Please try again later.',
      );
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const user = this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException(`User with ID ${email} not found`);
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong while fetching the user',
      );
    }
  }
}
