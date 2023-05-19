import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '@prisma/client';
import { IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  phone?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  username?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  address?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  gender?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  birthDate?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  countryId?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  city?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  documentId?: number;

  @IsOptional()
  @IsEnum(UserStatus)
  @ApiProperty({
    enum: UserStatus,
  })
  status?: UserStatus;
}
