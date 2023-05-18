import { ApiProperty } from '@nestjs/swagger';
import { BetResult, BetStatus } from '@prisma/client';
import { IsEnum, IsIn, IsInt, IsOptional } from 'class-validator';

export class GetBetsDto {
  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'Filter by event',
  })
  idEvent?: number;
}

export class UpdateBetsDto {
  @IsOptional()
  @IsIn([BetStatus.active, BetStatus.canceled])
  @ApiProperty({
    enum: [BetStatus.active, BetStatus.canceled],
    description: 'Change status bet',
    default: 'cancelled',
  })
  status?: BetStatus;

  @IsOptional()
  @IsEnum(BetResult)
  @ApiProperty({
    enum: BetResult,
    description: 'Settled bet to win or lose',
    default: BetResult.win,
  })
  result?: BetResult;
}
