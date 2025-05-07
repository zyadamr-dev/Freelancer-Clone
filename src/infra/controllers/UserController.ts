import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { GetUserUseCase } from 'src/app/use-case/user/getUser.use-case';
import { User } from 'src/domain/user/entities/User';
import { CreateUserDto } from 'src/app/dtos/createUser.dto';
import { CreateUserUseCase } from 'src/app/use-case/user/createUser.use-case';
import { LoginUseCase } from 'src/app/use-case/user/loginUser.use-case';
import { LoginUserDto } from 'src/app/dtos/loginUser.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly getU: GetUserUseCase,
    private readonly createU: CreateUserUseCase,
    private readonly login: LoginUseCase,
  ) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return await this.getU.execute(id);
  }

  @Post('signup')
  async createUser(@Body() data: CreateUserDto) {
    return await this.createU.execute(data);
  }

  @Post('login')
  async loginUser(@Body() data: LoginUserDto): Promise<{ token: string }> {
    return await this.login.execute(data.email, data.password);
  }
}
