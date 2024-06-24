import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';

import { PrismaService } from '@/shared/prisma';

import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    const password = this.hashPassword(data.password);
    const user = await this.prismaService.user.create({ data: { ...data, password } });

    return new UserEntity(user);
  }
}
