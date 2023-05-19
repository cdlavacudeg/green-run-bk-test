import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { Role, User, UserStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async updateUser(idUser: number, userData: UpdateUserDto, userThatUpdates: User) {
    const user = await this.prisma.user.findUnique({
      where: {
        idUser,
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid User');
    }

    if (user.role == Role.admin && user.idUser !== userThatUpdates.idUser) {
      throw new ForbiddenException('You are not allowed to update this user');
    }

    if (idUser == userThatUpdates.idUser && userData.status == UserStatus.blocked) {
      throw new ForbiddenException('You are not allowed to blocked your own user');
    }

    const newPassword = userData.password ? await bcrypt.hash(userData.password, 10) : undefined;

    return await this.prisma.user.update({
      where: {
        idUser,
      },
      data: {
        ...userData,
        password: newPassword,
      },
    });
  }
}
