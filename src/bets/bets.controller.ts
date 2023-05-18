import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { RoleOptions } from 'src/auth/decorators';
import { JwtAuthGuard } from 'src/auth/guards';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { BetsService } from './bets.service';
import { GetBetsDto } from './dtos';

@ApiTags('Bets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('bets')
export class BetsController {
  constructor(private betsService: BetsService) {}

  @Get('/')
  @RoleOptions(Role.admin)
  @UseGuards(RoleGuard)
  async getBets(@Query() queryData: GetBetsDto) {
    return await this.betsService.getBets({queryData});
  }
}
