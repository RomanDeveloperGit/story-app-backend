import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@/shared/config';

export const ACCESS_TOKEN_STRATEGY_NAME = 'jwt-access-token-strategy';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, ACCESS_TOKEN_STRATEGY_NAME) {
  constructor(configService: ConfigService) {
    super({
      secretOrKey: configService.get('jwtAccessSecret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: AccessTokenFullPayload): Promise<AccessTokenFullPayload> {
    // TODO: check something specific, maybe...

    return payload;
  }
}
