import { BadRequestException, Injectable } from '@nestjs/common';
import { BetStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetBetsDto, UpdateBetsDto } from './dtos';

@Injectable()
export class BetsService {
  constructor(private prisma: PrismaService) {}

  async getBets(options?: { queryData: GetBetsDto }) {
    const { idEvent } = options?.queryData;

    if (idEvent) {
      const event = await this.prisma.event.findUnique({
        where: {
          idEvent: idEvent,
        },
      });

      if (!event) {
        throw new BadRequestException('Invalid Event');
      }
    }

    const bets = await this.prisma.bet.findMany({
      where: {
        idEvent,
      },
      orderBy: [{ idEvent: 'asc' }, { betOption: 'asc' }],
    });

    return bets;
  }

  async updateBets(idBet: number, betData: UpdateBetsDto) {
    const bet = await this.prisma.bet.findUnique({
      where: {
        idBet,
      },
    });

    if (!bet) {
      throw new BadRequestException('Invalid Bet');
    }

    if (bet.status == BetStatus.settled) {
      throw new BadRequestException('Bet is already settled, and the status or result cannot be changed');
    }
    const { status, result } = betData;

    const dataToUpdate = {
      status: result !== undefined ? BetStatus.settled : status,
      result,
    };

    return await this.prisma.bet.update({
      where: {
        idBet,
      },
      data: dataToUpdate,
    });
  }
}
