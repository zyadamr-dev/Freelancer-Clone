import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/infra/auth/jwtService';
import { UserRepo } from 'src/infra/db/repos/UserRepository';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepo: UserRepo,
  ) {}

  async execute(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepo.findUserByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await this.authService.validatePassword(
      password,
      user.password,
    );

    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const token = await this.authService.generateToken(
      user.id,
      user.email,
      user.role,
    );
    return { token };
  }
}
