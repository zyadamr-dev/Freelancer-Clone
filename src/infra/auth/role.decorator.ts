import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/domain/user/enums/UserRole';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
