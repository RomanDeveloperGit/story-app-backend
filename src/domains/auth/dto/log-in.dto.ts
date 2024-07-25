import { IsEmail, IsString, MinLength } from 'class-validator';

import { GetUserByEmailAndPasswordRequest } from '@/domains/user/dto/get-user-by-email-and-password';

import { AuthorizedUser } from './authorized-user.dto';

export class LogInRequest implements GetUserByEmailAndPasswordRequest {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class LogInResponse {
  accessToken: string;
  user: AuthorizedUser;
}
