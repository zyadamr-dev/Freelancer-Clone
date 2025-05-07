import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/domain/user/entities/User';
import { IUserRepo } from 'src/domain/user/interfaces/UserEntityInterface';
import { CreateUserDto } from 'src/app/dtos/createUser.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(@Inject('IUserRepo') private readonly userRepo: IUserRepo) {}

  async execute(user: CreateUserDto): Promise<User> {
    return await this.userRepo.createUser(user);
  }
}
