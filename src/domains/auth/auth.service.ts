import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { ConfigService } from '@/shared/config';
import { UserService } from '@/domains/user/user.service';

import { LogInRequest, LogInResponse } from './dto/log-in.dto';
import { RefreshResponse } from './dto/refresh.dto';
import { SignUpRequest, SignUpResponse } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  private async getTokens(user: User): Promise<LogInResponse> {
    const accessTokenPayload: AccessTokenPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const refreshTokenPayload: RefreshTokenPayload = {
      email: user.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessTokenPayload, {
        expiresIn: this.configService.get('jwtAccessExpiresIn'),
        secret: this.configService.get('jwtAccessSecret'),
      }),
      this.jwtService.signAsync(refreshTokenPayload, {
        expiresIn: this.configService.get('jwtRefreshExpiresIn'),
        secret: this.configService.get('jwtRefreshSecret'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async logIn(data: LogInRequest): Promise<LogInResponse> {
    const user = await this.userService.getUserByAuthData(data);

    if (!user) {
      throw new BadRequestException("User doesn't exist");
    }

    const tokens = await this.getTokens(user);

    return tokens;
  }

  async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    const user = await this.userService.create(data);
    const tokens = await this.getTokens(user);

    return tokens;
  }

  async refresh(data: RequestWithRefreshTokenFullPayload['user']): Promise<RefreshResponse> {
    const user = await this.userService.getUserByEmail(data.email);

    if (!user) {
      throw new BadRequestException("User doesn't exist");
    }

    const tokens = await this.getTokens(user);

    return tokens;
  }
}
