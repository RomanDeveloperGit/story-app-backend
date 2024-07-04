import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@/shared/config';

import { ACCESS_TOKEN_STRATEGY_NAME } from './access-token.constants';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, ACCESS_TOKEN_STRATEGY_NAME) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtAccessSecret'),
    });
  }

  async validate(payload: AccessTokenFullPayload): Promise<AccessTokenFullPayload> {
    // TODO: check something specific, maybe...

    return payload;
  }
}
