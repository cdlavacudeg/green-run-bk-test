import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class GetBetsDto {
  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'Filter by event',
  })
  idEvent?: number;
}
