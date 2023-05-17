import { Injectable } from '@nestjs/common';
import { TransactionCategory, TransactionStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dtos';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async getTransactions(idUser: number) {
    return await this.prisma.transaction.findMany({
      where: {
        idUser,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async createTransaction(idUser: number, dataTransaction: CreateTransactionDto) {
    return await this.prisma.transaction.create({
      data: {
        idUser: idUser,
        amount: dataTransaction.amount,
        category: dataTransaction.category,
        idBet: dataTransaction.category == TransactionCategory.bet ? dataTransaction.idBet : null,
        status: TransactionStatus.active,
      },
    });
  }
}
