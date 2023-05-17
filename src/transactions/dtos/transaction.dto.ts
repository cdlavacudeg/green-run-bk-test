import { ApiProperty } from '@nestjs/swagger';
import { TransactionCategory } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, ValidateIf } from 'class-validator';

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
