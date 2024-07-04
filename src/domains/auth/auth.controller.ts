import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LogInRequest } from './dto/log-in.dto';
import { SignUpRequest } from './dto/sign-up.dto';
import { RefreshTokenGuard } from './refresh-token/refresh-token.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('log-in')
  async logIn(@Body() data: LogInRequest) {
    return this.authService.logIn(data);
  }

  @Post('sign-up')
  async signUp(@Body() data: SignUpRequest) {
    return this.authService.signUp(data);
  }

  @Post('refresh')
  @RefreshTokenGuard()
  async refresh(@Request() request: RequestWithRefreshTokenFullPayload) {
    return this.authService.refresh(request.user);
  }
}
