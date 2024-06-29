import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserResponse } from '@/domains/user/dto/createUser.dto';

import { LogInRequest, LogInResponse } from './dto/log-in.dto';
import { SignUpResponse } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async logIn(data: LogInRequest): Promise<LogInResponse> {
    const accessToken = await this.jwtService.signAsync(data);

    return {
      accessToken,
      refreshToken: '',
    };
  }

  async signUp(data: CreateUserResponse): Promise<SignUpResponse> {
    const token = await this.logIn(data);

    return {
      user: data,
      auth: token,
    };
  }
}
