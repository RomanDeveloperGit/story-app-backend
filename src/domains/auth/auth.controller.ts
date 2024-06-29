import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from '@/domains/user/user.service';

import { AuthService } from './auth.service';
import { LogInRequest } from './dto/log-in.dto';
import { SignUpRequest } from './dto/sign-up.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('log-in')
  async logIn(@Body() data: LogInRequest) {
    return this.authService.logIn(data);
  }

  @Post('sign-up')
  async signUp(@Body() data: SignUpRequest) {
    const user = await this.userService.create(data);

    return this.authService.signUp(user);
  }
}
