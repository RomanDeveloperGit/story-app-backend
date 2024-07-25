import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@/shared/config';

export const REFRESH_TOKEN_STRATEGY_NAME = 'jwt-refresh-token-strategy';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      secretOrKey: configService.get('jwtRefreshSecret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: RefreshTokenFullPayload,
  ): Promise<RefreshTokenFullPayload | false> {
    // TODO: check something in a token DB, maybe...

    return payload;
  }
}
