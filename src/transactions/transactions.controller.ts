import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocationIdUser, RequestLocation } from 'src/auth/decorators/locationIdUser.decorator';
import { OwnershipGuard, JwtAuthGuard } from 'src/auth/guards';

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
}
