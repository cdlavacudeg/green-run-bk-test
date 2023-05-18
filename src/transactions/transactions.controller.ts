import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { GetUser, LocationIdUser, RequestLocation, RoleOptions } from 'src/auth/decorators';
import { OwnershipGuard, JwtAuthGuard } from 'src/auth/guards';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CreateTransactionDto } from './dtos';
import { TransactionsService } from './transactions.service';

@ApiTags('Transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get('/')
  @LocationIdUser(RequestLocation.query)
  @UseGuards(OwnershipGuard)
  async getTransactions(@Query('idUser') idUser: number) {
    return await this.transactionsService.getTransactions(idUser);
  }

  @Post('/')
  @RoleOptions(Role.user)
  @UseGuards(RoleGuard)
  async createTransaction(@Body() dataTransaction: CreateTransactionDto, @GetUser('idUser') idUser: number) {
    return await this.transactionsService.createTransaction(idUser, dataTransaction);
  }

  @Get('/balance')
  @LocationIdUser(RequestLocation.query)
  @UseGuards(OwnershipGuard)
  async getTransactionsBalance(@Query('idUser') idUser: number) {
    return await this.transactionsService.getBalanceUser(idUser);
  }
}
