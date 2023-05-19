import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { BetsModule } from './bets/bets.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import configuration from 'config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    TransactionsModule,
    BetsModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
