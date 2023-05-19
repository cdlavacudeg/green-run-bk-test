import { ApiProperty } from '@nestjs/swagger';
import { TransactionCategory } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class GetTransactionsQueryDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  idUser: number;

  @IsOptional()
  @IsEnum(TransactionCategory)
  @ApiProperty({
    enum: TransactionCategory,
  })
  category?: TransactionCategory;
}

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsEnum(TransactionCategory)
  @ApiProperty({
    enum: TransactionCategory,
    default: TransactionCategory.bet,
    required: true,
  })
  category: TransactionCategory;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  amount: number;

  @ApiProperty()
  @ValidateIf(object => object.category === TransactionCategory.bet)
  @IsNotEmpty({
    message: 'idBet is required, when category is bet',
  })
  idBet: number | null;
}
