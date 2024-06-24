import { ApiHideProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { Exclude } from 'class-transformer';

export class UserEntity implements User {
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
