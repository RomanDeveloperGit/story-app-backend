import { BadRequestException, Injectable } from '@nestjs/common';
import { Response } from 'express';

import { JwtService } from '@nestjs/jwt';

import { User } from '@prisma/client';

import { ConfigService } from '@/shared/config';
import { UserService } from '@/domains/user/user.service';

import { ERROR_EMAIL_TAKEN, ERROR_USER_NOT_FOUND } from './auth.errors';
import { AuthorizedUser } from './dto/authorized-user.dto';
import { CheckAccessTokenResponse } from './dto/check-access-token.dto';
import { LogInRequest, LogInResponse } from './dto/log-in.dto';
import { RefreshResponse } from './dto/refresh.dto';
import { SignUpRequest, SignUpResponse } from './dto/sign-up.dto';

const REFRESH_TOKEN_COOKIE_PATH = '/api/v1/auth/refresh';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  private async getTokens(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
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

  private saveRefreshTokenInCookie(response: Response, refreshToken: string) {
    const maxAge = this.configService.get('jwtRefreshExpiresIn') * 1000;

    response.cookie(this.configService.get('refreshTokenCookieKey'), refreshToken, {
      maxAge,
      httpOnly: true,
      path: REFRESH_TOKEN_COOKIE_PATH,
      // sameSite: 'lax',
    });
  }

  private clearRefreshTokenInCookie(response: Response) {
    response.clearCookie(this.configService.get('refreshTokenCookieKey'), {
      path: REFRESH_TOKEN_COOKIE_PATH,
    });
  }

  async logIn(response: Response, data: LogInRequest): Promise<LogInResponse> {
    const user = await this.userService.getUserByEmailAndPassword(data);

    if (!user) {
      throw new BadRequestException({
        code: ERROR_USER_NOT_FOUND,
        message: "User doesn't exist with this auth data",
      });
    }

    const tokens = await this.getTokens(user);

    this.saveRefreshTokenInCookie(response, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      user: new AuthorizedUser(user),
    };
  }

  async signUp(response: Response, data: SignUpRequest): Promise<SignUpResponse> {
    const isEmailTaken = Boolean(await this.userService.getUserByEmail(data.email));

    if (isEmailTaken) {
      throw new BadRequestException({
        code: ERROR_EMAIL_TAKEN,
        message: 'User already exists with this email',
      });
    }

    const user = await this.userService.create(data);
    const tokens = await this.getTokens(user);

    this.saveRefreshTokenInCookie(response, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      user: new AuthorizedUser(user),
    };
  }

  async refresh(
    response: Response,
    refreshTokenFullPayload: RefreshTokenFullPayload,
  ): Promise<RefreshResponse> {
    const user = await this.userService.getUserByEmail(refreshTokenFullPayload.email);

    if (!user) {
      // TODO: move this to refresh strategy
      throw new BadRequestException({
        code: ERROR_USER_NOT_FOUND,
        message: "User doesn't exist with this token data",
      });
    }

    const tokens = await this.getTokens(user);

    this.saveRefreshTokenInCookie(response, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      user: new AuthorizedUser(user),
    };
  }

  async checkAccessToken(
    accessTokenFullPayload: AccessTokenFullPayload,
  ): Promise<CheckAccessTokenResponse> {
    const user = await this.userService.getUserByEmail(accessTokenFullPayload.email);

    if (!user) {
      throw new BadRequestException({
        code: ERROR_USER_NOT_FOUND,
        message: "User doesn't exist with this token data",
      });
    }

    return new AuthorizedUser(user);
  }

  async logOut(response: Response, accessTokenFullPayload: AccessTokenFullPayload): Promise<void> {
    const user = await this.userService.getUserByEmail(accessTokenFullPayload.email);

    if (!user) {
      throw new BadRequestException({
        code: ERROR_USER_NOT_FOUND,
        message: "User doesn't exist with this token data",
      });
    }

    this.clearRefreshTokenInCookie(response);
  }
}
