import { IsEmail, IsString, MinLength } from 'class-validator';

import { CreateUserRequest } from '@/domains/user/dto/create-user.dto';

import { LogInResponse } from './log-in.dto';

export class SignUpRequest implements CreateUserRequest {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class SignUpResponse extends LogInResponse {}
