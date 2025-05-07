import { User } from '../entities/User';
import { CreateUserDto } from 'src/app/dtos/createUser.dto';

export interface IUserRepo {
  findUserById(id: string): Promise<User | null>;
  createUser(user: CreateUserDto): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
}
