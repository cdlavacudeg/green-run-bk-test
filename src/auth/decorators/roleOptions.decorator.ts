import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const RoleOptions = (...roles: Role[]) => SetMetadata('roles', roles);
