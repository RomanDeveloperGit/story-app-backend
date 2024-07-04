import { IsEmail, IsString, MinLength } from 'class-validator';

import { GetUserByAuthDataRequest } from '@/domains/user/dto/get-user-by-auth-data.dto';

export class LogInRequest implements GetUserByAuthDataRequest {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class LogInResponse {
  accessToken: string;
  refreshToken: string;
}
