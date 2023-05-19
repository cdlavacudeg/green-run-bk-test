import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsDate, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(Role)
  @ApiProperty({
    enum: Role,
  })
  role: Role;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  address?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  gender?: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  birthDate: Date;

  @IsNotEmpty()
  @IsInt()
  @IsOptional()
  @ApiProperty()
  countryId?: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  city?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  documentId?: number;
}
