import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dtos';
import * as bcrypt from 'bcrypt';
import configuration from 'config/configuration';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    @Inject(configuration.KEY) private configService: ConfigType<typeof configuration>,
    private jwtService: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User or password incorrect');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('User or password incorrect');
    }
    delete user.password;

    const token = await this.singToken(user.idUser);
    return { token, user };
  }

  async singToken(userId: number): Promise<string> {
    const payload = {
      sub: userId,
    };

    const secret = this.configService.jwt.loginSecret;

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '12h',
      secret,
    });

    return token;
  }
}
