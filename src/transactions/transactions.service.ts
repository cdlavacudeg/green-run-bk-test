import { Injectable } from '@nestjs/common';
import { BetResult, BetStatus, TransactionCategory, TransactionStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dtos';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async getTransactions(idUser: number) {
    const listOfTransactions = await this.prisma.transaction.findMany({
      where: {
        idUser,
      },
      include: {
        bet: {
          select: {
            odd: true,
            result: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const listOfTransactionsWithBetResult = listOfTransactions.map(transaction => {
      const betResult = transaction.bet?.result;
      const betStatus = transaction.bet?.status;

      const typeOfBalance = transaction.category === TransactionCategory.deposit ? 'positive' : 'negative';
      if (betResult === BetResult.win && betStatus === BetStatus.settled) {
        const amount = transaction.amount;
        const odd = Number(transaction.bet?.odd);
        return {
          ...transaction,
          bet: {
            ...transaction.bet,
            winnigAmount: amount * odd - amount,
          },
          totalAmount: amount * odd,
          typeOfBalance: 'positive',
        };
      }

      if (transaction.category !== TransactionCategory.bet) {
        delete transaction.bet;
      }

      return { ...transaction, typeOfBalance };
    });

    return listOfTransactionsWithBetResult;
  }

  async createTransaction(idUser: number, dataTransaction: CreateTransactionDto) {
    return await this.prisma.transaction.create({
      data: {
        idUser,
        amount: dataTransaction.amount,
        category: dataTransaction.category,
        idBet: dataTransaction.category == TransactionCategory.bet ? dataTransaction.idBet : null,
        status: TransactionStatus.active,
      },
    });
  }

  async getBalanceUser(idUser: number) {
    const deposits = await this.prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        idUser,
        status: TransactionStatus.active,
        category: TransactionCategory.deposit,
      },
    });

    const listOfWinningBets = await this.prisma.transaction.findMany({
      where: {
        idUser,
        status: TransactionStatus.active,
        category: TransactionCategory.bet,
        bet: {
          status: BetStatus.settled,
          result: BetResult.win,
        },
      },
      include: {
        bet: true,
      },
    });

    const winningOfBets = listOfWinningBets.reduce((previosAmount, currentAmount) => {
      const ammount = currentAmount.amount;
      const odd = Number(currentAmount.bet.odd);
      return previosAmount + ammount * odd;
    }, 0);

    const negativeBalance = await this.prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        idUser,
        status: TransactionStatus.active,
        OR: [
          {
            category: TransactionCategory.bet,
            bet: {
              status: BetStatus.settled,
              result: BetResult.lose,
            },
          },
          {
            category: TransactionCategory.bet,
            bet: {
              OR: [{ status: BetStatus.active }, { status: BetStatus.canceled }],
            },
          },
          {
            category: TransactionCategory.withdraw,
          },
        ],
      },
    });

    const totalPositiveBalance = deposits._sum.amount + winningOfBets || 0;
    const totalNegativeBalance = negativeBalance._sum.amount || 0;
    const balance = totalPositiveBalance - totalNegativeBalance;

    return { positiveBalance: totalPositiveBalance, negativeBalance: totalNegativeBalance, balance };
  }
}
