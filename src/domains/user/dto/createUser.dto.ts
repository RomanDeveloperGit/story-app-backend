import { ApiHideProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { Exclude } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserRequest {
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

export class CreateUserResponse implements User {
  constructor(user: User) {
    Object.assign(this, user);
  }

  id: number;

  email: string;

  firstName: string;

  lastName: string;

  @Exclude()
  @ApiHideProperty()
  password: string;

  createdAt: Date;

  updatedAt: Date;
}
