import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/domain/user/entities/User';
import { IUserRepo } from 'src/domain/user/interfaces/UserEntityInterface';

@Injectable()
export class GetUserUseCase {
  constructor(@Inject('IUserRepo') private readonly userRepo: IUserRepo) {}

  async execute(id: string): Promise<User | null> {
    const user = await this.userRepo.findUserById(id);
    if (!user) throw new Error('User not found');
    return user;
  }
}
