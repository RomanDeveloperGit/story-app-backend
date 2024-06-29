import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';

import { PrismaService } from '@/shared/prisma';

import { CreateUserRequest, CreateUserResponse } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }

  async create(data: CreateUserRequest): Promise<CreateUserResponse> {
    const password = this.hashPassword(data.password);
    const user = await this.prismaService.user.create({ data: { ...data, password } });

    return new CreateUserResponse(user);
  }
}
