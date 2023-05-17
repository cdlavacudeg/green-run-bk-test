import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { GetUser, LocationIdUser, RequestLocation, RoleOptions } from 'src/auth/decorators';
import { OwnershipGuard, JwtAuthGuard } from 'src/auth/guards';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CreateTransactionDto } from './dtos';

@ApiTags('Transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  @Get('/')
  @LocationIdUser(RequestLocation.query)
  @UseGuards(OwnershipGuard)
  async getTransactions(@Query('idUser') idUser?: number) {
    return idUser;
  }

  @Post('/')
  @RoleOptions(Role.user)
  @UseGuards(RoleGuard)
  async createTransaction(@Body() dto: CreateTransactionDto, @GetUser('idUser') idUser: number) {
    return { dto, idUser };
  }
}
