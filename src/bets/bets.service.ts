import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetBetsDto } from './dtos';

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
}
