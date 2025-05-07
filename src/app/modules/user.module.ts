import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/domain/user/entities/User';
import { UserRepo } from 'src/infra/db/repos/UserRepository';
import { UserController } from 'src/infra/controllers/UserController';

import { GetUserUseCase } from '../use-case/user/getUser.use-case';
import { CreateUserUseCase } from '../use-case/user/createUser.use-case';
import { LoginUseCase } from '../use-case/user/loginUser.use-case';
import { AuthModule } from './jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UserController],
  providers: [
    UserRepo,
    {
      provide: 'IUserRepo',
      useClass: UserRepo,
    },
    GetUserUseCase,
    CreateUserUseCase,
    LoginUseCase,
  ],
  exports: [],
})
export class UserModule {}
