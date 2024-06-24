import { Module } from '@nestjs/common';

import { ConfigModule } from './shared/config';
import { PrismaModule } from './shared/prisma';

import { UserModule } from './domains/user/user.module';

@Module({
  imports: [ConfigModule, PrismaModule, UserModule],
})
export class AppModule {}
