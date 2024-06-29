import { IsEmail, IsString, MinLength } from 'class-validator';

export class LogInRequest {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;
}

export class LogInResponse {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
