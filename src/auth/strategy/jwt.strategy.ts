import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import configuration from 'config/configuration';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(configuration.KEY) configService: ConfigType<typeof configuration>,
    private prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwt.loginSecret,
    });
  }

  async validate(payload: { sub: number }) {
    const { sub } = payload;
    const user = await this.prismaService.user.findUnique({
      where: {
        idUser: sub,
      },
    });

    delete user.password;
    return user;
  }
}
