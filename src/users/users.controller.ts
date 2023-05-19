import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser, LocationIdUser, RequestLocation } from 'src/auth/decorators';
import { JwtAuthGuard, OwnershipGuard } from 'src/auth/guards';
import { UpdateUserDto } from './dtos';
import { UsersService } from './users.service';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Patch('/:idUser')
  @LocationIdUser(RequestLocation.params)
  @UseGuards(OwnershipGuard)
  async updateUser(@Param('idUser') idUser: number, @GetUser() userThatUpdates: User, @Body() userData: UpdateUserDto) {
    return await this.userService.updateUser(idUser, userData, userThatUpdates);
  }
}
